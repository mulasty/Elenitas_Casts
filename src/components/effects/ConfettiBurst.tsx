"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ConfettiPiece {
  id: number;
  x: number;
  y: number;
  rotation: number;
  color: string;
  size: number;
  shape: "square" | "circle" | "triangle";
}

const colors = ["#FFD1DC", "#AEC6CF", "#C3B1E1", "#77DD77", "#FFCC99", "#D4AF37", "#FF6B9D"];

export default function ConfettiBurst({
  trigger,
  originX = 50,
  originY = 50,
  count = 30,
}: {
  trigger: boolean;
  originX?: number;
  originY?: number;
  count?: number;
}) {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);

  useEffect(() => {
    if (!trigger) {
      setPieces([]);
      return;
    }

    const newPieces: ConfettiPiece[] = Array.from({ length: count }, (_, i) => ({
      id: Date.now() + i,
      x: originX,
      y: originY,
      rotation: Math.random() * 360,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: 6 + Math.random() * 8,
      shape: (["square", "circle", "triangle"] as const)[Math.floor(Math.random() * 3)],
    }));

    setPieces(newPieces);

    const timer = setTimeout(() => setPieces([]), 2000);
    return () => clearTimeout(timer);
  }, [trigger, originX, originY, count]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <AnimatePresence>
        {pieces.map((piece) => (
          <motion.div
            key={piece.id}
            initial={{
              left: `${piece.x}%`,
              top: `${piece.y}%`,
              rotate: piece.rotation,
              scale: 0,
              opacity: 1,
            }}
            animate={{
              left: `${piece.x + (Math.random() - 0.5) * 60}%`,
              top: `${piece.y + (Math.random() - 0.5) * 60}%`,
              rotate: piece.rotation + 720,
              scale: 1,
              opacity: 0,
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 1.2,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className="absolute"
            style={{
              width: piece.size,
              height: piece.size,
              backgroundColor: piece.shape !== "triangle" ? piece.color : "transparent",
              borderRadius: piece.shape === "circle" ? "50%" : piece.shape === "square" ? "2px" : "0",
              borderLeft: piece.shape === "triangle" ? `${piece.size / 2}px solid transparent` : undefined,
              borderRight: piece.shape === "triangle" ? `${piece.size / 2}px solid transparent` : undefined,
              borderBottom: piece.shape === "triangle" ? `${piece.size}px solid ${piece.color}` : undefined,
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
