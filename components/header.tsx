"use client";

import { useState } from "react";

type Props = {
  onRestart: () => void;
  onSecret?: () => void;
  hintUrl?: string;
  secretActive?: boolean;
};


export default function Header({
  onRestart,
  onSecret,
  hintUrl = "/hint",
  secretActive,
}: Props) {
  return (
    <header className="header miyako-header">
      <div className="header-inner miyako-header-inner">
        {/* ロゴ：賞状ギミック */}
        <button
          type="button"
          className="miyako-header-brand"
          onClick={onSecret}
          aria-label="みやこかるた謎のロゴ"
        >
          <div className="header-logo">
            <img
              src={
                  secretActive
                    ? "https://res.cloudinary.com/s0uadvaq/image/upload/v1793422485/header-logo.png"
                    : "https://res.cloudinary.com/s0uadvaq/image/upload/v1793422486/header-karuta-logo.png"
                }
              alt="みやこかるた謎のロゴ"
            />
          </div>
        </button>

        {/* 右側のボタン */}
        <div className="miyako-header-actions">
          <button
            type="button"
            className="miyako-header-button"
            onClick={onRestart}
          >
            最初から
          </button>

          <a
            href={hintUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="miyako-header-button"
          >
            ヒントサイト
          </a>
        </div>
      </div>
    </header>
  );
}
