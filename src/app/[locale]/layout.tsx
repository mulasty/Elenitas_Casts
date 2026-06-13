import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import type { Metadata } from "next";

const LOCALE_OG_MAP: Record<string, string> = {
  pl: "pl_PL",
  en: "en_US",
  ko: "ko_KR",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const messages = await getMessages();
  const meta = (messages as Record<string, Record<string, string>>).meta || {};
  const title = meta.title || "Elenita's Cats";
  const description =
    meta.description ||
    "Oficjalna strona Elenita's Cats. Kotki, Roblox i K-Pop!";

  return {
    title,
    description,
    alternates: {
      canonical: `https://elenitascats.pl/${locale}`,
      languages: { pl: "/pl", en: "/en", ko: "/ko" },
    },
    openGraph: {
      title,
      description,
      locale: LOCALE_OG_MAP[locale] || "pl_PL",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      {children}
    </NextIntlClientProvider>
  );
}
