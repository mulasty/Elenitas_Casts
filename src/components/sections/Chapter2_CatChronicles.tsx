"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl";
import ParticleField, { GlowOrb } from "@/components/effects/ParticleField";
import { useYouTubeFeed } from "@/hooks/useYouTubeFeed";

export default function Chapter2_CatChronicles() {
  const t = useTranslations("chapter2");
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { data: ytData } = useYouTubeFeed();

  const latestVideos = ytData?.latestVideos?.slice(0, 6) || [];

  return (
    <section
      id="cats"
      ref={ref}
      className="relative min-h-screen py-24 px-4 overflow-hidden"
    >
      <ParticleField count={15} colors={["#FFD1DC", "#FFCC99", "#FF6B9D"]} className="opacity-40" />
      <GlowOrb color="#FFD1DC" size={400} className="top-[10%] left-[-10%]" />

      {/* Background deco */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-[10%] left-[2%] text-8xl opacity-10 font-[family-name:var(--font-bangers)] text-[#FFD1DC]"
          animate={{ rotate: [0, 10, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
        >
          NYAN!
        </motion.div>
        <motion.div
          className="absolute bottom-[15%] right-[5%] text-7xl opacity-10 font-[family-name:var(--font-bangers)] text-[#AEC6CF]"
          animate={{ rotate: [0, -10, 0] }}
          transition={{ duration: 5, repeat: Infinity }}
        >
          MEOW!
        </motion.div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.span
            className="inline-block px-4 py-1 bg-[#FFD1DC] border-[3px] border-[#2D2D2D] rounded-full text-sm font-bold text-[#2D2D2D] mb-4 shadow-[3px_3px_0px_rgba(45,45,45,0.1)]"
            whileHover={{ scale: 1.05 }}
          >
            {t("label")}
          </motion.span>
          <motion.h2
            className="font-[family-name:var(--font-fredoka)] text-4xl md:text-6xl text-[#2D2D2D] manga-title mb-4"
            whileHover={{ scale: 1.02 }}
          >
            {t("title")}
          </motion.h2>
          <p className="text-lg text-[#2D2D2D]/70 max-w-2xl mx-auto">
            {t("description")}
          </p>
        </motion.div>

        {/* Video Grid - Live from YouTube */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {latestVideos.map((video, i) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 40, rotate: i % 2 === 0 ? -2 : 2 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
            >
              <VideoCard videoId={video.id} title={video.title} index={i + 1} />
            </motion.div>
          ))}
        </div>


      </div>
    </section>
  );
}

function VideoCard({
  videoId,
  title,
  index,
}: {
  videoId: string;
  title: string;
  index: number;
}) {
  return (
    <motion.div
      className="manga-panel group overflow-hidden"
      whileHover={{ y: -6, rotate: 0 }}
      transition={{ type: "spring" }}
    >
      <div className="absolute top-2 left-2 z-10 bg-[#2D2D2D] text-white font-[family-name:var(--font-bangers)] text-sm px-2 py-0.5 rounded-md shadow-sm">
        #{index}
      </div>

      <div className="relative aspect-video bg-[#2D2D2D]/5 overflow-hidden">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&autoplay=1&mute=1&loop=1&playlist=${videoId}`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
          className="w-full h-full"
        />
      </div>

      <div className="p-3 bg-white border-t-[3px] border-[#2D2D2D]">
        <p className="font-[family-name:var(--font-nunito)] text-sm font-bold text-[#2D2D2D] line-clamp-2">
          {title}
        </p>
      </div>

      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
    </motion.div>
  );
}
