import type { Metadata } from "next";
import { nunito, fredoka, notoSansKr, bangers } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Elenita's Cats",
  description: "Kotki, Roblox i K-Pop w stylu Mangi — Official Elenita's Cats",
  icons: {
    icon: "/favicon.ico",
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
      </body>
    </html>
  );
}
