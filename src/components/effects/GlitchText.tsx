"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function GlitchText({
  children,
  className = "",
  as: Component = "span",
}: {
  children: string;
  className?: string;
  as?: "span" | "h1" | "h2" | "h3" | "p" | "div";
}) {
  const [isGlitching, setIsGlitching] = useState(false);
  const [displayText, setDisplayText] = useState(children);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";

  const triggerGlitch = () => {
    if (isGlitching) return;
    setIsGlitching(true);
    let iterations = 0;
    const maxIterations = 10;

    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setDisplayText(
        children
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            if (index < iterations) return children[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      iterations += 1;
      if (iterations > maxIterations) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setDisplayText(children);
        setIsGlitching(false);
      }
    }, 40);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const Tag = Component;

  return (
    <motion.div
      className={`relative inline-block ${className}`}
      onMouseEnter={triggerGlitch}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400 }}
    >
      <Tag className="relative z-10">{displayText}</Tag>
      {isGlitching && (
        <>
          <Tag
            className="absolute inset-0 z-0 text-[#FF6B9D] opacity-70"
            style={{ clipPath: "inset(20% 0 60% 0)", transform: "translateX(2px)" }}
            aria-hidden
          >
            {displayText}
          </Tag>
          <Tag
            className="absolute inset-0 z-0 text-[#AEC6CF] opacity-70"
            style={{ clipPath: "inset(60% 0 20% 0)", transform: "translateX(-2px)" }}
            aria-hidden
          >
            {displayText}
          </Tag>
        </>
      )}
    </motion.div>
  );
}
