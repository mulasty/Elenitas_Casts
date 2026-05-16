"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl";

const kpopVideos = [
  { id: "IHNzOHi8sJs", title: "BLACKPINK - DDU-DU DDU-DU", group: "blackpink" },
  { id: "gQlMMD8auMs", title: "BLACKPINK - Pink Venom", group: "blackpink" },
  { id: "VkMS0E1q4pQ", title: "ILLIT - Magnetic", group: "illit" },
];

export default function Chapter4_Kpop() {
  const t = useTranslations("chapter4");
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="kpop"
      ref={ref}
      className="relative min-h-screen py-24 px-4 overflow-hidden"
    >
      {/* Holographic background */}
      <div className="absolute inset-0 gradient-holo opacity-20 pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-[5%] right-[10%] text-6xl opacity-20"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          💿
        </motion.div>
        <motion.div
          className="absolute bottom-[10%] left-[5%] text-5xl opacity-20"
          animate={{ rotate: [0, -360] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        >
          🎤
        </motion.div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1 bg-[#C3B1E1] border-[3px] border-[#2D2D2D] rounded-full text-sm font-bold text-white mb-4 shadow-[3px_3px_0px_rgba(45,45,45,0.1)]">
            {t("label")}
          </span>
          <h2 className="font-[family-name:var(--font-fredoka)] text-4xl md:text-6xl text-[#2D2D2D] manga-title mb-4">
            {t("title")}
          </h2>
          <p className="text-lg text-[#2D2D2D]/70 max-w-2xl mx-auto">
            {t("description")}
          </p>
        </motion.div>

        {/* Lightstick Shrine */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mb-16"
        >
          <div className="manga-panel bg-white p-6 md:p-8 relative overflow-visible">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#D4AF37] text-white font-[family-name:var(--font-bangers)] text-sm px-4 py-1 border-[3px] border-[#2D2D2D] rounded-full shadow-sm">
              ✨ {t("bias")} ✨
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-4">
              <BiasCard
                name="ILLIT"
                color="#FF6B9D"
                emoji="💗"
                desc={t("illit")}
                delay={0.3}
              />
              <BiasCard
                name="BLACKPINK"
                color="#000000"
                emoji="🖤"
                desc={t("blackpink")}
                delay={0.45}
              />
              <BiasCard
                name="Lightstick"
                color="#D4AF37"
                emoji="💫"
                desc="DIY Collection"
                delay={0.6}
              />
              <BiasCard
                name="Albums"
                color="#C3B1E1"
                emoji="💿"
                desc="My Collection"
                delay={0.75}
              />
            </div>

            {/* Floating deco */}
            <motion.div
              className="absolute -right-4 -top-4 text-4xl"
              animate={{ y: [0, -10, 0], rotate: [0, 10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              🌟
            </motion.div>
            <motion.div
              className="absolute -left-4 bottom-4 text-3xl"
              animate={{ y: [0, -8, 0], rotate: [0, -10, 0] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            >
              ✨
            </motion.div>
          </div>
        </motion.div>

        {/* Music Videos Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {kpopVideos.map((video, i) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + i * 0.15 }}
              className="manga-panel overflow-hidden group"
            >
              <div className="relative aspect-video bg-[#2D2D2D]">
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
                <span
                  className={`inline-block px-2 py-0.5 rounded text-xs font-bold mb-1 ${
                    video.group === "blackpink"
                      ? "bg-[#2D2D2D] text-white"
                      : "bg-[#FF6B9D] text-white"
                  }`}
                >
                  {video.group.toUpperCase()}
                </span>
                <h3 className="font-[family-name:var(--font-nunito)] text-sm font-bold text-[#2D2D2D]">
                  {video.title}
                </h3>
              </div>

              {/* Holographic shine on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none bg-gradient-to-tr from-transparent via-white to-transparent" />
            </motion.div>
          ))}
        </div>

        {/* Lightstick Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="grid md:grid-cols-2 gap-8"
        >
          <div className="manga-panel bg-gradient-to-br from-[#FFD1DC] to-[#C3B1E1] p-6 flex flex-col items-center text-center">
            <h3 className="font-[family-name:var(--font-fredoka)] text-2xl text-[#2D2D2D] mb-4">
              {t("favSong")}
            </h3>
            <div className="w-32 h-32 rounded-full bg-white border-[4px] border-[#2D2D2D] flex items-center justify-center mb-4 shadow-[4px_4px_0px_rgba(45,45,45,0.15)]">
              <span className="text-5xl">🎵</span>
            </div>
            <p className="font-[family-name:var(--font-bangers)] text-xl text-[#D4AF37] sfx-text">
              ILLIT — Magnetic
            </p>
            <div className="mt-3 flex gap-2">
              <span className="px-2 py-0.5 bg-white border-2 border-[#2D2D2D] rounded text-xs font-bold">#1</span>
              <span className="px-2 py-0.5 bg-white border-2 border-[#2D2D2D] rounded text-xs font-bold">K-Pop</span>
            </div>
          </div>

          <div className="manga-panel bg-gradient-to-br from-[#2D2D2D] to-[#000000] p-6 flex flex-col items-center text-center text-white">
            <h3 className="font-[family-name:var(--font-fredoka)] text-2xl mb-4">
              {t("blackpink")}
            </h3>
            <div className="w-32 h-32 rounded-full bg-[#FF6B9D] border-[4px] border-white flex items-center justify-center mb-4 shadow-[4px_4px_0px_rgba(255,255,255,0.2)]">
              <span className="text-5xl">🖤</span>
            </div>
            <p className="font-[family-name:var(--font-bangers)] text-xl text-[#D4AF37] sfx-text">
              In Your Area!
            </p>
            <div className="mt-3 flex gap-2">
              <span className="px-2 py-0.5 bg-[#FF6B9D] border-2 border-white rounded text-xs font-bold">Pink</span>
              <span className="px-2 py-0.5 bg-white/20 border-2 border-white rounded text-xs font-bold">Venom</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function BiasCard({
  name,
  color,
  emoji,
  desc,
  delay,
}: {
  name: string;
  color: string;
  emoji: string;
  desc: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, type: "spring" }}
      className="flex flex-col items-center text-center gap-2"
    >
      <div
        className="w-16 h-16 rounded-2xl border-[3px] border-[#2D2D2D] flex items-center justify-center text-3xl shadow-[3px_3px_0px_rgba(45,45,45,0.15)]"
        style={{ backgroundColor: color }}
      >
        {emoji}
      </div>
      <span className="font-[family-name:var(--font-fredoka)] text-sm font-bold text-[#2D2D2D]">
        {name}
      </span>
      <span className="text-xs text-[#2D2D2D]/60">{desc}</span>
    </motion.div>
  );
}
