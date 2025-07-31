"use client"
import { colors } from "@/lib/colors";

export default function FeaturedPoem() {
  return (
    <section className="mt-20 px-4 max-w-3xl mx-auto">
      {/* Heading */}
      <h2
        className="text-center text-3xl font-normal mb-4"
        style={{ color: colors.darkMaroon }}
      >
        Featured Poem
      </h2>

      {/* Long thin faded horizontal line */}
      <div className="w-full h-px mb-8 bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>

      {/* Poem box */}
      <div className="bg-[#F9F8F5] p-6 md:p-10 rounded-lg shadow-sm space-y-3 text-center border border-gray-200">
        <h3
          className="text-xl md:text-2xl font-medium mb-1"
          style={{ color: colors.maroon }}
        >
          Tainted Euphoria
        </h3>
        <p
          className="text-xs md:text-sm italic mt-0"
          style={{ color: colors.poetryBrown }}
        >
          From the collection &quot;Haunting Memories&quot;
        </p>

        {/* Increase gap before poem */}
        <div className="mt-4"></div>

        <p className="text-sm md:text-base leading-relaxed text-gray-700">
          I see those dates,<br/>
          All back again,<br/>
          A darkness of those tainted days,<br/>
          A time once nothing less,<br/>
          Than heaven embraced.<br/>
          I unsealed the box,<br/>
          I once taped unclaimed,<br/>
          Euphoria from a death unforeseen,<br/>
          As the memories gathered dust and stains.<br/><br/>

          A gift from the past,<br/>
          A happiness misplaced,<br/>
          Held marks of my gamblings,<br/>
          A result of my greedy traits.<br/>
          For my ways through I killed,<br/>
          The dreams of my own and many,<br/>
          I stood as I held it,<br/>
          A box full of memories.
        </p>

        {/* Bottom horizontal line */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent my-4"></div>

        <p className="text-sm italic" style={{ color: colors.poetryBrown }}>
          – Plaksha
        </p>
      </div>
    </section>
  );
}
