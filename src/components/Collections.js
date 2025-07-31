"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { BookOpen, ArrowRight } from "lucide-react";
import { colors } from "@/lib/colors";

export default function PoetryCollections() {
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    async function fetchCollections() {
      try {
        // 1. Fetch collections
        const colRes = await fetch("/api/admin?type=collections");
        const collectionsData = await colRes.json();

        const finalData = [];

        for (const collection of collectionsData) {
          // 2. Fetch subcollections for this collection
          const subRes = await fetch("/api/admin?type=subcollections");
          const subcollections = (await subRes.json()).filter(
            (sub) => sub.parentCollection === collection._id
          );

          // 3. Count poems across all subcollections
          let totalPoems = 0;
          for (const sub of subcollections) {
            const poemsRes = await fetch("/api/admin?type=poems");
            const poems = (await poemsRes.json()).filter(
              (poem) => poem.parentSubcollection === sub._id
            );
            totalPoems += poems.length;
          }

          finalData.push({
            ...collection,
            poemCount: totalPoems,
          });
        }

        // 4. Randomize and take 3
        const shuffled = [...finalData].sort(() => 0.5 - Math.random());
        setCollections(shuffled.slice(0, 3));
      } catch (err) {
        console.error("Error fetching collections with poem counts:", err);
      }
    }

    fetchCollections();
  }, []);

  if (collections.length === 0) return null;

  return (
    <section className="max-w-6xl mx-auto px-6 py-16 flex flex-col items-center">
      {/* Heading */}
      <h2
        className="text-3xl font-normal text-center mb-2"
        style={{ color: colors.darkMaroon }}
      >
        Poetry Collections
      </h2>

      {/* Description */}
      <p
        className="text-base max-w-3xl text-center mb-6"
        style={{ color: colors.poetryBrown }}
      >
        Explore curated collections of verse, each telling its own story through carefully crafted words and imagery.
      </p>

      {/* Horizontal fade line */}
      <div className="w-full max-w-4xl h-px mb-12 bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>

      {/* Cards grid (exact match to CollectionsGrid.js) */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl"
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

      {/* View all collections button → now links to /collections */}
      <Link
        href="/collections"
        className="mt-12 px-10 py-3 rounded-full font-medium tracking-wide text-xs transition-colors duration-300"
        style={{ backgroundColor: colors.maroon, color: "white" }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "#8a263c";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = colors.maroon;
        }}
      >
        View all collections
      </Link>

      <div className="h-32" />
    </section>
  );
}
