"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TrailPoint {
  id: number;
  x: number;
  y: number;
  scale: number;
}

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [trail, setTrail] = useState<TrailPoint[]>([]);
  const trailIdRef = useRef(0);

  const addTrailPoint = useCallback((x: number, y: number) => {
    const id = trailIdRef.current++;
    setTrail((prev) => {
      const newTrail = [...prev, { id, x, y, scale: 1 }];
      if (newTrail.length > 8) return newTrail.slice(newTrail.length - 8);
      return newTrail;
    });

    setTimeout(() => {
      setTrail((prev) => prev.filter((p) => p.id !== id));
    }, 400);
  }, []);

  useEffect(() => {
    let lastTrailTime = 0;

    const moveCursor = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const now = Date.now();
      if (now - lastTrailTime > 30) {
        addTrailPoint(e.clientX, e.clientY);
        lastTrailTime = now;
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.closest("[data-cursor='heart']")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [isVisible, addTrailPoint]);

  // Hide on touch devices
  if (typeof window !== "undefined" && "ontouchstart" in window) return null;

  return (
    <>
      {/* Trail */}
      <AnimatePresence>
        {trail.map((point, index) => (
          <motion.div
            key={point.id}
            className="fixed top-0 left-0 pointer-events-none z-[9998]"
            initial={{ opacity: 0.6, scale: 1 }}
            animate={{ opacity: 0, scale: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            style={{
              x: point.x - 6,
              y: point.y - 6,
            }}
          >
            <div
              className="w-3 h-3 rounded-full"
              style={{
                backgroundColor: isHovering ? "#FF6B9D" : "#FFD1DC",
                opacity: (index + 1) / trail.length * 0.5,
              }}
            />
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Main cursor */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            className="fixed top-0 left-0 pointer-events-none z-[9999]"
            animate={{
              x: position.x - (isHovering ? 20 : 12),
              y: position.y - (isHovering ? 20 : 12),
            }}
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 28,
              mass: 0.5,
            }}
          >
            <motion.div
              animate={{
                scale: isHovering ? 1.5 : 1,
                rotate: isHovering ? 15 : 0,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="flex items-center justify-center"
            >
              {isHovering ? (
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                  className="drop-shadow-lg"
                >
                  <path
                    d="M20 35C20 35 5 25 5 15C5 10 8 6 13 6C16 6 18.5 8 20 10C21.5 8 24 6 27 6C32 6 35 10 35 15C35 25 20 35 20 35Z"
                    fill="#FF6B9D"
                    stroke="#2D2D2D"
                    strokeWidth="2"
                  />
                </svg>
              ) : (
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="drop-shadow-md"
                >
                  <path
                    d="M12 2C10.5 2 9.2 2.8 8.5 4C7.8 2.8 6.5 2 5 2C2.5 2 1 4 1 6C1 10.5 7 15 12 20C17 15 23 10.5 23 6C23 4 21.5 2 19 2C17.5 2 16.2 2.8 15.5 4C14.8 2.8 13.5 2 12 2Z"
                    fill="#FFD1DC"
                    stroke="#2D2D2D"
                    strokeWidth="1.5"
                  />
                  <circle cx="8" cy="9" r="1.5" fill="#2D2D2D" />
                  <circle cx="16" cy="9" r="1.5" fill="#2D2D2D" />
                  <path
                    d="M10 11.5C10 11.5 11 13 12 13C13 13 14 11.5 14 11.5"
                    stroke="#2D2D2D"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
