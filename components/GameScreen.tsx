"use client";

import { useEffect, useState } from "react";
import { cards, questions } from "../lib/questions";
import Header from "@/components/header";
import Footer from "@/components/footer";

// 隠しギミックの設定（好きな値に変更可能）
const SECRET_ANSWERS = ["しょうじょう", "賞状", "ショウジョウ"];
// 隠しモードで表示する画像（publicフォルダ以下のパスに変更してください）
const SECRET_MODAL_IMAGE = "https://res.cloudinary.com/s0uadvaq/image/upload/v1793421518/7Q.jpg";


// ゲームの進行状態
type Phase =
  | "reading"
  | "answer"
  | "incorrect"
  | "correct";

// 回答の正規化
function normalize(value: string) {
  return value
    .normalize("NFKC")
    .replace(/[\s\u3000]/g, "")
    .toLocaleLowerCase("ja-JP");
}

// 画像表示コンポーネント

function CardImage({
  src,
  alt,
  onLoad,
}: {
  src: string;
  alt: string;
  onLoad?: () => void;
}) {
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setFailed(false);
  }, [src]);

  return failed ? (
    <div className="image-placeholder">
      <span>画像未設定</span>
      <small>{src}</small>
    </div>
  ) : (
    <img
      src={src}
      alt={alt}
      onLoad={onLoad}
      onError={() => setFailed(true)}
    />
  );
}


type GameResult = {
  mistakes: number;
  solvedCards: number;
};

type Props = {
  onComplete: (result: GameResult) => void;
  onSecretComplete: (result: GameResult) => void;
  onRestart: () => void;
};

export default function GameScreen({
  onComplete,
  onSecretComplete,
  onRestart
}: Props) {
  // ゲーム状態
  const [index, setIndex] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [solvedCardIds, setSolvedCardIds] = useState<string[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [input, setInput] = useState("");
  const [phase, setPhase] = useState<Phase>("reading");
  const [notice, setNotice] = useState("");
  const [loadedCorrectSrc, setLoadedCorrectSrc] = useState<string | null>(null);
  const [secretUnlocked, setSecretUnlocked] = useState(false);
  const [secretInput, setSecretInput] = useState("");
  const [secretError, setSecretError] = useState("");

  // ロゴクリック時のモーダル
  const [logoModalOpen, setLogoModalOpen] = useState(false);

  // 現在の問題
  const q = questions[index];

  const showCorrectImage =
    phase === "correct" &&
    loadedCorrectSrc === q.correctImage;

  // 選択した取り札のIDに対応するモーダル画像
  const modalImage = selected
    ? (q.modalImages as Record<string, string | undefined>)[selected]
    : undefined;

  // 最終問題の回答モーダルが開いているときだけ秘密ページへ進める
  const canOpenSecret = questions.length > 0 &&
    index === questions.length - 1 &&
    phase === "answer";


  // 隠しモードはモーダルを閉じる・問題を移動するとリセット
  useEffect(() => {
    if (!canOpenSecret) {
      setSecretUnlocked(false);
      setSecretInput("");
      setSecretError("");
    }
  }, [canOpenSecret]);

  // 最終問題の回答モーダル中、ヘッダーロゴを押すと秘密の回答欄へ切り替え
  const openSecret = () => {
    if (!canOpenSecret) return;
    setSecretUnlocked(true);
    setSecretError("");
  };

  const handleLogoClick = () => {
    if (phase !== "answer") {
      setSelected("T");
      setInput("");
      setPhase("answer");
      setNotice("");
      setSecretUnlocked(false);
      setSecretInput("");
      setSecretError("");
      setLogoModalOpen(true);
      return;
    }
    else if (index !== questions.length - 1){
      return
    }

    // 最終問題では既存の賞状ギミック
    openSecret();
  };

  const submitSecret = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!canOpenSecret || !secretUnlocked) return;
    if (SECRET_ANSWERS.some((answer) => normalize(secretInput) === normalize(answer))) {
      onSecretComplete({ mistakes, solvedCards: solvedCardIds.length });
    } else {
      setSecretError("答えが違います。");
    }
  };

  // まだ取られていない札
  const remainingCards = cards.filter(
    (card) => !solvedCardIds.includes(card.id)
  );

  // 取り札を選択
  const choose = (id: string) => {
    if (phase !== "reading" || solvedCardIds.includes(id)) {
      return;
    }

    setSelected(id);
    setInput("");
    setPhase("answer");
    setNotice("");
    setSecretUnlocked(false);
    setSecretInput("");
    setSecretError("");
  };

  // 回答の正誤判定
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    setLogoModalOpen(false);
    e.preventDefault();

    if (phase !== "answer" || !q || !selected || !input.trim()) {
      return;
    }

    const correct = q.correctAnswers.some(
      (item) =>
        item.cardId === selected &&
        item.answers.some(
          (answer) => normalize(answer) === normalize(input)
        )
    );

    
    if (correct) {
      // 最終問題なら、正解画面を挟まずにクリア画面へ
      if (index === questions.length - 1) {
        onComplete({
          mistakes,
          solvedCards: solvedCardIds.length + 1,
        });
        return;
      }

      // それ以外の問題は従来どおり
      setSolvedCardIds((ids) => [...ids, selected]);
      setPhase("correct");
      setNotice("正解です！");
    } else {
      setMistakes((v) => v + 1);
      setPhase("incorrect");
      setNotice(
        "問題を確認して、もう一度選んでください。"
      );
    }

  };

  // 同じ問題をやり直す・札を選び直す
  
  // モーダルから戻る場合はお手付きとしてカウント  
  const retry = () => {
    setLogoModalOpen(false);

    if (phase === "answer") {
      // モーダルから戻る場合はお手付き
      setMistakes((v) => v + 1);

      // お手付き画面を表示
      setPhase("incorrect");
      setNotice(
        "問題を確認して、もう一度選んでください。"
      );
    } else if (phase === "incorrect") {
      // お手付き画面から読み直す場合
      setPhase("reading");
      setNotice("");
    }

    // 選択状態をリセット
    setSelected(null);
    setInput("");

    // 隠しモードもリセット
    setSecretUnlocked(false);
    setSecretInput("");
    setSecretError("");
  };

  // 次の問題へ
  const next = () => {
    if (index + 1 >= questions.length) {
      onComplete({ mistakes, solvedCards: solvedCardIds.length });
      return;
    }

    setIndex((value) => value + 1);
    setSelected(null);
    setInput("");
    setNotice("");
    setPhase("reading");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <main className="site-layout">
      <Header
        onRestart={onRestart}
        onSecret={handleLogoClick}
        secretActive={secretUnlocked || logoModalOpen}
      />

      <div className="main-content">
      {/* ==================== メイン画面 ==================== */}
      <>
          {/* ==================== 進行状況 ==================== */}
          <div
            className="progress"
            aria-label={`第${index + 1}問、全${questions.length}問`}
          >
            <div
              style={{
                width: `${(index / questions.length) * 100}%`,

              }}
            />
          </div>

          {/* ==================== 読み札 ==================== */}
          <section className="reading-panel">
            <div className="section-heading">
              <span className="number">{index + 1}</span>
            </div>

            
            {/* 読み札の画像 */}
            <div className="reading-image instant-image">

              {/* 問題画像 */}
              <div
                className="instant-image-layer"
                style={{
                  visibility: showCorrectImage ? "hidden" : "visible",
                }}
              >
                <CardImage
                  src={q.readingImage}
                  alt={`第${index + 1}問の読み札`}
                />
              </div>

              {/* 正解画像：読み込み完了まで非表示 */}
              <div
                className="instant-image-layer"
                style={{
                  visibility: showCorrectImage ? "visible" : "hidden",
                }}
              >
                <CardImage
                  src={q.correctImage}
                  alt={`第${index + 1}問の正解画像`}
                  onLoad={() => setLoadedCorrectSrc(q.correctImage)}
                />
              </div>

            </div>

          </section>

          {/* ==================== 不正解 ==================== */}
          {phase === "incorrect" && (
            <section
              className="result incorrect"
              role="alert"
            >
              <h2>お手付き！</h2>

              <p>{notice}</p>

              <p>お手付き：{mistakes} 回</p>

              <button
                className="primary"
                onClick={retry}
              >
                同じ問題を読み直す
              </button>
            </section>
          )}

          {/* ==================== 正解 ==================== */}
          {phase === "correct" && (
            <section
              className="result correct"
              role="status"
            >
              <h2>{notice}</h2>

              <p>
                第{index + 1}問をクリアしました。
                正解した札は盤面から取り除かれました。
              </p>

              <button
                className="primary"
                onClick={next}
              >
                {index + 1 < questions.length
                  ? "次の読み札へ →"
                  : "結果を見る →"}
              </button>
            </section>
          )}

          {/* ==================== 取り札 ==================== */}
          {phase !== "incorrect" && (
            <section className="choice-section">
              <div className="card-grid">
                {remainingCards.map((card) => (
                  <button
                    key={card.id}
                    type="button"
                    disabled={phase !== "reading"}
                    className="card-choice"
                    onClick={() => choose(card.id)}
                  >
                    <CardImage
                      src={card.image}
                      alt={card.label}
                    />
                  </button>
                ))}
              </div>
            </section>
          )}

          {/* ==================== 回答入力モーダル ==================== */}
          {phase === "answer" && (
            <div className="modal-overlay">
              <section
                className={`answer-modal ${secretUnlocked ? "secret-answer-modal" : ""}`}
                role="dialog"
                aria-modal="true"
                aria-labelledby="answer-modal-title"
              >
                <div className="modal-content">
                  <p className="modal-eyebrow">KARUTA ANSWER</p>

                  <h2 id="answer-modal-title">
                    {secretUnlocked ? "隠された謎の答えは？" : "謎の答えは？"}
                  </h2>

                  {/* 隠しモードでは画像を差し替える */}
                  {(secretUnlocked || modalImage) && (
                    <div className="modal-question-image">
                      <CardImage
                        src={secretUnlocked ? SECRET_MODAL_IMAGE : modalImage!}
                        alt={secretUnlocked
                          ? "隠された謎の画像"
                          : `第${index + 1}問の選択した札の画像`}
                      />
                    </div>
                  )}

                  {secretUnlocked ? (
                    <form
                      onSubmit={submitSecret}
                      className="modal-form secret-form"
                    >
                      <label htmlFor="secret-answer">
                        隠された答え
                      </label>

                      <input
                        id="secret-answer"
                        type="text"
                        value={secretInput}
                        onChange={(e) => {
                          setSecretInput(e.target.value);
                          setSecretError("");
                        }}
                        placeholder="答えを入力..."
                        autoComplete="off"
                      />

                      {secretError && (
                        <p className="secret-error" role="alert">
                          {secretError}
                        </p>
                      )}

                      <button
                        className="primary modal-submit"
                        type="submit"
                        disabled={!secretInput.trim()}
                      >
                        回答する →
                      </button>
                    </form>
                  ) : (
                    <form onSubmit={submit} className="modal-form">
                      <label htmlFor="answer">回答</label>

                      <input
                        id="answer"
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="答えを入力..."
                        autoComplete="off"
                      />

                      <button
                        type="submit"
                        className="primary modal-submit"
                        disabled={!input.trim()}
                      >
                        回答する →
                      </button>
                    </form>
                  )}

                  <button
                    type="button"
                    className="modal-back"
                    onClick={retry}
                  >
                    札を選び直す（お手付き）
                  </button>
                </div>
              </section>
            </div>
          )}

          {/* ==================== スコア ==================== */}
            <div className="score">
              <div>
                <small>進行</small>
                <b>
                  {Math.min(index + 1, questions.length)}
                  <span> / {questions.length}</span>
                </b>
              </div>

              <div>
                <small>お手付き</small>
                <b>
                  {mistakes}
                  <span> 回</span>
                </b>
              </div>
            </div>
      </>
    </div>
      {/* ==================== フッター ==================== */}
      <Footer />
    </main>
  );
}