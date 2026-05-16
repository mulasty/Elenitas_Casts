"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, usePathname } from "@/i18n/routing";
import { useTranslations, useLocale } from "next-intl";
import { Menu, X, Cat, Gamepad2, Music, Laugh, Play } from "lucide-react";

const navItems = [
  { key: "cats", href: "#cats", icon: Cat },
  { key: "roblox", href: "#roblox", icon: Gamepad2 },
  { key: "kpop", href: "#kpop", icon: Music },
  { key: "funny", href: "#funny", icon: Laugh },
  { key: "subscribe", href: "#subscribe", icon: Play },
];

export default function Navbar() {
  const t = useTranslations("nav");
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 px-4 py-3"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
    >
      <div className="max-w-6xl mx-auto bg-white/80 backdrop-blur-md border-[3px] border-[#2D2D2D] rounded-2xl shadow-[4px_4px_0px_rgba(45,45,45,0.15)] px-4 py-2 flex items-center justify-between">
        <Link
          href="/"
          className="font-[family-name:var(--font-fredoka)] text-xl text-[#2D2D2D] hover:text-[#FF6B9D] transition-colors"
        >
          🐾 Elenita&apos;s Cats
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.key}
                href={item.href}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-[#2D2D2D] hover:bg-[#FFD1DC]/50 transition-colors"
              >
                <Icon size={16} />
                {t(item.key)}
              </a>
            );
          })}
          <LanguageSwitch />
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-[#FFD1DC]/50"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden mt-2 bg-white/95 backdrop-blur-md border-[3px] border-[#2D2D2D] rounded-2xl shadow-[4px_4px_0px_rgba(45,45,45,0.15)] p-4 max-w-6xl mx-auto"
          >
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.key}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-[#2D2D2D] hover:bg-[#FFD1DC]/50"
                >
                  <Icon size={18} />
                  {t(item.key)}
                </a>
              );
            })}
            <div className="mt-2 pt-2 border-t-2 border-[#2D2D2D]/10">
              <LanguageSwitch />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

function LanguageSwitch() {
  const locale = useLocale();
  const pathname = usePathname();

  const flags: Record<string, string> = {
    pl: "🇵🇱",
    en: "🇬🇧",
    ko: "🇰🇷",
  };

  return (
    <div className="flex items-center gap-1 bg-[#F5F5F5] rounded-lg p-1 border-2 border-[#2D2D2D]/10">
      {(["pl", "en", "ko"] as const).map((l) => (
        <Link
          key={l}
          href={pathname}
          locale={l}
          className={`px-2 py-1 rounded-md text-sm font-medium transition-all ${
            locale === l
              ? "bg-white text-[#FF6B9D] shadow-sm border border-[#2D2D2D]/10"
              : "text-[#2D2D2D]/60 hover:text-[#2D2D2D]"
          }`}
        >
          {flags[l]}
        </Link>
      ))}
    </div>
  );
}
