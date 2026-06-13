"use client";

import { useRef, useState, Suspense, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Box } from "@react-three/drei";
import { FloatingBlocks, GlowOrb, SpeedLines } from "@/components/effects/ParticleField";
import GlitchText from "@/components/effects/GlitchText";
import MagneticButton from "@/components/effects/MagneticButton";
import ConfettiBurst from "@/components/effects/ConfettiBurst";
import RobloxAvatar, { RobloxBlock, RobloxStud } from "@/components/effects/RobloxAvatar";
import { Star, Users, Trophy, MessageSquare, ShoppingCart, Zap, Gamepad2 } from "lucide-react";
import type { RobloxGame } from "@/lib/roblox";
import { formatVisits } from "@/lib/roblox";
import { useYouTubeFeed } from "@/hooks/useYouTubeFeed";

const GAME_ICONS = ["🎮", "🦄", "🍎", "🏗️", "🏠", "🐱", "⚔️", "🔮", "🌟", "🎯"];
const GAME_COLORS = ["#FFB7B2", "#FFDAC1", "#E2F0CB", "#B5EAD7", "#C7CEEA", "#F8B195", "#D4AF37", "#C3B1E1", "#FF6B9D", "#77DD77"];
const GAME_TAGS = ["Popular", "Action", "Obby", "RP", "Social", "PVP", "Adventure", "Horror", "Tycoon", "Simulator"];

const fallbackGames = [
  { name: "Adopt Me!", icon: "🦄", color: "#FFB7B2", players: "83.5M", rating: 4.8, tag: "Popular" },
  { name: "Blox Fruits", icon: "🍎", color: "#FFDAC1", players: "42.2M", rating: 4.6, tag: "Action" },
  { name: "Tower of Hell", icon: "🏗️", color: "#E2F0CB", players: "21.8M", rating: 4.3, tag: "Obby" },
  { name: "Brookhaven", icon: "🏠", color: "#B5EAD7", players: "38.1M", rating: 4.5, tag: "RP" },
  { name: "MeepCity", icon: "🐱", color: "#C7CEEA", players: "15.4M", rating: 4.2, tag: "Social" },
  { name: "BedWars", icon: "⚔️", color: "#F8B195", players: "28.7M", rating: 4.4, tag: "PVP" },
];

const badges = [
  { name: "Beta Tester", icon: "🧪", color: "#77DD77" },
  { name: "100 Days", icon: "📅", color: "#FFD1DC" },
  { name: "Pro Builder", icon: "🔨", color: "#AEC6CF" },
  { name: "Veteran", icon: "⭐", color: "#D4AF37" },
  { name: "Event Winner", icon: "🏆", color: "#FF6B9D" },
  { name: "Collector", icon: "💎", color: "#C3B1E1" },
];

const friends = [
  { name: "ElenitaMain", status: "online", game: "Adopt Me!" },
  { name: "CatLover99", status: "online", game: "Blox Fruits" },
  { name: "KpopStan_7", status: "playing", game: "Tower of Hell" },
  { name: "NyanKitty", status: "offline", game: "" },
  { name: "RobloxPro", status: "online", game: "Brookhaven" },
];

const inventory = [
  { name: "Rainbow Cat", type: "pet", rarity: "legendary", emoji: "🌈" },
  { name: "Golden Apple", type: "item", rarity: "mythic", emoji: "🍎" },
  { name: "Diamond Sword", type: "tool", rarity: "rare", emoji: "⚔️" },
  { name: "Crown", type: "accessory", rarity: "legendary", emoji: "👑" },
  { name: "Wings", type: "accessory", rarity: "epic", emoji: "🦋" },
  { name: "Magic Wand", type: "tool", rarity: "rare", emoji: "🪄" },
];

export default function Chapter3_Roblox() {
  const t = useTranslations("chapter3");
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeTab, setActiveTab] = useState<"games" | "badges" | "friends" | "inventory">("games");
  const [confettiTrigger, setConfettiTrigger] = useState(false);
  const [friendsCount, setFriendsCount] = useState(142);
  const [realGames, setRealGames] = useState(fallbackGames);
  const [isLive, setIsLive] = useState(false);
  const { data: ytData } = useYouTubeFeed();

  const robloxVideos = ytData?.latestVideos?.slice(0, 2) || [
    { id: "t8RPLVC3wag", title: "Roblox moment" },
    { id: "C6T0YlZbWTU", title: "Roblox fun" },
  ];

  useEffect(() => {
    fetch("/api/roblox")
      .then((res) => res.json())
      .then((data) => {
        if (data.friendsCount) {
          setFriendsCount(data.friendsCount);
          setIsLive(true);
        }
        if (data.favoriteGames?.length > 0) {
          const games = (data.favoriteGames as RobloxGame[]).slice(0, 6).map((g, i) => ({
            name: g.name || fallbackGames[i].name,
            icon: GAME_ICONS[i % GAME_ICONS.length],
            color: GAME_COLORS[i % GAME_COLORS.length],
            players: formatVisits(g.placeVisits),
            rating: 4 + Math.random() * 1,
            tag: GAME_TAGS[i % GAME_TAGS.length],
          }));
          setRealGames(games);
        }
      })
      .catch(() => {});
  }, []);

  const triggerConfetti = () => {
    setConfettiTrigger(true);
    setTimeout(() => setConfettiTrigger(false), 100);
  };

  return (
    <section
      id="roblox"
      ref={ref}
      className="relative min-h-screen py-24 px-4 overflow-hidden"
    >
      <SpeedLines active={isInView} />
      <FloatingBlocks count={10} />
      <GlowOrb color="#AEC6CF" size={400} className="top-[10%] right-[-10%]" />
      <GlowOrb color="#77DD77" size={300} className="bottom-[20%] left-[-5%]" />

      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#AEC6CF]/20 via-transparent to-[#77DD77]/10 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.span
            className="inline-block px-4 py-1 bg-[#AEC6CF] border-[3px] border-[#2D2D2D] rounded-full text-sm font-bold text-white mb-4 shadow-[3px_3px_0px_rgba(45,45,45,0.1)]"
            whileHover={{ scale: 1.05, rotate: [0, -2, 2, 0] }}
            transition={{ duration: 0.3 }}
          >
            {t("label")}
          </motion.span>
          <GlitchText as="h2" className="font-[family-name:var(--font-fredoka)] text-4xl md:text-6xl text-[#2D2D2D] manga-title mb-4">
            {t("title")}
          </GlitchText>
          <p className="text-lg text-[#2D2D2D]/70 max-w-2xl mx-auto">
            {t("description")}
          </p>
        </motion.div>

        {/* Roblox Profile Header */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative bg-white border-[4px] border-[#2D2D2D] rounded-3xl p-6 md:p-8 mb-12 shadow-[8px_8px_0px_rgba(45,45,45,0.15)] overflow-hidden"
        >
          <ConfettiBurst trigger={confettiTrigger} count={40} />

          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
            {/* Avatar */}
            <motion.div
              className="relative"
              whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-gradient-to-br from-[#AEC6CF] to-[#77DD77] p-4 rounded-2xl border-[3px] border-[#2D2D2D] shadow-[4px_4px_0px_rgba(45,45,45,0.15)]">
                <RobloxAvatar size={120} />
              </div>
              <motion.div
                className="absolute -top-2 -right-2 bg-[#77DD77] text-white text-xs font-bold px-2 py-1 rounded-full border-[2px] border-[#2D2D2D]"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Online
              </motion.div>
            </motion.div>

            {/* Profile Info */}
            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-col md:flex-row items-center gap-3 mb-3">
                <h3 className="font-[family-name:var(--font-fredoka)] text-3xl text-[#2D2D2D]">
                  Elenita_Gaming
                </h3>
                <span className="px-3 py-1 bg-[#D4AF37] text-white text-xs font-bold rounded-full border-[2px] border-[#2D2D2D]">
                  Premium
                </span>
              </div>
              <p className="text-[#2D2D2D]/60 mb-4">
                Kotki, Roblox i K-Pop! 🎮🐱🎵
              </p>

              {/* Stats Row */}
              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                <StatBadge icon={<Users size={16} />} label="Friends" value={String(friendsCount)} color="#AEC6CF" />
                <StatBadge icon={<Trophy size={16} />} label="Badges" value="24" color="#D4AF37" />
                <StatBadge icon={<Zap size={16} />} label="Level" value="87" color="#77DD77" />
                <StatBadge icon={<Star size={16} />} label="Favorites" value="56" color="#FF6B9D" />
              </div>
            </div>

            {/* Robux Display */}
            <motion.div
              className="bg-gradient-to-br from-[#FFD1DC] to-[#FFCC99] p-4 rounded-2xl border-[3px] border-[#2D2D2D] shadow-[4px_4px_0px_rgba(45,45,45,0.15)] text-center min-w-[140px]"
              whileHover={{ scale: 1.05, rotate: 2 }}
              transition={{ type: "spring" }}
            >
              <div className="flex items-center justify-center gap-2 mb-1">
                <RobloxBlock color="#77DD77" size={20}>
                  <span className="text-xs">R</span>
                </RobloxBlock>
                <span className="font-[family-name:var(--font-bangers)] text-2xl text-[#2D2D2D]">
                  12,847
                </span>
              </div>
              <p className="text-xs text-[#2D2D2D]/60 font-bold">Robux</p>
            </motion.div>
          </div>
        </motion.div>

        {/* 3D Isometric Room */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative w-full h-[400px] md:h-[500px] mb-12 rounded-3xl overflow-hidden border-[4px] border-[#2D2D2D] shadow-[8px_8px_0px_rgba(45,45,45,0.15)] bg-[#E8F4F8]"
        >
          <Suspense
            fallback={
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-2xl animate-bounce">🎮</div>
              </div>
            }
          >
            <Canvas
              orthographic
              camera={{
                position: [10, 10, 10],
                zoom: 40,
                near: 0.1,
                far: 1000,
              }}
              style={{ background: "#E8F4F8" }}
            >
              <ambientLight intensity={0.8} />
              <directionalLight position={[10, 20, 10]} intensity={1} castShadow />
              <pointLight position={[-10, 10, -10]} intensity={0.5} color="#FFD1DC" />
              <RobloxRoom />
              <OrbitControls
                enableZoom={false}
                enablePan={false}
                autoRotate
                autoRotateSpeed={1}
                minPolarAngle={Math.PI / 4}
                maxPolarAngle={Math.PI / 2.5}
              />
            </Canvas>
          </Suspense>

          {/* Overlay label */}
          <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur border-[3px] border-[#2D2D2D] rounded-xl px-4 py-2 shadow-[4px_4px_0px_rgba(45,45,45,0.1)]">
            <span className="font-[family-name:var(--font-fredoka)] text-sm text-[#2D2D2D]">
              🎮 Elenita&apos;s Room — Drag to rotate!
            </span>
          </div>
        </motion.div>

        {/* Tabs Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap justify-center gap-2 mb-8"
        >
          {(["games", "badges", "friends", "inventory"] as const).map((tab) => (
            <MagneticButton key={tab} strength={0.2}>
              <motion.button
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2 rounded-xl border-[3px] border-[#2D2D2D] font-[family-name:var(--font-fredoka)] text-sm font-bold transition-all ${
                  activeTab === tab
                    ? "bg-[#77DD77] text-white shadow-[4px_4px_0px_#2D2D2D]"
                    : "bg-white text-[#2D2D2D] shadow-[3px_3px_0px_rgba(45,45,45,0.1)] hover:shadow-[4px_4px_0px_#2D2D2D]"
                }`}
                whileTap={{ scale: 0.95 }}
                whileHover={{ y: -2 }}
              >
                {tab === "games" && <Gamepad2 size={16} className="inline mr-1" />}
                {tab === "badges" && <Trophy size={16} className="inline mr-1" />}
                {tab === "friends" && <Users size={16} className="inline mr-1" />}
                {tab === "inventory" && <ShoppingCart size={16} className="inline mr-1" />}
                {t(`tabs.${tab}`)}
              </motion.button>
            </MagneticButton>
          ))}
        </motion.div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === "games" && (
            <motion.div
              key="games"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {realGames.map((game, i) => (
                  <motion.div
                    key={game.name}
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.1 * i }}
                    whileHover={{ y: -8, rotate: 1 }}
                    className="manga-panel bg-white p-5 cursor-pointer group"
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className="w-16 h-16 rounded-xl border-[3px] border-[#2D2D2D] flex items-center justify-center text-3xl shadow-[3px_3px_0px_rgba(45,45,45,0.15)] shrink-0"
                        style={{ backgroundColor: game.color }}
                      >
                        {game.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-[family-name:var(--font-fredoka)] text-lg text-[#2D2D2D]">
                            {game.name}
                          </h3>
                          <span className="px-2 py-0.5 bg-[#2D2D2D] text-white text-[10px] font-bold rounded">
                            {game.tag}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-[#2D2D2D]/60">
                          <span className="flex items-center gap-1">
                            <Users size={12} /> {game.players}
                          </span>
                          <span className="flex items-center gap-1">
                            <Star size={12} className="text-[#D4AF37]" /> {game.rating}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === "badges" && (
            <motion.div
              key="badges"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-3 md:grid-cols-6 gap-4 mb-12"
            >
              {badges.map((badge, i) => (
                <motion.div
                  key={badge.name}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1, type: "spring" }}
                  whileHover={{ scale: 1.15, rotate: [0, -5, 5, 0] }}
                  className="flex flex-col items-center gap-2"
                >
                  <div
                    className="w-16 h-16 md:w-20 md:h-20 rounded-2xl border-[3px] border-[#2D2D2D] flex items-center justify-center text-3xl shadow-[4px_4px_0px_rgba(45,45,45,0.15)]"
                    style={{ backgroundColor: badge.color }}
                  >
                    {badge.icon}
                  </div>
                  <span className="text-xs font-bold text-[#2D2D2D] text-center">{badge.name}</span>
                </motion.div>
              ))}
            </motion.div>
          )}

          {activeTab === "friends" && (
            <motion.div
              key="friends"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-white border-[4px] border-[#2D2D2D] rounded-2xl p-6 shadow-[6px_6px_0px_rgba(45,45,45,0.15)] mb-12 max-w-2xl mx-auto"
            >
              <h3 className="font-[family-name:var(--font-fredoka)] text-xl text-[#2D2D2D] mb-4 flex items-center gap-2">
                <Users size={20} /> Friends List
              </h3>
              <div className="space-y-3">
                {friends.map((friend, i) => (
                  <motion.div
                    key={friend.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-3 p-3 bg-[#F5F5F5] rounded-xl border-2 border-[#2D2D2D]/10 hover:border-[#2D2D2D]/30 transition-colors"
                  >
                    <div className="relative">
                      <div className="w-10 h-10 bg-gradient-to-br from-[#AEC6CF] to-[#C3B1E1] rounded-lg border-[2px] border-[#2D2D2D] flex items-center justify-center text-lg">
                        👤
                      </div>
                      <div
                        className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-[2px] border-white ${
                          friend.status === "online"
                            ? "bg-[#77DD77]"
                            : friend.status === "playing"
                            ? "bg-[#D4AF37]"
                            : "bg-[#2D2D2D]/30"
                        }`}
                      />
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-sm text-[#2D2D2D]">{friend.name}</p>
                      {friend.game && (
                        <p className="text-xs text-[#2D2D2D]/60">Playing: {friend.game}</p>
                      )}
                    </div>
                    <span
                      className={`text-xs font-bold px-2 py-1 rounded-full ${
                        friend.status === "online"
                          ? "bg-[#77DD77]/20 text-[#77DD77]"
                          : friend.status === "playing"
                          ? "bg-[#D4AF37]/20 text-[#D4AF37]"
                          : "bg-[#2D2D2D]/10 text-[#2D2D2D]/40"
                      }`}
                    >
                      {friend.status}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === "inventory" && (
            <motion.div
              key="inventory"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12"
            >
              {inventory.map((item, i) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.08, type: "spring" }}
                  whileHover={{ y: -6, scale: 1.05 }}
                  className="manga-panel p-4 flex flex-col items-center text-center gap-2 cursor-pointer"
                  style={{
                    backgroundColor:
                      item.rarity === "legendary"
                        ? "#FFD1DC40"
                        : item.rarity === "mythic"
                        ? "#D4AF3740"
                        : item.rarity === "epic"
                        ? "#C3B1E140"
                        : "#AEC6CF40",
                  }}
                >
                  <motion.span
                    className="text-4xl"
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 3, repeat: Infinity, delay: i * 0.2 }}
                  >
                    {item.emoji}
                  </motion.span>
                  <p className="font-bold text-xs text-[#2D2D2D]">{item.name}</p>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                      item.rarity === "legendary"
                        ? "bg-[#FF6B9D] text-white"
                        : item.rarity === "mythic"
                        ? "bg-[#D4AF37] text-white"
                        : item.rarity === "epic"
                        ? "bg-[#C3B1E1] text-white"
                        : "bg-[#AEC6CF] text-white"
                    }`}
                  >
                    {item.rarity}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Chat Bubbles */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="mb-12 max-w-3xl mx-auto"
        >
          <h3 className="font-[family-name:var(--font-fredoka)] text-2xl text-[#2D2D2D] mb-6 text-center flex items-center justify-center gap-2">
            <MessageSquare size={24} /> {t("chatTitle")}
          </h3>
          <div className="space-y-4">
            <ChatBubble
              name="Elenita_Gaming"
              message={t("chat1")}
              color="#AEC6CF"
              avatar="👧"
              delay={0}
            />
            <ChatBubble
              name="CatLover99"
              message={t("chat2")}
              color="#FFD1DC"
              avatar="🐱"
              isRight
              delay={0.3}
            />
            <ChatBubble
              name="Elenita_Gaming"
              message={t("chat3")}
              color="#AEC6CF"
              avatar="👧"
              delay={0.6}
            />
          </div>
        </motion.div>

        {/* Video Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {robloxVideos.map((video, i) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 + i * 0.2 }}
              className="manga-panel overflow-hidden group"
            >
              <div className="relative aspect-video">
                <iframe
                  src={`https://www.youtube.com/embed/${video.id}?rel=0&modestbranding=1`}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                  className="w-full h-full"
                />
              </div>
              <div className="p-4 bg-white border-t-[3px] border-[#2D2D2D]">
                <h3 className="font-[family-name:var(--font-fredoka)] text-lg text-[#2D2D2D]">
                  {video.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center relative"
        >
          <MagneticButton strength={0.4}>
            <motion.a
              href="https://www.youtube.com/@エレニータ"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#77DD77] text-[#2D2D2D] font-[family-name:var(--font-fredoka)] text-lg rounded-2xl border-[3px] border-[#2D2D2D] shadow-[5px_5px_0px_#2D2D2D]"
              whileHover={{
                boxShadow: "8px 8px 0px #2D2D2D",
                scale: 1.05,
              }}
              whileTap={{ scale: 0.95, boxShadow: "2px 2px 0px #2D2D2D" }}
              onMouseEnter={triggerConfetti}
            >
              <span className="text-xl">🎮</span>
              {t("cta")}
            </motion.a>
          </MagneticButton>
          <ConfettiBurst trigger={confettiTrigger} count={50} originX={50} originY={80} />
        </motion.div>
      </div>
    </section>
  );
}

function StatBadge({
  icon,
  label,
  value,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  color: string;
}) {
  return (
    <motion.div
      className="flex items-center gap-2 px-3 py-2 rounded-xl border-[2px] border-[#2D2D2D]/10 bg-white"
      whileHover={{ scale: 1.05, borderColor: color }}
      transition={{ type: "spring" }}
    >
      <div
        className="w-8 h-8 rounded-lg border-[2px] border-[#2D2D2D] flex items-center justify-center text-white"
        style={{ backgroundColor: color }}
      >
        {icon}
      </div>
      <div>
        <p className="text-xs text-[#2D2D2D]/60 font-bold">{label}</p>
        <p className="text-sm font-bold text-[#2D2D2D]">{value}</p>
      </div>
    </motion.div>
  );
}

function ChatBubble({
  name,
  message,
  color,
  avatar,
  isRight = false,
  delay = 0,
}: {
  name: string;
  message: string;
  color: string;
  avatar: string;
  isRight?: boolean;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: isRight ? 50 : -50 }}
      animate={isRight ? { opacity: 1, x: 0 } : { opacity: 1, x: 0 }}
      transition={{ delay, type: "spring" }}
      className={`flex items-start gap-3 ${isRight ? "flex-row-reverse" : ""}`}
    >
      <div className="w-10 h-10 rounded-xl border-[2px] border-[#2D2D2D] flex items-center justify-center text-xl shrink-0 shadow-[2px_2px_0px_rgba(45,45,45,0.1)]"
        style={{ backgroundColor: color }}
      >
        {avatar}
      </div>
      <div className={`max-w-[80%] ${isRight ? "text-right" : ""}`}>
        <p className="text-xs font-bold text-[#2D2D2D]/60 mb-1">{name}</p>
        <div
          className={`inline-block px-4 py-2 rounded-2xl border-[2px] border-[#2D2D2D] shadow-[3px_3px_0px_rgba(45,45,45,0.1)] ${
            isRight ? "rounded-tr-sm" : "rounded-tl-sm"
          }`}
          style={{ backgroundColor: color + "30" }}
        >
          <p className="text-sm text-[#2D2D2D]">{message}</p>
        </div>
      </div>
    </motion.div>
  );
}

function RobloxRoom() {
  return (
    <group>
      {/* Floor */}
      <Box args={[8, 0.2, 8]} position={[0, -0.1, 0]}>
        <meshStandardMaterial color="#F5E6D3" />
      </Box>

      {/* Walls */}
      <Box args={[8, 4, 0.2]} position={[0, 2, -4]}>
        <meshStandardMaterial color="#AEC6CF" />
      </Box>
      <Box args={[0.2, 4, 8]} position={[-4, 2, 0]}>
        <meshStandardMaterial color="#AEC6CF" />
      </Box>

      {/* Back wall accent */}
      <Box args={[6, 2.5, 0.05]} position={[0, 2.2, -3.85]}>
        <meshStandardMaterial color="#FFD1DC" />
      </Box>

      {/* Roblox Poster */}
      <group position={[-1.5, 2.5, -3.75]}>
        <Box args={[1.5, 1.5, 0.05]}>
          <meshStandardMaterial color="#77DD77" />
        </Box>
        <Box args={[0.4, 0.4, 0.1]} position={[0, 0.2, 0.05]}>
          <meshStandardMaterial color="#2D2D2D" />
        </Box>
        <Box args={[0.8, 0.1, 0.1]} position={[0, -0.3, 0.05]}>
          <meshStandardMaterial color="#FFD1DC" />
        </Box>
      </group>

      {/* Bed */}
      <group position={[-2, 0.5, -2]}>
        <Box args={[2, 0.4, 3]}>
          <meshStandardMaterial color="#C3B1E1" />
        </Box>
        <Box args={[2, 0.6, 0.5]} position={[0, 0.5, -1.25]}>
          <meshStandardMaterial color="#FFD1DC" />
        </Box>
        <Box args={[1.8, 0.2, 2.4]} position={[0, 0.5, 0.2]}>
          <meshStandardMaterial color="#FFF5F7" />
        </Box>
      </group>

      {/* Desk */}
      <group position={[2.5, 0.4, -2]}>
        <Box args={[2, 0.1, 1]}>
          <meshStandardMaterial color="#D4AF37" />
        </Box>
        <Box args={[0.1, 0.8, 0.1]} position={[-0.8, -0.4, -0.35]}>
          <meshStandardMaterial color="#D4AF37" />
        </Box>
        <Box args={[0.1, 0.8, 0.1]} position={[0.8, -0.4, -0.35]}>
          <meshStandardMaterial color="#D4AF37" />
        </Box>
        <Box args={[0.1, 0.8, 0.1]} position={[-0.8, -0.4, 0.35]}>
          <meshStandardMaterial color="#D4AF37" />
        </Box>
        <Box args={[0.1, 0.8, 0.1]} position={[0.8, -0.4, 0.35]}>
          <meshStandardMaterial color="#D4AF37" />
        </Box>
        {/* Computer */}
        <Box args={[0.6, 0.4, 0.05]} position={[0, 0.3, -0.2]}>
          <meshStandardMaterial color="#2D2D2D" />
        </Box>
        <Box args={[0.4, 0.25, 0.02]} position={[0, 0.5, -0.15]}>
          <meshStandardMaterial color="#77DD77" emissive="#77DD77" emissiveIntensity={0.5} />
        </Box>
      </group>

      {/* Gaming Chair */}
      <group position={[2, 0.4, 0]}>
        <Box args={[1, 0.1, 1]}>
          <meshStandardMaterial color="#FF6B9D" />
        </Box>
        <Box args={[1, 1.2, 0.1]} position={[0, 0.6, -0.45]}>
          <meshStandardMaterial color="#FF6B9D" />
        </Box>
      </group>

      {/* Cat bed on floor */}
      <group position={[-1, 0.15, 2]}>
        <Box args={[1.2, 0.1, 1]}>
          <meshStandardMaterial color="#FFD1DC" />
        </Box>
        <Box args={[1.2, 0.3, 0.1]} position={[0, 0.2, -0.45]}>
          <meshStandardMaterial color="#FFD1DC" />
        </Box>
        {/* Tiny cat */}
        <Box args={[0.3, 0.3, 0.4]} position={[0, 0.3, 0]}>
          <meshStandardMaterial color="#FFA500" />
        </Box>
      </group>

      {/* Lightstick decoration on desk */}
      <group position={[2.8, 0.6, -1.8]}>
        <Box args={[0.1, 0.8, 0.1]}>
          <meshStandardMaterial color="#D4AF37" />
        </Box>
        <Box args={[0.3, 0.3, 0.3]} position={[0, 0.6, 0]}>
          <meshStandardMaterial color="#FF6B9D" emissive="#FF6B9D" emissiveIntensity={0.8} />
        </Box>
      </group>

      {/* Roblox-style trees */}
      <group position={[-3.2, 0.5, 3.2]}>
        <Box args={[0.4, 1.5, 0.4]} position={[0, 0.75, 0]}>
          <meshStandardMaterial color="#8B4513" />
        </Box>
        <Box args={[1.2, 0.8, 1.2]} position={[0, 1.8, 0]}>
          <meshStandardMaterial color="#77DD77" />
        </Box>
        <Box args={[0.8, 0.6, 0.8]} position={[0, 2.4, 0]}>
          <meshStandardMaterial color="#77DD77" />
        </Box>
      </group>

      {/* Floating blocks (Roblox style) */}
      <mesh position={[0, 3, 0]}>
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshStandardMaterial color="#77DD77" />
      </mesh>

      <Box args={[0.4, 0.4, 0.4]} position={[1, 3.5, 1]}>
        <meshStandardMaterial color="#FFD1DC" />
      </Box>
      <Box args={[0.3, 0.3, 0.3]} position={[-1, 2.8, 1]}>
        <meshStandardMaterial color="#C3B1E1" />
      </Box>
      <Box args={[0.35, 0.35, 0.35]} position={[0.5, 3.8, -0.5]}>
        <meshStandardMaterial color="#FFCC99" />
      </Box>
      <Box args={[0.25, 0.25, 0.25]} position={[-0.8, 3.2, -0.8]}>
        <meshStandardMaterial color="#D4AF37" />
      </Box>

      {/* Roblox coin stack */}
      <group position={[3, 0.1, 2]}>
        <Box args={[0.3, 0.05, 0.3]} position={[0, 0.025, 0]}>
          <meshStandardMaterial color="#D4AF37" emissive="#D4AF37" emissiveIntensity={0.3} />
        </Box>
        <Box args={[0.3, 0.05, 0.3]} position={[0, 0.08, 0]}>
          <meshStandardMaterial color="#D4AF37" emissive="#D4AF37" emissiveIntensity={0.3} />
        </Box>
        <Box args={[0.3, 0.05, 0.3]} position={[0, 0.135, 0]}>
          <meshStandardMaterial color="#D4AF37" emissive="#D4AF37" emissiveIntensity={0.3} />
        </Box>
      </group>
    </group>
  );
}
