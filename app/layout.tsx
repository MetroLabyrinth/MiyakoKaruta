import type { Metadata } from "next";
import "./globals.css";
import "./screens.css"

const siteUrl = "https://ka-mi-p.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: "みやこかるた謎",
  description: "札を取り切り、答えを導け。",

  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "みやこかるた謎",
    title: "みやこかるた謎",
    description: "札を取り切り、答えを導け。",
    images: [
      {
        url: "/images/ogp.png",
        width: 2400,
        height: 1353,
        alt: "みやこかるた謎",
      },
    ],
    locale: "ja_JP",
  },

  twitter: {
    card: "summary_large_image",
    title: "みやこかるた謎",
    description: "札を取り切り、答えを導け。",
    images: ["/images/ogp.png"],
  },
};

export default function RootLayout({children}:{children:React.ReactNode}) { return <html lang="ja"><body>{children}</body></html>; }
