"use client";

import { motion } from "framer-motion";
import { Music } from "lucide-react";

export default function SpotifyEmbed() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.9 }}
      className="grid md:grid-cols-2 gap-6 mt-12"
    >
      <div className="manga-panel bg-white p-5 overflow-hidden">
        <div className="flex items-center gap-2 mb-3">
          <Music size={18} className="text-[#FF6B9D]" />
          <h3 className="font-[family-name:var(--font-fredoka)] text-lg text-[#2D2D2D]">
            ILLIT — Magnetic
          </h3>
        </div>
        <div className="relative aspect-video rounded-xl overflow-hidden border-[3px] border-[#2D2D2D] shadow-[4px_4px_0px_rgba(45,45,45,0.1)]">
          <iframe
            src="https://open.spotify.com/embed/track/1aKvZDoLGkNMxoRYgkckZG?utm_source=generator"
            width="100%"
            height="100%"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            className="w-full h-full"
            title="ILLIT - Magnetic on Spotify"
          />
        </div>
      </div>

      <div className="manga-panel bg-white p-5 overflow-hidden">
        <div className="flex items-center gap-2 mb-3">
          <Music size={18} className="text-[#FF6B9D]" />
          <h3 className="font-[family-name:var(--font-fredoka)] text-lg text-[#2D2D2D]">
            BLACKPINK — How You Like That
          </h3>
        </div>
        <div className="relative aspect-video rounded-xl overflow-hidden border-[3px] border-[#2D2D2D] shadow-[4px_4px_0px_rgba(45,45,45,0.1)]">
          <iframe
            src="https://open.spotify.com/embed/track/4SFknyjLcyTLJFPKD2m96o?utm_source=generator"
            width="100%"
            height="100%"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            className="w-full h-full"
            title="BLACKPINK - How You Like That on Spotify"
          />
        </div>
      </div>
    </motion.div>
  );
}
