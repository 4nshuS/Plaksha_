"use client";

import { useState } from "react";
import { colors } from "@/lib/colors";
import { motion, AnimatePresence } from "framer-motion";

export default function PoemsGrid({ poems, subcollections }) {
  const [selectedSub, setSelectedSub] = useState("all");   // current filter
  const [activePoem, setActivePoem] = useState(null);      // poem to show in modal
  const [dropdownOpen, setDropdownOpen] = useState(false); // dropdown state

  // Filter poems based on selected subcollection
  const filteredPoems =
    selectedSub === "all"
      ? poems
      : poems.filter((p) => p.parentSubcollection === selectedSub);

  // Dropdown options: "All Poems" + subcollections
  const options = [{ _id: "all", title: "All Poems" }].concat(subcollections);

  // ✅ Adjust max number of lines to show inside each card
  const maxLines = 12;
  const lineHeightEm = 1.5; // change if you want tighter or looser lines

  return (
    <div className="w-full">
      {/* 🔧 Dropdown to filter poems by subcollection */}
      <div className="relative mb-4 inline-block w-64 text-left">
        {/* mb-4 controls space below dropdown and before grid */}
        <div
          className="border border-gray-300 bg-[#F9F8F5] text-sm px-4 py-2 rounded-md shadow-sm cursor-pointer flex justify-between items-center transition-colors duration-300 hover:border-gray-400"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          <span>{options.find((o) => o._id === selectedSub)?.title || "All Poems"}</span>
          <span className="ml-2 text-gray-500">▼</span>
        </div>

        {/* Animate dropdown open/close */}
        <AnimatePresence>
          {dropdownOpen && (
            <motion.ul
              className="absolute z-10 mt-1 w-full bg-[#F9F8F5] border border-gray-300 rounded-md shadow-lg"
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2 }}
            >
              {options.map((option) => (
                <li
                  key={option._id}
                  onClick={() => {
                    setSelectedSub(option._id);
                    setDropdownOpen(false);
                  }}
                  className="px-4 py-2 cursor-pointer hover:bg-gray-100 transition-colors duration-200"
                >
                  {option.title}
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>

      {/* ✨ Poems grid with fade-in animation */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        {filteredPoems.map((poem) => (
          <motion.div
            key={poem._id}
            className="bg-[#F9F8F5] rounded-lg p-6 flex flex-col justify-between cursor-pointer text-center"
            style={{ width: "100%", aspectRatio: "1/1", minHeight: "340px" }}
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            onClick={() => setActivePoem(poem)}
          >
            {/* Poem title */}
            <h3 className="text-xl font-semibold mb-3" style={{ color: colors.maroon }}>
              {poem.title}
            </h3>

            {/* Poem text, limited to N lines (without ellipsis) */}
            <p
              className="text-sm mb-4 overflow-hidden px-2"
              style={{
                color: colors.poetryBrown,
                textAlign: "center",
                whiteSpace: "pre-line",              // preserve line breaks
                lineHeight: `${lineHeightEm}em`,      // adjust line height
                maxHeight: `${lineHeightEm * maxLines}em` // cuts after N lines
              }}
            >
              {poem.poem}
            </p>

            {/* Author footer */}
            <div className="flex flex-col items-center mt-auto">
              <div className="w-full max-w-xs h-px mb-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
              <span className="text-xs italic" style={{ color: colors.poetryBrown }}>
                ~Plaksha
              </span>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* 🪟 Modal shown when a poem is clicked */}
      <AnimatePresence>
        {activePoem && (
          <motion.div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActivePoem(null)}
          >
            <motion.div
              className="bg-[#F9F8F5] rounded-2xl p-6 max-w-xl w-full max-h-[80vh] flex flex-col text-center overflow-hidden"
              style={{ width: "90%", height: "80vh" }}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()} // stop closing modal when clicking inside
            >
              {/* Title sticky at top */}
              <h3 className="text-xl font-semibold mb-4 sticky top-0 bg-[#F9F8F5] py-2" style={{ color: colors.maroon }}>
                {activePoem.title}
              </h3>

              {/* Full poem */}
              <div className="overflow-y-auto flex-1 px-2">
                <p className="text-base whitespace-pre-line" style={{ color: colors.poetryBrown, textAlign: "center" }}>
                  {activePoem.poem}
                </p>
              </div>

              {/* Author sticky at bottom */}
              <div className="sticky bottom-0 bg-[#F9F8F5] flex flex-col items-center pt-2">
                <div className="w-full max-w-xs h-px mb-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
                <span className="text-xs italic mb-1" style={{ color: colors.poetryBrown }}>
                  ~Plaksha
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
