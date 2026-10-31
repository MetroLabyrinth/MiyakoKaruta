"use client";

import { end1Paragraphs } from "../lib/END1";
import Header from "@/components/header";
import Footer from "@/components/footer"

type Props = {
  mistakes: number;
  solvedCards: number;
  onRestart: () => void;
};

const handleXPost = () => {
  const text = [
    "END",
    "かるたを取り切った！",
    "#みやこかるた謎 #めとらび",
    "",
    "↓プレイはこちらから↓",
    "https://ka-mi-p.vercel.app/",
  ].join("\n");

  const url =
    `https://x.com/intent/post?text=${encodeURIComponent(text)}`;

  window.open(url, "_blank", "noopener,noreferrer");
};


export default function ClearScreen({ mistakes, solvedCards, onRestart }: Props) {
  return (
    <main className="site-layout">
      <Header
        onRestart={onRestart}
        onSecret={onRestart}
      />

      <section className="story-screen clear-screen" aria-labelledby="clear-title">
        <p className="story-eyebrow">GAME CLEAR</p>
        <h1 id="clear-title">しょうたいじょう</h1>
        <div className="intro-text">
          {end1Paragraphs.map((paragraph, i) => <p key={i}>{paragraph}</p>)}
        </div>

        <div className="story-panel">
          <p className="story-description">
            あなたは謎を解き終えました。
          </p>

          <div className="clear-stats-wrapper">
            <div className="clear-stats">
              <p>お手付き：<strong>{mistakes} 回</strong></p>
              <p>取った札：<strong>{solvedCards} 枚</strong></p>
            </div>

            <div className="finish-icon" aria-hidden="true">
              完
            </div>
          </div>
        </div>

        <p className="intro-text">みやこかるた謎を遊んでいただきありがとうございます。</p>
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
