import type { Metadata } from "next";
import { nunito, fredoka, notoSansKr, bangers } from "@/lib/fonts";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://elenitascats.pl"),
  title: {
    default: "Elenita's Cats — Kotki, Roblox i K-Pop w stylu Mangi",
    template: "%s | Elenita's Cats",
  },
  description: "Oficjalna strona Elenita's Cats. Krótkie filmiki o kotach, Roblox, śmieszne zwierzęta i K-pop w interaktywnym stylu webtoon!",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    type: "website",
    siteName: "Elenita's Cats",
    locale: "pl_PL",
    alternateLocale: ["en_US", "ko_KR"],
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pl"
      className={`${nunito.variable} ${fredoka.variable} ${notoSansKr.variable} ${bangers.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#FFF5F7] text-[#2D2D2D] font-[family-name:var(--font-nunito)]">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
