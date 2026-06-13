"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { useTranslations } from "next-intl";
import ElenitaCharacter3D from "@/components/guide/ElenitaCharacter3D";

type SectionId =
  | "hero"
  | "chapter1"
  | "chapter2"
  | "chapter3"
  | "chapter4"
  | "chapter5"
  | "chapter6"
  | "chapter7"
  | "chapter8";

const SECTION_IDS: SectionId[] = [
  "hero",
  "chapter1",
  "chapter2",
  "chapter3",
  "chapter4",
  "chapter5",
  "chapter6",
  "chapter7",
  "chapter8",
];

const SECTION_HTML_IDS: Record<SectionId, string> = {
  hero: "hero",
  chapter1: "chapter1",
  chapter2: "cats",
  chapter3: "roblox",
  chapter4: "kpop",
  chapter5: "funny",
  chapter6: "subscribe",
  chapter7: "blog",
  chapter8: "merch",
};

const GUIDE_MESSAGES: Record<SectionId, string[]> = {
  hero: ["guide.hero.0", "guide.hero.1"],
  chapter1: ["guide.chapter1.0", "guide.chapter1.1"],
  chapter2: ["guide.chapter2.0"],
  chapter3: ["guide.chapter3.0", "guide.chapter3.1"],
  chapter4: ["guide.chapter4.0", "guide.chapter4.1"],
  chapter5: ["guide.chapter5.0"],
  chapter6: ["guide.chapter6.0"],
  chapter7: ["guide.chapter7.0", "guide.chapter7.1"],
  chapter8: ["guide.chapter8.0"],
};

export default function GuideAvatar() {
  const t = useTranslations();
  const [currentSection, setCurrentSection] = useState<SectionId>("hero");
  const [animation, setAnimation] = useState<"idle" | "wave" | "point" | "bounce">("idle");
  const [messageIndex, setMessageIndex] = useState(0);
  const [showBubble, setShowBubble] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const bubbleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cycleAnimation = useCallback(() => {
    setAnimation((prev) => {
      const cycle: Array<"idle" | "wave" | "point" | "bounce"> = ["idle", "wave", "point", "bounce"];
      const idx = cycle.indexOf(prev);
      return cycle[(idx + 1) % cycle.length];
    });
    setShowBubble(true);
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => setIsVisible(true), 3500);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    SECTION_IDS.forEach((sectionId) => {
      const elementId = SECTION_HTML_IDS[sectionId];
      const element = document.getElementById(elementId);
      if (!element) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setCurrentSection(sectionId);
            setMessageIndex(0);
            setShowBubble(true);
          }
        },
        { threshold: 0.3 }
      );

      observer.observe(element);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  useEffect(() => {
    if (!showBubble) return;

    bubbleTimerRef.current = setTimeout(() => {
      setShowBubble(false);
    }, 6000);

    return () => {
      if (bubbleTimerRef.current) clearTimeout(bubbleTimerRef.current);
    };
  }, [showBubble, currentSection, messageIndex]);

  const handleAvatarClick = () => {
    cycleAnimation();
    const messages = GUIDE_MESSAGES[currentSection];
    if (messages) {
      setMessageIndex((prev) => (prev + 1) % messages.length);
    }
    setShowBubble(true);
  };

  const currentMessages = GUIDE_MESSAGES[currentSection] || ["guide.hero.0"];
  const currentText = t(currentMessages[messageIndex % currentMessages.length]);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-8 right-8 z-40 pointer-events-none">
      <div className="relative pointer-events-auto">
        {/* Speech Bubble */}
        <AnimatePresence>
          {showBubble && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="absolute -top-20 right-0 bg-white border-[3px] border-[#2D2D2D] rounded-2xl rounded-br-sm px-5 py-3 shadow-[4px_4px_0px_rgba(45,45,45,0.15)] max-w-[220px]"
            >
              <p className="text-sm font-bold text-[#2D2D2D] leading-tight">
                {currentText}
              </p>
              <div className="absolute -bottom-2 right-4 w-4 h-4 bg-white border-r-[3px] border-b-[3px] border-[#2D2D2D] rotate-45" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Avatar container */}
        <motion.button
          onClick={handleAvatarClick}
          className="w-[140px] h-[200px] rounded-2xl border-[3px] border-[#2D2D2D] bg-gradient-to-b from-[#E8F4F8] to-[#FFD1DC] shadow-[6px_6px_0px_rgba(45,45,45,0.15)] overflow-hidden cursor-pointer hover:shadow-[8px_8px_0px_rgba(45,45,45,0.2)] transition-shadow"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          animate={{
            y: [0, -6, 0],
          }}
          transition={{
            y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
          }}
        >
          <Canvas
            orthographic
            camera={{
              position: [0, 0.5, 3],
              zoom: 45,
              near: 0.1,
              far: 1000,
            }}
            style={{ background: "transparent" }}
          >
            <ambientLight intensity={1.2} />
            <directionalLight position={[5, 10, 5]} intensity={1.5} />
            <pointLight position={[-5, 5, 5]} intensity={0.8} color="#FFD1DC" />
            <ElenitaCharacter3D
              animation={animation}
              scale={0.9}
              position={[0, -0.8, 0]}
            />
          </Canvas>

          {/* Click hint */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-xs text-[#2D2D2D]/40 font-bold">
            ✨ kliknij ✨
          </div>
        </motion.button>
      </div>
    </div>
  );
}
