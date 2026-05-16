"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl";
import { BookOpen, ShoppingBag, Clock } from "lucide-react";

export default function Chapter7_Blog() {
  const t = useTranslations("chapter7");
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const previews = [
    { title: t("preview1"), icon: "🎮", color: "#AEC6CF" },
    { title: t("preview2"), icon: "💫", color: "#C3B1E1" },
    { title: t("preview3"), icon: "🐱", color: "#FFD1DC" },
  ];

  return (
    <section
      id="blog"
      ref={ref}
      className="relative py-24 px-4 overflow-hidden"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1 bg-[#77DD77] border-[3px] border-[#2D2D2D] rounded-full text-sm font-bold text-[#2D2D2D] mb-4 shadow-[3px_3px_0px_rgba(45,45,45,0.1)]">
            {t("label")}
          </span>
          <h2 className="font-[family-name:var(--font-fredoka)] text-4xl md:text-5xl text-[#2D2D2D] manga-title mb-4">
            {t("title")}
          </h2>
          <p className="text-lg text-[#2D2D2D]/70">{t("description")}</p>
        </motion.div>

        {/* Coming Soon Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.2 }}
          className="manga-panel bg-[#FFF5F7] p-8 text-center mb-12"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="inline-block text-6xl mb-4"
          >
            📝
          </motion.div>
          <h3 className="font-[family-name:var(--font-bangers)] text-3xl text-[#D4AF37] mb-2">
            {t("comingSoon")}
          </h3>
          <div className="flex items-center justify-center gap-2 text-[#2D2D2D]/60">
            <Clock size={18} />
            <span className="text-sm">Work in progress...</span>
          </div>
        </motion.div>

        {/* Preview Cards */}
        <div className="grid md:grid-cols-3 gap-4">
          {previews.map((preview, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 + i * 0.15 }}
              className="manga-panel p-5 flex flex-col items-center text-center gap-3 opacity-60 hover:opacity-100 transition-opacity"
              style={{ backgroundColor: `${preview.color}20` }}
            >
              <span className="text-4xl">{preview.icon}</span>
              <BookOpen size={20} className="text-[#2D2D2D]/40" />
              <p className="font-[family-name:var(--font-nunito)] text-sm font-bold text-[#2D2D2D]">
                {preview.title}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Chapter8_Merch() {
  const t = useTranslations("chapter8");
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const items = [
    { name: t("items.stickers"), icon: "🐱", color: "#FFD1DC" },
    { name: t("items.keychain"), icon: "💫", color: "#D4AF37" },
    { name: t("items.tote"), icon: "🛍️", color: "#C3B1E1" },
  ];

  return (
    <section
      id="merch"
      ref={ref}
      className="relative py-24 px-4 overflow-hidden bg-gradient-to-b from-[#FFF5F7] to-[#FFD1DC]/30"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1 bg-[#FF6B9D] border-[3px] border-[#2D2D2D] rounded-full text-sm font-bold text-white mb-4 shadow-[3px_3px_0px_rgba(45,45,45,0.1)]">
            {t("label")}
          </span>
          <h2 className="font-[family-name:var(--font-fredoka)] text-4xl md:text-5xl text-[#2D2D2D] manga-title mb-4">
            {t("title")}
          </h2>
          <p className="text-lg text-[#2D2D2D]/70">{t("comingSoon")}</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.3 + i * 0.15, type: "spring" }}
              className="manga-panel p-6 flex flex-col items-center text-center gap-4"
              style={{ backgroundColor: `${item.color}30` }}
            >
              <div
                className="w-20 h-20 rounded-2xl border-[3px] border-[#2D2D2D] flex items-center justify-center text-4xl shadow-[4px_4px_0px_rgba(45,45,45,0.15)]"
                style={{ backgroundColor: item.color }}
              >
                {item.icon}
              </div>
              <ShoppingBag size={20} className="text-[#2D2D2D]/40" />
              <h3 className="font-[family-name:var(--font-fredoka)] text-lg text-[#2D2D2D]">
                {item.name}
              </h3>
              <span className="px-3 py-1 bg-[#2D2D2D] text-white text-xs font-bold rounded-full">
                SOON
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
