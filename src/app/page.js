"use client";

import { useRef } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturedPoem from "@/components/FeaturedPoem";
import AboutPlaksha from "@/components/AboutPlaksha";
import PoetryCollections from "@/components/Collections";
import Footer from "@/components/Footer";

export default function Home() {
  const collectionsRef = useRef(null);
  const aboutRef = useRef(null);

  const scrollToSection = (ref) => {
    if (ref.current) {
      const offset = -80; // ✅ Adjust for navbar height if needed
      const elementPosition = ref.current.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition + offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  return (
    <main className="flex flex-col items-center justify-start bg-white overflow-hidden scroll-smooth">
      {/* Hero with background */}
      <div className="relative w-full min-h-screen flex flex-col items-center justify-center">
        <div className="absolute inset-0">
          <div
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: "url('/background.jpg')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/0 via-white/30 to-white" />
        </div>

        <Navbar />
        <Hero
          onExplorePoetry={() => scrollToSection(collectionsRef)}
          onAboutPlaksha={() => scrollToSection(aboutRef)}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full bg-white px-4">
        <div className="mb-32">
          <FeaturedPoem />
        </div>

        <div ref={aboutRef}>
          <AboutPlaksha />
        </div>

        <div className="mt-32" ref={collectionsRef}>
          <PoetryCollections />
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </main>
  );
}
