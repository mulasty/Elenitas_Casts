"use client";

import { useState, useEffect } from "react";
import type { RobloxProfileResponse } from "@/lib/roblox";

export function useRobloxProfile() {
  const [data, setData] = useState<RobloxProfileResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setLoading(true);
        const res = await fetch("/api/roblox");
        if (!res.ok) throw new Error("Failed to fetch profile");
        const json: RobloxProfileResponse = await res.json();
        if (!cancelled) {
          setData(json);
          setError(null);
        }
      } catch (e) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : "Unknown error");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, []);

  return { data, loading, error };
}
