"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  color: string;
}

export default function ParticleField({
  count = 30,
  colors = ["#FFD1DC", "#AEC6CF", "#C3B1E1", "#77DD77", "#FFCC99", "#D4AF37"],
  className = "",
}: {
  count?: number;
  colors?: string[];
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let particles: Particle[] = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    const createParticles = () => {
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.offsetWidth,
        y: Math.random() * canvas.offsetHeight,
        size: Math.random() * 4 + 2,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5 - 0.2,
        opacity: Math.random() * 0.5 + 0.2,
        color: colors[Math.floor(Math.random() * colors.length)],
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.opacity += (Math.random() - 0.5) * 0.02;
        p.opacity = Math.max(0.1, Math.min(0.8, p.opacity));

        if (p.x < -10) p.x = canvas.offsetWidth + 10;
        if (p.x > canvas.offsetWidth + 10) p.x = -10;
        if (p.y < -10) p.y = canvas.offsetHeight + 10;
        if (p.y > canvas.offsetHeight + 10) p.y = -10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.fill();

        // Glow effect
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity * 0.2;
        ctx.fill();
      });

      ctx.globalAlpha = 1;
      animationId = requestAnimationFrame(draw);
    };

    resize();
    createParticles();
    draw();

    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, [count, colors]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{ width: "100%", height: "100%" }}
    />
  );
}

export function FloatingBlocks({
  count = 8,
  className = "",
}: {
  count?: number;
  className?: string;
}) {
  const blocks = Array.from({ length: count }, (_, i) => ({
    id: i,
    x: `${10 + (i * 80) % 80}%`,
    y: `${10 + (i * 35) % 70}%`,
    size: 20 + (i % 3) * 12,
    color: ["#77DD77", "#FFD1DC", "#AEC6CF", "#C3B1E1", "#FFCC99", "#D4AF37"][i % 6],
    delay: i * 0.4,
    duration: 4 + (i % 3) * 2,
  }));

  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      {blocks.map((block) => (
        <motion.div
          key={block.id}
          className="absolute"
          style={{
            left: block.x,
            top: block.y,
            width: block.size,
            height: block.size,
          }}
          animate={{
            y: [0, -30, 0],
            rotate: [0, 90, 180, 270, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: block.duration,
            repeat: Infinity,
            delay: block.delay,
            ease: "easeInOut",
          }}
        >
          <div
            className="w-full h-full border-[2px] border-[#2D2D2D] shadow-[2px_2px_0px_rgba(45,45,45,0.2)]"
            style={{ backgroundColor: block.color }}
          />
        </motion.div>
      ))}
    </div>
  );
}

export function SpeedLines({
  className = "",
  active = true,
}: {
  className?: string;
  active?: boolean;
}) {
  if (!active) return null;
  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      {Array.from({ length: 12 }, (_, i) => (
        <motion.div
          key={i}
          className="absolute h-[1px] bg-[#2D2D2D]"
          style={{
            top: `${(i * 8) + 5}%`,
            left: "-100%",
            width: "40%",
            opacity: 0.08,
          }}
          animate={{
            left: ["-40%", "140%"],
          }}
          transition={{
            duration: 1.5 + Math.random(),
            repeat: Infinity,
            delay: i * 0.15,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}

export function GlowOrb({
  color = "#FFD1DC",
  size = 300,
  className = "",
}: {
  color?: string;
  size?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={`absolute pointer-events-none ${className}`}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, ${color}40 0%, transparent 70%)`,
        filter: "blur(40px)",
      }}
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.5, 0.8, 0.5],
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}
