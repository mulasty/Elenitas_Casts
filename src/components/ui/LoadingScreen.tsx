"use client";

import { useEffect, useEffectEvent, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";

const SESSION_KEY = "elenitas-cats-loading-complete";
const LOADER_TICK_MS = 120;
const LOADER_TIMEOUT_MS = 3200;

export default function LoadingScreen({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const t = useTranslations("loading");
  const [progress, setProgress] = useState(0);
  const finishedRef = useRef(false);

  const finishLoading = useEffectEvent(() => {
    if (finishedRef.current) {
      return;
    }

    finishedRef.current = true;
    setProgress(100);
    window.sessionStorage.setItem(SESSION_KEY, "true");
    window.setTimeout(onComplete, 250);
  });

  useEffect(() => {
    if (window.sessionStorage.getItem(SESSION_KEY) === "true") {
      finishLoading();
      return;
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 96) {
          clearInterval(interval);
          finishLoading();
          return 100;
        }

        // Deterministic easing avoids the loader getting stuck on repeated refreshes.
        const nextProgress = prev + Math.max(4, (100 - prev) * 0.18);
        return Math.min(nextProgress, 96);
      });
    }, LOADER_TICK_MS);

    const timeout = window.setTimeout(() => {
      clearInterval(interval);
      finishLoading();
    }, LOADER_TIMEOUT_MS);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  const floatingEmojis = ["🐱", "🎮", "🎵", "✨", "🐾", "💗"];

  return (
    <AnimatePresence>
      {progress < 100 && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#FFF5F7] overflow-hidden"
          exit={{ opacity: 0, y: "-100%" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          {/* Floating background emojis */}
          <div className="absolute inset-0 pointer-events-none">
            {floatingEmojis.map((emoji, i) => (
              <motion.div
                key={i}
                className="absolute text-4xl opacity-20"
                style={{
                  left: `${10 + (i * 15) % 80}%`,
                  top: `${10 + (i * 20) % 70}%`,
                }}
                animate={{
                  y: [0, -30, 0],
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 3 + i * 0.5,
                  repeat: Infinity,
                  delay: i * 0.3,
                  ease: "easeInOut",
                }}
              >
                {emoji}
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center relative z-10"
          >
            {/* Spinning loader with orbiting elements */}
            <div className="relative mb-8 w-24 h-24 mx-auto">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="w-full h-full"
              >
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#FFD1DC"
                    strokeWidth="8"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#FF6B9D"
                    strokeWidth="8"
                    strokeDasharray={`${progress * 2.51} 251`}
                    strokeLinecap="round"
                    transform="rotate(-90 50 50)"
                  />
                </svg>
              </motion.div>

              {/* Orbiting dots */}
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="absolute inset-0"
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 2 + i * 0.5,
                    repeat: Infinity,
                    ease: "linear",
                    delay: i * 0.3,
                  }}
                >
                  <div
                    className="absolute w-3 h-3 rounded-full border-2 border-[#2D2D2D]"
                    style={{
                      backgroundColor: ["#FFD1DC", "#AEC6CF", "#C3B1E1"][i],
                      top: "0%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                    }}
                  />
                </motion.div>
              ))}

              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <span className="text-3xl">🐾</span>
              </motion.div>
            </div>

            <motion.h2
              className="font-[family-name:var(--font-fredoka)] text-3xl text-[#2D2D2D] mb-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {t("text")}
            </motion.h2>
            <motion.p
              className="font-[family-name:var(--font-bangers)] text-xl tracking-wider text-[#D4AF37]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {t("sub")}
            </motion.p>

            {/* Progress bar with glow */}
            <div className="mt-6 w-64 h-3 bg-[#FFD1DC] rounded-full overflow-hidden border-2 border-[#2D2D2D] relative">
              <motion.div
                className="h-full bg-gradient-to-r from-[#FF6B9D] via-[#AEC6CF] to-[#C3B1E1]"
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(progress, 100)}%` }}
                transition={{ duration: 0.3 }}
              />
              <motion.div
                className="absolute top-0 right-0 h-full w-2 bg-white/50"
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
              />
            </div>
            <p className="mt-2 text-sm text-[#2D2D2D]/60 font-bold">
              {Math.min(Math.round(progress), 100)}%
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
