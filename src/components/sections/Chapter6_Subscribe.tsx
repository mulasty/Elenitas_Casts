"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl";

const spotlightLines = Array.from({ length: 6 }, (_, index) => ({
  x2: 180 + index * 216,
  y2: 120 + (index % 2 === 0 ? 140 : 620),
}));

export default function Chapter6_Subscribe() {
  const t = useTranslations("chapter6");
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [count, setCount] = useState(0);
  const targetCount = 15243; // Placeholder — update with real subscriber count

  useEffect(() => {
    if (!isInView) return;
    const duration = 2000;
    const steps = 60;
    const increment = targetCount / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= targetCount) {
        setCount(targetCount);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [isInView]);

  return (
    <section
      id="subscribe"
      ref={ref}
      className="relative min-h-screen py-24 px-4 flex items-center justify-center overflow-hidden"
    >
      {/* Dramatic background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#2D2D2D] to-[#1a1a1a] pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <svg className="w-full h-full" viewBox="0 0 1440 900">
          {spotlightLines.map((line, index) => (
            <line
              key={index}
              x1={720}
              y1={450}
              x2={line.x2}
              y2={line.y2}
              stroke="#D4AF37"
              strokeWidth="2"
              opacity="0.5"
            />
          ))}
        </svg>
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block px-4 py-1 bg-[#D4AF37] border-[3px] border-white rounded-full text-sm font-bold text-[#2D2D2D] mb-6 shadow-[3px_3px_0px_rgba(0,0,0,0.3)]">
            {t("label")}
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
          className="font-[family-name:var(--font-fredoka)] text-5xl md:text-7xl text-white manga-title mb-4"
        >
          {t("title")}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
          className="font-[family-name:var(--font-bangers)] text-2xl md:text-3xl text-[#D4AF37] mb-8 sfx-text"
        >
          {t("subtitle")}
        </motion.p>

        {/* Subscriber Counter */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="mb-12"
        >
          <div className="inline-block bg-white/10 backdrop-blur border-[4px] border-[#D4AF37] rounded-3xl p-8 shadow-[8px_8px_0px_rgba(212,175,55,0.3)]">
            <p className="text-sm text-white/60 uppercase tracking-widest mb-2">
              {t("followers")}
            </p>
            <motion.p
              className="font-[family-name:var(--font-bangers)] text-6xl md:text-7xl text-[#D4AF37]"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {count.toLocaleString()}
            </motion.p>
            <div className="flex items-center justify-center gap-2 mt-2">
              <span className="text-green-400 text-sm">▲</span>
              <span className="text-white/60 text-sm">+123 dzisiaj</span>
            </div>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="text-white/80 text-lg mb-8 max-w-xl mx-auto"
        >
          {t("description")}
        </motion.p>

        {/* Big CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 1.0, type: "spring" }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="https://www.youtube.com/@エレニータ?sub_confirmation=1"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 px-10 py-5 bg-[#FF6B9D] text-white font-[family-name:var(--font-fredoka)] text-xl rounded-2xl border-[4px] border-white shadow-[6px_6px_0px_rgba(255,255,255,0.2)] hover:shadow-[3px_3px_0px_rgba(255,255,255,0.2)] hover:translate-x-[3px] hover:translate-y-[3px] transition-all animate-pulse-heart"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
              <path d="M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.38.55A3.02 3.02 0 0 0 .5 6.19 31.5 31.5 0 0 0 0 12a31.5 31.5 0 0 0 .5 5.81 3.02 3.02 0 0 0 2.12 2.14c1.88.55 9.38.55 9.38.55s7.5 0 9.38-.55a3.02 3.02 0 0 0 2.12-2.14A31.5 31.5 0 0 0 24 12a31.5 31.5 0 0 0-.5-5.81zM9.55 15.5V8.5l6.27 3.5-6.27 3.5z" />
            </svg>
            {t("cta")}
          </a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1.3 }}
          className="mt-8 text-white/40 text-sm"
        >
          {t("thanks")}
        </motion.p>

        {/* Cliffhanger dots */}
        <motion.div
          className="mt-12 flex items-center justify-center gap-2"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <span className="w-3 h-3 bg-[#D4AF37] rounded-full" />
          <span className="w-3 h-3 bg-[#D4AF37] rounded-full" />
          <span className="w-3 h-3 bg-[#D4AF37] rounded-full" />
        </motion.div>
      </div>
    </section>
  );
}
