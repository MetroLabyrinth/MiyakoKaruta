"use client";

import { useState } from "react";
import "./hint.css";
import Footer from "@/components/footer";

const hintData = [
  {
    title: "第1問",
    answer: "干し柿",
    hints: [
      "描かれているイラストは「とりにく」です",
      "書かれている文字から「とりにく」つまり「にく」を「取り」ましょう",
      "にくを取ると「ほしがすき」が残ります",
      "ずばり、使うかるたの札は「ストロー」です",
    ],
  },
  {
    title: "第2問",
    answer: "紅葉",
    hints: [
      "描かれているイラストは「とりい」「かがみ」です",
      "書かれている文字から「とりい」つまり「い」を「取り」、書かれている文字が「かがみ」つまり「か」が「み」になるようにしましょう",
      "いを取り、かをみにすると「みるみじ」となります。しかし、どの札を使っても言葉にならなさそうです。イラストを左から順に適用することを考えると違う文字列が浮かばないでしょうか",
      "ずばり、使うかるたの札は「かるがも」です",
    ],
  },
  {
    title: "第3問",
    answer: "舌",
    hints: [
      "この問題は取札にイラストを適用させることで答えが導かれます",
      "描かれているイラストは「はがた」です",
      "取札となるイラストの名前の「は」が「た」になると、答えとなる言葉が出てきます。ここから、取札のイラスト名には「は」が含まれていることが分かります",
      "ずばり、使うかるたの札は「はし」です。逆さまに描かれていることに注意しましょう",
    ],
  },
  {
    title: "第4問",
    answer: "正四面体",
    hints: [
      "まずは「せいしたい」から連想される図形を考えましょう",
      "今までのように、文字を取ったり、別の文字に変化させたりする方法ではうまくいかないようです",
      "この問題では、文字を付け加えることで答えが導けるようです。残りの取札を見てみましょう",
      "ずばり、使うかるたの札は「つけめん」です",
    ],
  },
  {
    title: "第5問",
    answer: "村",
    hints: [
      "まずは問題画像に書かれた文字を見てみましょう。それぞれ「休」と「付」です",
      "それぞれの漢字を形として見ると、共通している部分があります。カタカナのある文字に見えてこないでしょうか",
      "それぞれの漢字に共通している部分は「にんべん」です。カタカナの「イ」に見えますね",
      "ずばり、使うかるたの札は「とりい」です。「い」を取って、残った部分を合体させましょう",
    ],
  },
  {
    title: "最終問題",
    answer: "招待状",
    hints: [
      "描かれているイラストは、左から順に「にいがた」「とりかご」です",
      "書かれている文字を、「にい」が「た」になるように変化させ「かご」を取ると、「たもさょうたいじょう」となります",
      "ずばり、使うかるたの札は「たからさがし」です",
      "たからさがしを「た、か、ら、さ」が「し」と捉えると「しもしょうたいじょう」となり、言葉になりません。「た、から、さ」が「し」つまり「た〜さ」が「し」になるように変化させてみましょう",
    ],
  },
];

export default function HintPage() {
  const [openQuestion, setOpenQuestion] = useState<number | null>(null);

  // 公開したヒントを記録
  const [openedHints, setOpenedHints] = useState<string[]>([]);

  const toggleQuestion = (index: number) => {
    setOpenQuestion((prev) => prev === index ? null : index);
  };

  const toggleHint = (key: string) => {
    setOpenedHints((prev) =>
      prev.includes(key)
        ? prev.filter((item) => item !== key)
        : [...prev, key]
    );
  };

  return (
    <main>
      <header className="header miyako-header">
        <div className="header-inner miyako-header-inner">
          {/* ロゴ：賞状ギミック */}
          <button
            type="button"
            className="miyako-header-brand"
            aria-label="みやこかるた謎のロゴ"
          >
            <div className="header-logo">
              <img
                src={"https://res.cloudinary.com/s0uadvaq/image/upload/v1793422486/header-karuta-logo.png"}
                alt="みやこかるた謎のロゴ"
              />
            </div>
          </button>

          {/* 右側のボタン */}
          <div className="miyako-header-actions">
            <button
              type="button"
              className="miyako-header-button"
              onClick={() => {
                window.close();
              }}
            >
              問題に戻る
            </button>
          </div>
        </div>
      </header>

      <div className="hint-page">
        
        <div className="hint-container">
          <p className="hint-description">
            確認したい問題を選択してください。
            ヒントは段階的に表示できます。
          </p>

          <div className="hint-question-list">
            {hintData.map((question, questionIndex) => {
              const isQuestionOpen = openQuestion === questionIndex;

              return (
                <section
                  className="hint-question"
                  key={questionIndex}
                >
                  {/* 問題の開閉 */}
                  <button
                    type="button"
                    className="hint-question-button"
                    onClick={() => toggleQuestion(questionIndex)}
                    aria-expanded={isQuestionOpen}
                  >
                    <span className="hint-question-title">
                      {question.title}
                    </span>

                    <span className="hint-question-arrow">
                      {isQuestionOpen ? "−" : "＋"}
                    </span>
                  </button>

                  {isQuestionOpen && (
                    <div className="hint-question-content">
                      {question.hints.map((hint, hintIndex) => {
                        const key = `${questionIndex}-${hintIndex}`;
                        const isHintOpen = openedHints.includes(key);

                        // 最後のヒントで使用札を公開
                        const isCardReveal =
                          questionIndex === 5
                            ? hintIndex === 2
                            : hintIndex === question.hints.length - 1;

                        return (
                          <div className="hint-step" key={key}>
                            
<button
  type="button"
  className="hint-step-button"
  onClick={() => toggleHint(key)}
  aria-expanded={isHintOpen}
>
  <span className="hint-step-label">
    <span>ヒント {hintIndex + 1}</span>

    {isCardReveal && (
      <span className="hint-warning">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
          <path d="M12 9v4" />
          <path d="M12 17h.01" />
        </svg>
        このヒントには使うかるたの札が書かれています
      </span>
    )}
  </span>

  <span className="hint-question-arrow">
    {isHintOpen ? "−" : "＋"}
  </span>
</button>


                            {isHintOpen && (
                              <div className="hint-step-content">
                                {hint}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </section>
              );
            })}
          </div>
        </div>
      </div>
      <div className="h-4 bg-[#f2f7ed]"></div>
      <Footer />
    </main>
  );
}
