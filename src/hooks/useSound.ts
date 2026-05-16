"use client";

import { useCallback, useRef } from "react";

export function useSound() {
  const audioContextRef = useRef<AudioContext | null>(null);
  const hasInteracted = useRef(false);

  const ensureContext = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContext();
    }
    if (audioContextRef.current.state === "suspended") {
      audioContextRef.current.resume();
    }
    hasInteracted.current = true;
    return audioContextRef.current;
  }, []);

  const playPop = useCallback(() => {
    if (!hasInteracted.current) return;
    try {
      const ctx = ensureContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.05);
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.1);
    } catch {
      // Ignore audio errors
    }
  }, [ensureContext]);

  const playPageFlip = useCallback(() => {
    if (!hasInteracted.current) return;
    try {
      const ctx = ensureContext();
      const bufferSize = ctx.sampleRate * 0.15;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / bufferSize, 3);
      }
      const source = ctx.createBufferSource();
      source.buffer = buffer;
      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.value = 2000;
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
      source.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      source.start(ctx.currentTime);
    } catch {
      // Ignore audio errors
    }
  }, [ensureContext]);

  const enableAudio = useCallback(() => {
    ensureContext();
  }, [ensureContext]);

  return { playPop, playPageFlip, enableAudio };
}
