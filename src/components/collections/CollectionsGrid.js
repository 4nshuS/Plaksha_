"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { BookOpen, ArrowRight } from "lucide-react";
import { colors } from "@/lib/colors";

export default function CollectionsGrid({ collections }) {
  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl"
      // ↑ gap-6 makes spacing between cards slightly tighter
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
    >
      {collections.map(({ _id, title, desc, slug, poemCount }) => (
        <motion.div
          key={_id}
          className="bg-[#F9F8F5] rounded-lg p-6 flex flex-col justify-between"
          style={{ width: "100%", aspectRatio: "1/1", minHeight: "280px" }}
          whileHover={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
        >
          {/* Top: icon, title, and description */}
          <div>
            <BookOpen
              size={28}
              stroke={colors.maroon}
              strokeWidth={1.5}
              className="mb-4"
            />
            <h3 className="text-xl font-semibold mb-2" style={{ color: colors.maroon }}>
              {title}
            </h3>
            <p className="text-sm mb-2" style={{ color: colors.poetryBrown }}>
              {desc}
            </p>
          </div>

          {/* Bottom: poem count on left + button below */}
          <div className="mt-auto flex flex-col gap-2">
            <div className="text-xs italic" style={{ color: colors.poetryBrown }}>
              {poemCount} {poemCount === 1 ? "poem" : "poems"}
            </div>

            <Link
              href={`/collections/${slug}`}
              className="w-full border border-gray-300 font-medium text-sm py-3 flex items-center justify-center gap-1 rounded-md transition-colors duration-300"
              style={{
                backgroundColor: "white",
                color: "black",
                textDecoration: "none",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = colors.maroon;
                e.currentTarget.style.color = "white";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "white";
                e.currentTarget.style.color = "black";
              }}
            >
              Explore Collection
              <ArrowRight
                size={14}
                stroke="currentColor"
                strokeWidth={2}
                className="transition-colors duration-300"
              />
            </Link>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
