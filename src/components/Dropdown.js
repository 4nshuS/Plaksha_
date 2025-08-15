"use client";

import { useState, useRef, useEffect } from "react";
import { colors } from "@/lib/colors";

export default function Dropdown({ name, value, onChange, options, placeholder }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const handleSelect = (optionValue) => {
    onChange({ target: { name, value: optionValue } });
    setOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full mb-4" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full px-4 py-2 rounded-md bg-white border border-gray-200 text-left text-sm sm:text-base focus:outline-none focus:ring-2 transition"
        style={{ borderColor: colors.antiqueGold }}
      >
        {value
          ? options.find((opt) => opt.value === value)?.label
          : placeholder || "Select an option"}
      </button>

      {open && (
        <ul className="dropdown-menu absolute mt-2 w-full z-20">
          {options.map((opt) => (
            <li
              key={opt.value}
              onClick={() => handleSelect(opt.value)}
              className={opt.value === value ? "bg-[rgba(191,164,111,0.15)]" : ""}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
