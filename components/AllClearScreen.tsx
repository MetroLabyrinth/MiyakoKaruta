"use client";

import { end2Paragraphs } from "../lib/END2";
import Header from "@/components/header";
import Footer from "@/components/footer";

type Props = {
  mistakes: number;
  solvedCards: number;
  onRestart: () => void;
};


const handleXPost = () => {
  const text = [
    "CLEAR",
    "かるたをすべて取り切った！",
    "#みやこかるた謎 #めとらび",
    "",
    "↓プレイはこちらから↓",
    "https://ka-mi-p.vercel.app/",
    "",
    "https://x.com/sasasabi1/status/2116268253295313362?a=ctFHuAvMiyNZmATuaFo&s=20"
  ].join("\n");

  const url =
    `https://x.com/intent/post?text=${encodeURIComponent(text)}`;

  window.open(url, "_blank", "noopener,noreferrer");
};

export default function AllClearScreen({ mistakes, solvedCards, onRestart }: Props) {
  return (
    <main className="site-layout">
      {/* ==================== ヘッダー ==================== */}
      <Header
        onRestart={onRestart}
        onSecret={onRestart}
      />

      <section className="story-screen clear-screen" aria-labelledby="clear-title">
      <p className="story-eyebrow">GAME CLEAR</p>
      <h1 id="clear-title">しょうじょう</h1>
      <div className="intro-text">
        {end2Paragraphs.map((paragraph, i) => <p key={i}>{paragraph}</p>)}
      </div>
      <div className="story-panel">
        <p className="story-description">
          すべての謎を解き明かしました。
        </p>

        <div className="clear-stats-wrapper">
          <div className="clear-stats">
            <p>お手付き：<strong>{mistakes} 回</strong></p>
            <p>取った札：<strong>{solvedCards + 2} 枚</strong></p>
          </div>

          <div className="finish-icon" aria-hidden="true">
            祝
          </div>
        </div>
      </div>

      <p className="intro-text">みやこかるた謎 クリア！</p>
      <p className="intro-text">これ以上の隠し要素や追加要素はございません。</p>
      <p className="intro-text">最後まで遊んでいただきありがとうございます。</p>
      <p className="intro-text">以下からアンケートと感想ポストのご協力をお願い致します。</p>

      <div className="story-actions">
        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLSduLusxhYQ5BpXMZjO17aObYRZkrhKOsy6VMgnldXioN0SEVw/viewform?usp=publish-editor"
          target="_blank"
          rel="noopener noreferrer"
          className="primary story-button"
        >
          アンケート
        </a>

        {/* Xポスト */}
        <button
          type="button"
          className="primary story-button"
          onClick={handleXPost}
        >
          Xポスト
        </button>
        <button type="button" className="primary story-button" onClick={onRestart}>
          やりなおす
        </button>
      </div>
      
    </section>

      {/* ==================== フッター ==================== */}
      <Footer />
    </main>
  );
}
