"use client";
import { BookOpen, Pen, Heart } from "lucide-react";
import { colors } from "@/lib/colors";

export default function AboutPlaksha() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-16 flex flex-col md:flex-row gap-12">
      {/* Left side */}
      <div className="flex-1 flex flex-col justify-center space-y-8">
        <h2 className="text-3xl font-normal" style={{ color: colors.darkMaroon }}>
          About Plaksha
        </h2>

        {/* Horizontal break */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>

        <p className="text-base leading-relaxed" style={{ color: colors.maroon }}>
          Plaksha is a contemporary poet whose work explores the delicate intersections of human emotion, nature, and the quiet moments that define our existence. Her poetry captures the ephemeral beauty of everyday life through a lens of wonder and introspection.
        </p>

        <p className="text-base leading-relaxed" style={{ color: colors.maroon }}>
          Drawing inspiration from dawn&apos;s first light to the whispered secrets of midnight hours, her verses weave together themes of love, loss, hope, and the eternal dance between shadow and illumination.
        </p>

        {/* Icons row: centered and closer spaced */}
        <div className="flex justify-center gap-25 mt-6">
          {/* Book Icon */}
          <div className="flex flex-col items-center space-y-1">
            <BookOpen size={40} stroke={colors.antiqueGold} strokeWidth={1.5} />
            <span className="text-xl font-serif font-semibold" style={{ color: colors.maroon }}>
              3
            </span>
            <span className="text-xs italic" style={{ color: colors.poetryBrown }}>
              Collections
            </span>
          </div>

          {/* Pen Icon */}
          <div className="flex flex-col items-center space-y-1">
            <Pen size={40} stroke={colors.antiqueGold} strokeWidth={1.5} />
            <span className="text-xl font-serif font-semibold" style={{ color: colors.maroon }}>
              50+
            </span>
            <span className="text-xs italic" style={{ color: colors.poetryBrown }}>
              Poems
            </span>
          </div>

          {/* Heart Icon */}
          <div className="flex flex-col items-center space-y-1">
            <Heart size={40} stroke={colors.antiqueGold} strokeWidth={1.5} />
            <span className="text-xl font-serif font-semibold" style={{ color: colors.maroon }}>
              1K+
            </span>
            <span className="text-xs italic" style={{ color: colors.poetryBrown }}>
              Readers
            </span>
          </div>
        </div>
      </div>

      {/* Right side: vertically centered card */}
      <div className="flex-1 flex items-center">
        <div className="bg-[#F9F8F5] rounded-lg p-6 md:p-8 flex flex-col justify-center text-center space-y-6 shadow-sm max-h-max w-full border border-gray-200 border-opacity-30">
          <p className="text-lg leading-relaxed" style={{ color: colors.maroon }}>
            Poetry is the language of the soul, speaking truths that prose cannot capture. In every line, I seek to honor the beauty that surrounds us and the emotions that connect us all.
          </p>

          {/* horizontal break */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>

          <p className="italic text-sm" style={{ color: colors.poetryBrown }}>
            &ndash; Plaksha
          </p>
        </div>
      </div>
    </section>
  );
}
