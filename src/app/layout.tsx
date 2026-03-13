import type { Metadata, Viewport } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const viewport: Viewport = {
  themeColor: "#e63946",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: "炭焼やきとり一番 三条添川店 | 予約ハブ",
  description: "奈良・三条添川の味、炭火で一串ずつ丁寧に。鮮度と技が織りなす極上の焼き鳥を。ご予約はこちらから（当日・お急ぎはお電話で）。",
  keywords: ["焼き鳥", "奈良", "三条添川", "居酒屋", "予約", "炭火焼"],
  openGraph: {
    title: "炭焼やきとり一番 三条添川店 | 予約ハブ",
    description: "奈良・三条添川の味、炭火で一串ずつ丁寧に。鮮度と技が織りなす極上の焼き鳥を。",
    url: "https://reservation.yakitori-ichiban.jp", // 仮
    siteName: "炭焼やきとり一番 三条添川店",
    images: [{ url: "/ogp.png" }],
    locale: "ja_JP",
    type: "website",
  },
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang="ja">
      <body className={`${inter.variable} ${outfit.variable} antialiased font-sans`}>
        {/* GA4 Conditional Loading based on consent */}
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                // 同意が得られている場合のみ読み込むロジック
                if (typeof window !== 'undefined' && localStorage.getItem('ga_consent') === 'granted') {
                  gtag('config', '${GA_ID}', {
                    page_path: window.location.pathname,
                  });
                }
              `}
            </Script>
          </>
        )}
        {children}
      </body>
    </html>
  );
}
