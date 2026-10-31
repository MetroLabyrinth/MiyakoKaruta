"use client";

import { howtoParagraphs } from "../lib/howto";
import { cautionParagraphs } from "@/lib/caution";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Image from "next/image";

type Props = { onNext: () => void;
   onBack: () => void;
  onRestart: () => void;
 };

 
export default function HowToScreen({ onNext, onBack, onRestart }: Props) {
  return (
    <main className="site-layout">
      <Header
        onRestart={onRestart}
        onSecret={onRestart}
      />

      <section className="story-screen intro-screen" aria-labelledby="intro-title">
        <p className="story-eyebrow">HOWTOPLAY</p>
        <h1 id="intro-title">遊び方</h1>

        <div className="howto-text">
          <p>本作『みやこかるた謎』は、東京都立大学大学祭「みやこ祭」で開催されたみやこ祭謎解き『最終試験 忍びの巻を取り戻せ！』のスピンオフ作品です。</p>
          <p>『最終試験 忍びの巻を取り戻せ！』に参加していない方も十分に遊ぶことができます。</p>
        </div>

        <section className="mx-auto max-w-680px max-w-4xl rounded-[32px] text-center mb-6">
            {/* 上段：穴あき画像 + かるた画像 */}
            <div className="rounded-[28px] bg-[#efe7d8] px-3 py-4">
                <div className="grid grid-cols-[minmax(0,3fr)_auto_minmax(0,1fr)] items-center gap-2 md:gap-6">
                {/* 穴あき画像 */}
                <div className="flex flex-col items-center">
                    <p className="mb-3 text-sm font-bold text-[#d27e5c]">
                    問題画像
                    </p>
                    <img
                    src="https://res.cloudinary.com/s0uadvaq/image/upload/v1793421431/EXQ.jpg"
                    className="h-auto w-full max-w-[260px] rounded-2xl border border-2px"
                    loading="eager"
                    />
                </div>

                {/* プラス */}
                <div className="text-4xl font-light text-[#c8b79e]">＋</div>

                {/* かるた画像 */}
                <div className="flex flex-col items-center">
                    <p className="mb-3 text-sm font-bold text-[#d27e5c]">
                    かるた
                    </p>
                    <img
                    src="https://res.cloudinary.com/s0uadvaq/image/upload/v1793421422/EX.jpg"
                    className="h-auto w-full max-w-[60px]"
                    loading="eager"
                    />
                </div>
                </div>
            </div>

            {/* 下向き矢印 */}
            <div className="py-2 text-2xl text-[#c8b79e]">↓</div>

            {/* 完成図 */}
            <div className="flex flex-col items-center">
                <p className="mb-3 text-sm font-bold text-[#d27e5c]">
                    かるたが入ったことで作られた謎
                </p>
                <img
                  src="https://res.cloudinary.com/s0uadvaq/image/upload/v1793422665/EX_EX.jpg"
                  className="h-auto w-[55%] max-w-[260px] rounded-2xl border border-2px"
                  loading="eager"
                />
            </div>
        </section>

        <div className="howto-text">
          {howtoParagraphs.map((paragraph, i) => <p key={i}>{paragraph}</p>)}
        </div>
        
{/* 注意事項 */}
<section className="mx-auto w-full max-w-5xl pb-6">
  <div
    className="
      max-w-[680px]
      rounded-[24px]
      border border-[#e8d79a]
      bg-[#fff9df]
      px-4 pt-4 pb-2
      md:px-10
      mx-auto
    "
  >
    {/* 見出し */}
    <div className="mb-2 flex items-center justify-center gap-3">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#b47d24"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className="shrink-0"
      >
        <path d="m10.29 3.86-8.48 14.14A2 2 0 0 0 3.52 21h16.96a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
        <path d="M12 9v4" />
        <path d="M12 17h.01" />
      </svg>

      <h2 className="m-0 text-[16px] font-bold text-[#77551d]">
        注意事項
      </h2>
    </div>

    {/* 区切り線 */}
    <div className="mb-4 h-px w-full bg-[#e8d79a]" />

    {/* 注意事項一覧 */}
    <div className="mx-auto max-w-2xl space-y-5">
      {[
        "イラストを適用させて問題を解くこと",
        "左から順番に適用すること",
        "解答はひらがなで行うこと",
        "指示がある場合にはそれに従うこと",
        "ソースコードの閲覧は必要ありません",
      ].map((text, index) => (
        <div key={index} className="mb-3 flex items-start gap-2">
          {/* チェックアイコン */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#c09a38"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className="mt-1 shrink-0"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="m8 12 3 3 5-6" />
          </svg>

          <p className="m-0 text-[15px] leading-7 text-[#77551d] md:text-base">
            {text}
          </p>
        </div>
      ))}
    </div>
  </div>
</section>


        <div className="story-actions">
          <button type="button" className="story-secondary" onClick={onBack}>戻る</button>
          <button type="button" className="primary story-button" onClick={onNext}>ゲームを始める</button>
        </div>
      </section>

      <Footer />
    </main>
  );
}