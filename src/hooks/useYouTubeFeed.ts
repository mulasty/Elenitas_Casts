"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface Video {
  id: string;
  title: string;
  thumbnail: string;
  publishedAt: string;
}

interface YouTubeData {
  stats: { subscriberCount: number; viewCount: number; videoCount: number };
  latestVideos: Video[];
}

export function useYouTubeFeed() {
  const [data, setData] = useState<YouTubeData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/youtube")
      .then((res) => res.json())
      .then((data: YouTubeData) => {
        if (!cancelled) {
          setData(data);
          setLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return { data, loading };
}

export function formatViewCount(count: number): string {
  if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
  if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
  return count.toLocaleString();
}

export function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  const now = new Date();
  const diff = now.getTime() - d.getTime();
  const days = Math.floor(diff / 86400000);
  if (days === 0) return "Dzisiaj";
  if (days === 1) return "Wczoraj";
  if (days < 7) return `${days} dni temu`;
  if (days < 30) return `${Math.floor(days / 7)} tyg. temu`;
  return d.toLocaleDateString("pl-PL", { month: "short", day: "numeric" });
}
