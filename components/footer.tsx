
"use client";

import { useEffect, useRef, useState } from "react";

const credits = [
  { role: "ディレクター", name: "すいなと" },
  { role: "サブディレクター", name: "ばばりあん" },
  { role: "謎制作", name: "みずだこ、まひる、すいなと" },
  { role: "ストーリー、ヒント", name: "おちあい" },
  { role: "システム", name: "笹錆" },
  { role: "デザイン", name: "すいなと" },
];

export default function Footer() {
  const [creditsOpen, setCreditsOpen] = useState(false);
  const creditsRef = useRef<HTMLDivElement>(null);

  // ESCキー・外側クリックで閉じる
  useEffect(() => {
    if (!creditsOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setCreditsOpen(false);
    };

    const handlePointerDown = (e: PointerEvent) => {
      if (
        creditsRef.current &&
        !creditsRef.current.contains(e.target as Node)
      ) {
        setCreditsOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("pointerdown", handlePointerDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [creditsOpen]);

  return (
    <footer className="relative w-full shrink-0 bg-[#5dad22] text-white">
      <div
        className="
          mx-auto flex min-h-16 w-full
          items-center justify-between
          gap-4 px-4 py-3
          md:px-[5%] lg:px-[12.5%]
        "
      >
        {/* 左側：コピーライト */}
        <p className="m-0 text-xs max-[480px]:text-[10px]">
          © 2026 みやこかるた謎
        </p>


        {/* 右側：ボタンと吹き出し */}
        <div ref={creditsRef} className="relative shrink-0">
          <button
            type="button"
            aria-expanded={creditsOpen}
            aria-controls="footer-credits"
            onClick={() => setCreditsOpen((prev) => !prev)}
            className="
              rounded-lg border border-white/70
              bg-transparent px-4 py-2
              text-xs font-bold tracking-wider text-white
              cursor-pointer transition-colors duration-200
              hover:bg-white hover:text-[#5dad22]
            "
          >
            CREDITS
          </button>

          {creditsOpen && (
            <div
              id="footer-credits"
              role="region"
              aria-label="制作クレジット"
              className="
                absolute bottom-[calc(100%+30px)] right-0
                z-[3000]
                w-[min(320px,calc(100vw-24px))]
                max-h-[100dvh] overflow-y-auto
                rounded-2xl bg-[#5dad22]
                px-6 py-3 text-center text-white
                shadow-xl
                hidden-scrollbar
              "
            >
              <h2 className="mb-4 text-xl font-bold tracking-widest">
                CREDITS
              </h2>

              <div className="flex flex-col gap-3">
                {credits.map((item) => (
                  <div key={item.role}>
                    <p className="mb-1 text-xs text-white/80">
                      {item.role}
                    </p>
                    <p className="text-base font-bold">
                      {item.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}
