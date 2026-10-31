"use client";

import Header from "@/components/header";
import Footer from "@/components/footer";

type Props = { 
  onStart: () => void;
  onRestart: () => void;
 };

 
export default function StartScreen({ onStart, onRestart }: Props) {
  return (
    <main className="site-layout hidden-scrollbar">
      <Header
        onRestart={onRestart}
        onSecret={onRestart}
      />

      <section className="story-screen start-screen" aria-labelledby="start-title">
        <img className="story-logo" src="https://res.cloudinary.com/s0uadvaq/image/upload/v1793422485/header-karuta-logo.png" alt="みやこかるた謎" />
        <p className="story-eyebrow">MIYAKO KARUTA</p>
        <h1 id="start-title">みやこかるた謎</h1>
        <button type="button" className="primary story-button" onClick={onStart}>
          はじめる
        </button>
      </section>

      {/* ==================== フッター ==================== */}
      <Footer />
    </main>
  );
}
