"use client";

import { useState } from "react";
import LoadingScreen from "@/components/ui/LoadingScreen";
import Navbar from "@/components/ui/Navbar";
import CustomCursor from "@/components/ui/CustomCursor";
import HeroSection from "@/components/sections/HeroSection";
import Chapter1_MeetElenita from "@/components/sections/Chapter1_MeetElenita";
import Chapter2_CatChronicles from "@/components/sections/Chapter2_CatChronicles";
import Chapter3_Roblox from "@/components/sections/Chapter3_Roblox";
import Chapter4_Kpop from "@/components/sections/Chapter4_Kpop";
import Chapter5_FunnyAnimalz from "@/components/sections/Chapter5_FunnyAnimalz";
import Chapter6_Subscribe from "@/components/sections/Chapter6_Subscribe";
import Chapter7_Blog, { Chapter8_Merch } from "@/components/sections/Chapter7_Blog";
import Footer from "@/components/sections/Footer";

export default function HomePage() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <LoadingScreen onComplete={() => setLoading(false)} />
      {!loading && (
        <>
          <CustomCursor />
          <Navbar />
          <main className="relative">
            <HeroSection />
            <Chapter1_MeetElenita />
            <Chapter2_CatChronicles />
            <Chapter3_Roblox />
            <Chapter4_Kpop />
            <Chapter5_FunnyAnimalz />
            <Chapter6_Subscribe />
            <Chapter7_Blog />
            <Chapter8_Merch />
          </main>
          <Footer />
        </>
      )}
    </>
  );
}
