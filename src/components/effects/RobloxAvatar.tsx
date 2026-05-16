"use client";

import { motion } from "framer-motion";

export default function RobloxAvatar({
  className = "",
  animate = true,
  size = 80,
}: {
  className?: string;
  animate?: boolean;
  size?: number;
}) {
  const blockColors = {
    head: "#FFCC99",
    torso: "#FF6B9D",
    leftArm: "#FFD1DC",
    rightArm: "#FFD1DC",
    leftLeg: "#2D2D2D",
    rightLeg: "#2D2D2D",
    face: "#2D2D2D",
  };

  const scale = size / 80;
  const wrapperProps = animate
    ? {
        animate: { y: [0, -8, 0], rotate: [0, 1, -1, 0] },
        transition: { duration: 3, repeat: Infinity, ease: "easeInOut" as const },
      }
    : {};

  return (
    <motion.div
      className={`relative ${className}`}
      {...wrapperProps}
      style={{ width: size, height: size * 2 }}
    >
      {/* Head */}
      <div
        className="absolute border-[2px] border-[#2D2D2D]"
        style={{ backgroundColor: blockColors.head, top: 0, left: 20 * scale, width: 40 * scale, height: 40 * scale }}
      >
        {/* Eyes */}
        <div className="absolute bg-[#2D2D2D]" style={{ top: 12 * scale, left: 8 * scale, width: 6 * scale, height: 6 * scale }} />
        <div className="absolute bg-[#2D2D2D]" style={{ top: 12 * scale, right: 8 * scale, width: 6 * scale, height: 6 * scale }} />
        {/* Mouth */}
        <div className="absolute bg-[#2D2D2D]" style={{ bottom: 8 * scale, left: 14 * scale, width: 12 * scale, height: 3 * scale }} />
      </div>

      {/* Torso */}
      <div
        className="absolute border-[2px] border-[#2D2D2D]"
        style={{ backgroundColor: blockColors.torso, top: 40 * scale, left: 15 * scale, width: 50 * scale, height: 55 * scale }}
      >
        {/* Logo on shirt */}
        <div className="absolute bg-white/30 border border-white/50" style={{ top: 15 * scale, left: 15 * scale, width: 20 * scale, height: 20 * scale }} />
      </div>

      {/* Left Arm */}
      <div
        className="absolute border-[2px] border-[#2D2D2D]"
        style={{ backgroundColor: blockColors.leftArm, top: 42 * scale, left: 3 * scale, width: 12 * scale, height: 45 * scale }}
      />

      {/* Right Arm */}
      <div
        className="absolute border-[2px] border-[#2D2D2D]"
        style={{ backgroundColor: blockColors.rightArm, top: 42 * scale, right: 3 * scale, width: 12 * scale, height: 45 * scale }}
      />

      {/* Left Leg */}
      <div
        className="absolute border-[2px] border-[#2D2D2D]"
        style={{ backgroundColor: blockColors.leftLeg, top: 93 * scale, left: 18 * scale, width: 18 * scale, height: 55 * scale }}
      />

      {/* Right Leg */}
      <div
        className="absolute border-[2px] border-[#2D2D2D]"
        style={{ backgroundColor: blockColors.rightLeg, top: 93 * scale, right: 18 * scale, width: 18 * scale, height: 55 * scale }}
      />

      {/* Shadow */}
      <div className="absolute bg-black/10 rounded-full" style={{ bottom: -6 * scale, left: 10 * scale, width: 60 * scale, height: 8 * scale }} />
    </motion.div>
  );
}

export function RobloxBlock({
  color,
  size = 40,
  className = "",
  children,
}: {
  color: string;
  size?: number;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div
      className={`relative border-[3px] border-[#2D2D2D] shadow-[4px_4px_0px_rgba(45,45,45,0.2)] flex items-center justify-center ${className}`}
      style={{
        backgroundColor: color,
        width: size,
        height: size,
      }}
    >
      {children}
    </div>
  );
}

export function RobloxStud({
  color,
  className = "",
}: {
  color: string;
  className?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      <div
        className="w-full h-full border-[2px] border-[#2D2D2D]"
        style={{ backgroundColor: color }}
      />
      {/* Stud on top */}
      <div
        className="absolute -top-[6px] left-1/2 -translate-x-1/2 w-[60%] h-[6px] border-[2px] border-[#2D2D2D] border-b-0 rounded-t-sm"
        style={{ backgroundColor: color }}
      />
    </div>
  );
}
