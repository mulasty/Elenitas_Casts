"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl";

const funnyVideos = [
  { id: "t8RPLVC3wag", title: "Funny moment #1" },
  { id: "jNQXAC9IVRw", title: "Animal meme" },
];

export default function Chapter5_FunnyAnimalz() {
  const t = useTranslations("chapter5");
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="funny"
      ref={ref}
      className="relative min-h-screen py-24 px-4 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1 bg-[#FFCC99] border-[3px] border-[#2D2D2D] rounded-full text-sm font-bold text-[#2D2D2D] mb-4 shadow-[3px_3px_0px_rgba(45,45,45,0.1)]">
            {t("label")}
          </span>
          <h2 className="font-[family-name:var(--font-fredoka)] text-4xl md:text-6xl text-[#2D2D2D] manga-title mb-4">
            {t("title")}
          </h2>
          <p className="text-lg text-[#2D2D2D]/70 max-w-2xl mx-auto">
            {t("description")}
          </p>
        </motion.div>

        {/* 4-Koma Layout */}
        <div className="grid grid-cols-2 gap-4 mb-12 max-w-3xl mx-auto">
          <KomaPanel
            number={1}
            emoji="😹"
            text={t("panel1")}
            color="#FFD1DC"
            delay={0.2}
            isInView={isInView}
          />
          <KomaPanel
            number={2}
            emoji="🙀"
            text={t("panel2")}
            color="#AEC6CF"
            delay={0.4}
            isInView={isInView}
          />
          <KomaPanel
            number={3}
            emoji="🤣"
            text={t("panel3")}
            color="#77DD77"
            delay={0.6}
            isInView={isInView}
          />
          <KomaPanel
            number={4}
            emoji="🥰"
            text={t("panel4")}
            color="#C3B1E1"
            delay={0.8}
            isInView={isInView}
          />
        </div>

        {/* Videos */}
        <div className="grid md:grid-cols-2 gap-6">
          {funnyVideos.map((video, i) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1.0 + i * 0.2 }}
              className="manga-panel overflow-hidden"
            >
              <div className="relative aspect-video">
                <iframe
                  src={`https://www.youtube.com/embed/${video.id}?rel=0&modestbranding=1`}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                  className="w-full h-full"
                />
              </div>
              <div className="p-4 bg-white border-t-[3px] border-[#2D2D2D]">
                <h3 className="font-[family-name:var(--font-fredoka)] text-lg text-[#2D2D2D]">
                  {video.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Meme explosion */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 1.4, type: "spring" }}
          className="text-center mt-12"
        >
          <div className="inline-block relative">
            <span className="font-[family-name:var(--font-bangers)] text-5xl md:text-7xl text-[#D4AF37] sfx-text block">
              HAHAHA!
            </span>
            <motion.span
              className="absolute -top-4 -right-4 text-3xl"
              animate={{ rotate: [0, 20, -20, 0], scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              😂
            </motion.span>
            <motion.span
              className="absolute -bottom-2 -left-6 text-3xl"
              animate={{ rotate: [0, -20, 20, 0], scale: [1, 1.2, 1] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            >
              🤪
            </motion.span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function KomaPanel({
  number,
  emoji,
  text,
  color,
  delay,
  isInView,
}: {
  number: number;
  emoji: string;
  text: string;
  color: string;
  delay: number;
  isInView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, rotate: number % 2 === 0 ? 3 : -3 }}
      animate={isInView ? { opacity: 1, rotate: number % 2 === 0 ? 1 : -1 } : {}}
      transition={{ delay, duration: 0.5 }}
      className="manga-panel p-6 flex flex-col items-center text-center gap-3 min-h-[200px]"
      style={{ backgroundColor: `${color}30` }}
    >
      <span className="absolute top-2 left-2 bg-[#2D2D2D] text-white font-[family-name:var(--font-bangers)] text-xs px-1.5 py-0.5 rounded">
        {number}
      </span>
      <motion.span
        className="text-5xl"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 2, repeat: Infinity, delay: number * 0.3 }}
      >
        {emoji}
      </motion.span>
      <p className="font-[family-name:var(--font-nunito)] text-sm font-bold text-[#2D2D2D]">
        {text}
      </p>
    </motion.div>
  );
}
