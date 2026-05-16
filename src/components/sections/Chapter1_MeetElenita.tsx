"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl";
import ParticleField, { GlowOrb, FloatingBlocks } from "@/components/effects/ParticleField";
import GlitchText from "@/components/effects/GlitchText";
import MagneticButton from "@/components/effects/MagneticButton";
import ConfettiBurst from "@/components/effects/ConfettiBurst";

export default function Chapter1_MeetElenita() {
  const t = useTranslations("chapter1");
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [confetti, setConfetti] = useState(false);

  const triggerConfetti = () => {
    setConfetti(true);
    setTimeout(() => setConfetti(false), 100);
  };

  return (
    <section
      id="chapter1"
      ref={ref}
      className="relative min-h-screen py-24 px-4 flex items-center justify-center overflow-hidden"
    >
      <ParticleField count={20} className="opacity-50" />
      <GlowOrb color="#C3B1E1" size={300} className="top-[20%] right-[-5%]" />
      <FloatingBlocks count={5} />

      {/* Korean deco background text */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <span className="korean-deco absolute top-[10%] left-[5%] text-6xl font-bold">
          안녕하세요
        </span>
        <span className="korean-deco absolute bottom-[20%] right-[10%] text-5xl font-bold">
          구독
        </span>
        <span className="korean-deco absolute top-[50%] right-[5%] text-4xl font-bold">
          좋아요
        </span>
      </div>

      <div className="max-w-6xl mx-auto w-full relative z-10">
        {/* Chapter label */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <motion.span
            className="inline-block px-4 py-1 bg-[#C3B1E1] border-[3px] border-[#2D2D2D] rounded-full text-sm font-bold text-white shadow-[3px_3px_0px_rgba(45,45,45,0.1)]"
            whileHover={{ scale: 1.05 }}
          >
            {t("label")}
          </motion.span>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Character Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <TiltCard>
              <div className="bg-white border-[4px] border-[#2D2D2D] p-6 shadow-[8px_8px_0px_rgba(45,45,45,0.15)]">
                {/* Character header */}
                <div className="flex items-center gap-4 mb-6">
                  <motion.div
                    className="w-24 h-24 rounded-full border-[3px] border-[#2D2D2D] bg-gradient-to-br from-[#FFD1DC] to-[#AEC6CF] flex items-center justify-center text-5xl shadow-[4px_4px_0px_rgba(45,45,45,0.1)]"
                    whileHover={{ scale: 1.1, rotate: [0, -10, 10, 0] }}
                    transition={{ type: "spring" }}
                  >
                    👧
                  </motion.div>
                  <div>
                    <h2 className="font-[family-name:var(--font-fredoka)] text-3xl text-[#2D2D2D]">
                      Elenita
                    </h2>
                    <p className="text-sm text-[#2D2D2D]/60 font-medium">
                      Main Character ⭐
                    </p>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <StatBar label={t("stats.cats")} value={90} color="#FFD1DC" emoji="🐱" />
                  <StatBar label={t("stats.roblox")} value={85} color="#AEC6CF" emoji="🎮" />
                  <StatBar label={t("stats.kpop")} value={95} color="#C3B1E1" emoji="🎵" />
                  <StatBar label={t("stats.illit")} value={100} color="#FF6B9D" emoji="💗" />
                </div>

                {/* Character tags */}
                <div className="flex flex-wrap gap-2">
                  {["#CatMom", "#RobloxPlayer", "#KpopStan", "#ILLIT"].map((tag, i) => (
                    <motion.span
                      key={tag}
                      className="px-3 py-1 bg-[#FFD1DC] border-2 border-[#2D2D2D] rounded-full text-xs font-bold text-[#2D2D2D] cursor-pointer"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={triggerConfetti}
                      style={{
                        backgroundColor: ["#FFD1DC", "#AEC6CF", "#C3B1E1", "#FFCC99"][i],
                      }}
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
              </div>
            </TiltCard>

            <ConfettiBurst trigger={confetti} count={30} />

            {/* Floating speech bubbles */}
            <motion.div
              className="absolute -top-4 -right-4 md:right-8"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            >
              <div className="speech-bubble bg-[#FFD1DC] border-[#2D2D2D]">
                <p className="font-[family-name:var(--font-fredoka)] text-lg text-[#2D2D2D]">
                  {t("speech.greeting")}
                </p>
              </div>
            </motion.div>

            <motion.div
              className="absolute bottom-8 -left-4 md:-left-8"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
            >
              <div className="speech-bubble bg-[#AEC6CF] border-[#2D2D2D]" style={{ borderRadius: "20px 20px 20px 4px" }}>
                <p className="font-[family-name:var(--font-bangers)] text-lg text-[#2D2D2D]">
                  {t("speech.excited")}
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Bio & Details */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="space-y-6"
          >
            <GlitchText as="h2" className="font-[family-name:var(--font-fredoka)] text-4xl md:text-5xl text-[#2D2D2D] manga-title">
              {t("title")}
            </GlitchText>

            <motion.div
              className="manga-panel p-6"
              whileHover={{ scale: 1.02, rotate: 0.5 }}
              transition={{ type: "spring" }}
            >
              <p className="text-lg leading-relaxed text-[#2D2D2D]/80">
                {t("bio")}
              </p>
            </motion.div>

            {/* Mini comic panels */}
            <div className="grid grid-cols-3 gap-3">
              <MiniPanel emoji="🎮" text={t("speech.roblox")} color="#AEC6CF" delay={0.6} />
              <MiniPanel emoji="🎵" text={t("speech.kpop")} color="#C3B1E1" delay={0.8} />
              <MiniPanel emoji="🐱" text={t("stats.cats")} color="#FFD1DC" delay={1.0} />
            </div>

            {/* Korean flag deco */}
            <motion.div
              className="flex items-center gap-3 opacity-60"
              whileHover={{ opacity: 1, scale: 1.05 }}
            >
              <span className="text-2xl">🇰🇷</span>
              <span className="font-[family-name:var(--font-noto-sans-kr)] text-sm text-[#2D2D2D]">
                케이팝과 고양이를 사랑하는 인플루언서
              </span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function StatBar({
  label,
  value,
  color,
  emoji,
}: {
  label: string;
  value: number;
  color: string;
  emoji: string;
}) {
  return (
    <motion.div
      className="bg-[#F5F5F5] rounded-xl p-3 border-2 border-[#2D2D2D]/10"
      whileHover={{ scale: 1.05, borderColor: color }}
      transition={{ type: "spring" }}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-bold text-[#2D2D2D]">
          {emoji} {label}
        </span>
        <span className="text-xs font-bold text-[#2D2D2D]/60">{value}%</span>
      </div>
      <div className="h-3 bg-white rounded-full border-2 border-[#2D2D2D]/10 overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          whileInView={{ width: `${value}%` }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
      </div>
    </motion.div>
  );
}

function MiniPanel({
  emoji,
  text,
  color,
  delay,
}: {
  emoji: string;
  text: string;
  color: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ scale: 1.1, rotate: [0, -3, 3, 0] }}
      className="manga-panel p-4 flex flex-col items-center text-center gap-2 cursor-pointer"
      style={{ borderColor: "#2D2D2D", backgroundColor: color }}
    >
      <motion.span
        className="text-3xl"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 2, repeat: Infinity, delay }}
      >
        {emoji}
      </motion.span>
      <span className="text-xs font-bold text-[#2D2D2D]">{text}</span>
    </motion.div>
  );
}

function TiltCard({ children }: { children: React.ReactNode }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    cardRef.current.style.transform = `perspective(1000px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = "perspective(1000px) rotateY(0deg) rotateX(0deg)";
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="transition-transform duration-200 ease-out"
      style={{ transformStyle: "preserve-3d" }}
    >
      {children}
    </div>
  );
}
