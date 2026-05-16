"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTranslations } from "next-intl";
import { ChevronDown } from "lucide-react";
import ParticleField, { GlowOrb } from "@/components/effects/ParticleField";
import GlitchText from "@/components/effects/GlitchText";
import MagneticButton from "@/components/effects/MagneticButton";
import ConfettiBurst from "@/components/effects/ConfettiBurst";

const heroSpeedLines = Array.from({ length: 12 }, (_, index) => ({
  x1: 72 + index * 112,
  x2: 196 + ((index * 137) % 960),
}));

export default function HeroSection() {
  const t = useTranslations("hero");
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);

  const [confetti, setConfetti] = useState(false);

  const triggerConfetti = () => {
    setConfetti(true);
    setTimeout(() => setConfetti(false), 100);
  };

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Particle field */}
      <ParticleField count={40} colors={["#FFD1DC", "#AEC6CF", "#C3B1E1", "#77DD77", "#FFCC99", "#D4AF37"]} />

      {/* Glow orbs */}
      <GlowOrb color="#FFD1DC" size={400} className="top-[10%] left-[-10%]" />
      <GlowOrb color="#AEC6CF" size={350} className="bottom-[20%] right-[-5%]" />
      <GlowOrb color="#C3B1E1" size={250} className="top-[50%] left-[60%]" />

      {/* Layer 1: Background clouds */}
      <motion.div
        style={{ y: y1 }}
        className="absolute inset-0 z-0 opacity-40"
      >
        <svg className="w-full h-full" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
          <ellipse cx="200" cy="150" rx="180" ry="60" fill="#FFD1DC" opacity="0.6" />
          <ellipse cx="1200" cy="200" rx="220" ry="80" fill="#AEC6CF" opacity="0.5" />
          <ellipse cx="700" cy="100" rx="150" ry="50" fill="#C3B1E1" opacity="0.4" />
          <ellipse cx="400" cy="400" rx="200" ry="70" fill="#FFCC99" opacity="0.3" />
          <ellipse cx="1000" cy="500" rx="250" ry="90" fill="#77DD77" opacity="0.3" />
        </svg>
      </motion.div>

      {/* Layer 2: Floating cats & elements */}
      <motion.div style={{ y: y2 }} className="absolute inset-0 z-10 pointer-events-none">
        <FloatingElement x="10%" y="20%" delay={0} emoji="🐱" size="lg" />
        <FloatingElement x="85%" y="15%" delay={1.5} emoji="🐾" size="md" />
        <FloatingElement x="75%" y="70%" delay={0.8} emoji="🐈" size="lg" />
        <FloatingElement x="15%" y="75%" delay={2} emoji="✨" size="sm" />
        <FloatingElement x="50%" y="85%" delay={1} emoji="💗" size="md" />
        <FloatingElement x="90%" y="45%" delay={2.5} emoji="🎮" size="md" />
        <FloatingElement x="5%" y="50%" delay={1.2} emoji="🎵" size="sm" />
        <FloatingElement x="60%" y="10%" delay={0.5} emoji="🌸" size="sm" />
        <FloatingElement x="30%" y="60%" delay={1.8} emoji="🦋" size="sm" />
        <FloatingElement x="70%" y="30%" delay={0.3} emoji="⭐" size="md" />
      </motion.div>

      {/* Layer 3: Lightstick decorations */}
      <motion.div style={{ y: y3 }} className="absolute inset-0 z-10 pointer-events-none">
        <div className="absolute top-[15%] left-[5%] w-16 h-48 rotate-[-15deg] opacity-30">
          <Lightstick color="#FF6B9D" />
        </div>
        <div className="absolute top-[60%] right-[8%] w-16 h-48 rotate-[10deg] opacity-30">
          <Lightstick color="#D4AF37" />
        </div>
        <div className="absolute bottom-[20%] left-[20%] w-14 h-40 rotate-[-8deg] opacity-20">
          <Lightstick color="#AEC6CF" />
        </div>
        <div className="absolute top-[40%] left-[80%] w-12 h-36 rotate-[5deg] opacity-25">
          <Lightstick color="#C3B1E1" />
        </div>
      </motion.div>

      {/* Main Content */}
      <motion.div
        style={{ opacity, scale }}
        className="relative z-20 text-center px-4 max-w-4xl mx-auto"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.span
            className="inline-block px-4 py-1 bg-[#FFD1DC] border-[3px] border-[#2D2D2D] rounded-full text-sm font-bold text-[#2D2D2D] mb-4 shadow-[3px_3px_0px_rgba(45,45,45,0.1)]"
            whileHover={{ scale: 1.05 }}
          >
            {t("chapter")}
          </motion.span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4, type: "spring" }}
          className="font-[family-name:var(--font-fredoka)] text-6xl md:text-8xl lg:text-9xl text-[#2D2D2D] manga-title mb-2"
        >
          Elenita&apos;s
          <br />
          <span className="gradient-holo-text">Cats</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="relative inline-block mb-6"
        >
          <p className="font-[family-name:var(--font-nunito)] text-xl md:text-2xl text-[#2D2D2D]/80 font-semibold">
            {t("subtitle")}
          </p>
          <motion.span
            className="absolute -right-8 -top-4 font-[family-name:var(--font-bangers)] text-2xl text-[#D4AF37] sfx-text"
            animate={{ rotate: [-5, 5, -5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {t("deco.nyan")}
          </motion.span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="flex flex-col items-center gap-4"
        >
          <MagneticButton strength={0.4}>
            <motion.a
              href="#chapter1"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#FF6B9D] text-white font-[family-name:var(--font-fredoka)] text-lg rounded-2xl border-[3px] border-[#2D2D2D] shadow-[5px_5px_0px_#2D2D2D]"
              whileHover={{
                boxShadow: "8px 8px 0px #2D2D2D",
                scale: 1.05,
              }}
              whileTap={{ scale: 0.95 }}
              onClick={triggerConfetti}
            >
              {t("cta")}
            </motion.a>
          </MagneticButton>
          <ConfettiBurst trigger={confetti} count={40} originX={50} originY={90} />

          {/* Character avatar placeholder */}
          <motion.div
            className="mt-8 relative"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-[4px] border-[#2D2D2D] bg-gradient-to-br from-[#FFD1DC] to-[#AEC6CF] flex items-center justify-center shadow-[6px_6px_0px_rgba(45,45,45,0.2)] mx-auto overflow-hidden relative">
              <span className="text-6xl md:text-7xl">👧</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent"
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />
            </div>
            <motion.div
              className="absolute -bottom-2 -right-2 bg-white border-[3px] border-[#2D2D2D] rounded-xl px-3 py-1 shadow-[3px_3px_0px_rgba(45,45,45,0.1)]"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1.5, type: "spring" }}
            >
              <span className="font-[family-name:var(--font-bangers)] text-[#D4AF37] text-sm">
                {t("deco.boom")}
              </span>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="text-sm text-[#2D2D2D]/60 font-medium">{t("scroll")}</span>
        <ChevronDown className="text-[#2D2D2D]/60" size={20} />
      </motion.div>

      {/* Speed lines decoration */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-10">
        <svg className="w-full h-full" viewBox="0 0 1440 900">
          {heroSpeedLines.map((line, index) => (
            <line
              key={index}
              x1={line.x1}
              y1="0"
              x2={line.x2}
              y2="900"
              stroke="#2D2D2D"
              strokeWidth="1"
              opacity="0.3"
            />
          ))}
        </svg>
      </div>
    </section>
  );
}

function FloatingElement({
  x,
  y,
  delay,
  emoji,
  size,
}: {
  x: string;
  y: string;
  delay: number;
  emoji: string;
  size: "sm" | "md" | "lg";
}) {
  const sizeClass = size === "sm" ? "text-2xl" : size === "md" ? "text-4xl" : "text-5xl";

  return (
    <motion.div
      className={`absolute ${sizeClass}`}
      style={{ left: x, top: y }}
      animate={{
        y: [0, -20, 0],
        rotate: [0, 10, -10, 0],
        scale: [1, 1.1, 1],
      }}
      transition={{
        duration: 4 + delay,
        repeat: Infinity,
        delay,
        ease: "easeInOut",
      }}
    >
      {emoji}
    </motion.div>
  );
}

function Lightstick({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 60 180" className="w-full h-full">
      <rect x="25" y="120" width="10" height="60" rx="2" fill="#2D2D2D" />
      <circle cx="30" cy="110" r="20" fill={color} opacity="0.8" />
      <circle cx="30" cy="110" r="12" fill="white" opacity="0.5" />
      <rect x="22" y="80" width="16" height="40" rx="3" fill={color} opacity="0.6" />
      <circle cx="30" cy="30" r="25" fill={color} opacity="0.9" filter="url(#glow)" />
      <circle cx="30" cy="30" r="15" fill="white" opacity="0.7" />
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
    </svg>
  );
}
