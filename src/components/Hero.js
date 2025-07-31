"use client";
import { motion } from "framer-motion";
import { colors } from "@/lib/colors";

export default function Hero({ onExplorePoetry, onAboutPlaksha }) {
  return (
    <motion.div
      className="relative flex flex-col items-center text-center justify-center flex-1 px-4 min-h-screen"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.15 } }
      }}
    >
      <motion.h1
        className="text-5xl md:text-7xl font-normal mb-4 tracking-wide"
        style={{ color: colors.antiqueGold }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        Plaksha
      </motion.h1>

      <motion.p
        className="text-base md:text-xl mt-2 font-light tracking-wide"
        style={{ color: colors.poetryBrown }}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
      >
        Poetry &amp; Verse
      </motion.p>

      <motion.div
        className="w-64 h-px my-4 bg-gradient-to-r from-transparent via-white to-transparent"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      />

      <motion.p
        className="max-w-xl mt-4 text-sm md:text-base italic"
        style={{ color: colors.darkMaroon }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
      >
        {"Words dance between silence and sound,"}<br />
        {"weaving stories that hearts have found."}
      </motion.p>

      {/* Buttons */}
      <motion.div
        className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <button
          className="px-8 py-4 rounded-full font-medium tracking-wide text-xs transition-colors duration-300"
          style={{ backgroundColor: colors.maroon, color: "white" }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#8a263c"}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = colors.maroon}
          onClick={onExplorePoetry}
        >
          Explore Poetry
        </button>

        <button
          className="px-8 py-4 rounded-full font-medium tracking-wide text-xs border border-gray-200 transition-all duration-300 bg-white"
          style={{ color: colors.maroon }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.4)";
            e.currentTarget.style.backdropFilter = "blur(5px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "white";
            e.currentTarget.style.backdropFilter = "";
          }}
          onClick={onAboutPlaksha}
        >
          About Plaksha
        </button>
      </motion.div>

      {/* Arrow Scroll */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-gray-500 cursor-pointer"
        animate={{ y: [0, -8, 0] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        onClick={onExplorePoetry}
      >
        ↓
      </motion.div>
    </motion.div>
  );
}
