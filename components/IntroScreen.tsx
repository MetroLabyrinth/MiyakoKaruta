"use client";

import { introParagraphs } from "../lib/intro";
import Header from "@/components/header";
import Footer from "@/components/footer";

type Props = { onNext: () => void;
   onBack: () => void;
  onRestart: () => void;
 };

 
export default function IntroScreen({ onNext, onBack, onRestart }: Props) {
  return (
    <main className="site-layout">
      <Header
        onRestart={onRestart}
        onSecret={onRestart}
      />

      <section className="story-screen intro-screen" aria-labelledby="intro-title">
        <p className="story-eyebrow">INTRODUCTION</p>
        <h1 id="intro-title">あらすじ</h1>
        <div className="intro-text">
          {introParagraphs.map((paragraph, i) => <p key={i}>{paragraph}</p>)}
        </div>
        <div className="story-actions">
          <button type="button" className="story-secondary" onClick={onBack}>戻る</button>
          <button type="button" className="primary story-button" onClick={onNext}>次へ</button>
        </div>
      </section>

      <Footer />
    </main>
  );
}
