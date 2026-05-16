"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Play, Heart, Music } from "lucide-react";

export default function Footer() {
  const t = useTranslations("footer");
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [pawCount, setPawCount] = useState(0);

  const handlePawClick = () => {
    const newCount = pawCount + 1;
    setPawCount(newCount);
    if (newCount >= 3) {
      setShowEasterEgg(true);
      setTimeout(() => setShowEasterEgg(false), 3000);
      setPawCount(0);
    }
  };

  return (
    <footer className="relative py-16 px-4 bg-[#2D2D2D] text-white overflow-hidden">
      {/* Top border decoration */}
      <div className="absolute top-0 left-0 right-0 h-2 gradient-holo" />

      <div className="max-w-4xl mx-auto text-center">
        {/* Social Links */}
        <div className="flex items-center justify-center gap-6 mb-8">
          <SocialLink
            href="https://www.youtube.com/@エレニータ"
            icon={<Play size={24} />}
            label="YouTube"
            color="#FF6B9D"
          />
          <SocialLink
            href="https://www.tiktok.com/@itss_elenitaa"
            icon={<Music size={24} />}
            label="TikTok"
            color="#C3B1E1"
          />
          <SocialLink
            href="#"
            icon={<Heart size={24} />}
            label="Instagram"
            color="#FFD1DC"
          />
        </div>

        {/* Credits */}
        <motion.p
          className="font-[family-name:var(--font-fredoka)] text-xl text-white/90 mb-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          🐾 {t("credits")} 🐾
        </motion.p>

        <motion.p
          className="text-sm text-white/40 mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {t("copyright")}
        </motion.p>

        {/* Easter Egg Paw */}
        <motion.button
          onClick={handlePawClick}
          className="inline-block text-3xl opacity-20 hover:opacity-80 transition-opacity cursor-none"
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          title="Click me!"
        >
          🐾
        </motion.button>

        {/* Easter Egg Message */}
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.8 }}
          animate={
            showEasterEgg
              ? { opacity: 1, y: 0, scale: 1 }
              : { opacity: 0, y: 10, scale: 0.8 }
          }
          transition={{ type: "spring" }}
          className="mt-4"
        >
          <span className="inline-block bg-[#FFD1DC] text-[#2D2D2D] font-[family-name:var(--font-fredoka)] text-sm px-4 py-2 rounded-xl border-[3px] border-[#2D2D2D] shadow-[4px_4px_0px_rgba(45,45,45,0.2)]">
            {t("easterEgg")}
          </span>
        </motion.div>

        {/* Korean footer text */}
        <p className="mt-8 text-xs text-white/20 font-[family-name:var(--font-noto-sans-kr)]">
          고양이와 케이팝을 사랑하는 모든 이들에게 — Elenita
        </p>
      </div>
    </footer>
  );
}

function SocialLink({
  href,
  icon,
  label,
  color,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  color: string;
}) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-center w-12 h-12 rounded-full border-[3px] border-white/20 hover:border-white transition-colors"
      style={{ backgroundColor: `${color}30` }}
      whileHover={{ scale: 1.1, y: -4 }}
      whileTap={{ scale: 0.95 }}
      aria-label={label}
    >
      {icon}
    </motion.a>
  );
}
