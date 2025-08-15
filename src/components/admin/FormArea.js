"use client";

import { useState, useEffect } from "react";
import { colors } from "@/lib/colors";

function Dropdown({ name, value, options, placeholder, onChange, className }) {
  const [open, setOpen] = useState(false);
  const selectedLabel =
    options.find((opt) => opt.value === value)?.label || placeholder;

  return (
    <div className="relative mb-4">
      <div
        className={`${className} cursor-pointer flex justify-between items-center`}
        onClick={() => setOpen(!open)}
      >
        <span className={value ? "text-black" : "text-gray-400"}>
          {selectedLabel}
        </span>
        <span className="ml-2">▾</span>
      </div>
      {open && (
        <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg animate-dropdown">
          {options.length === 0 ? (
            <div className="px-4 py-2 text-gray-400 text-sm">No options</div>
          ) : (
            options.map((opt) => (
              <div
                key={opt.value}
                onClick={() => {
                  onChange({ target: { name, value: opt.value } });
                  setOpen(false);
                }}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
              >
                {opt.label}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default function FormArea({
  activeType,
  selectedItem,
  refresh,
  allCollections = [],
  allSubcollections = [],
}) {
  const [form, setForm] = useState({});
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const safeCollections = Array.isArray(allCollections) ? allCollections : [];
  const safeSubcollections = Array.isArray(allSubcollections) ? allSubcollections : [];

  useEffect(() => {
    setForm(selectedItem || {});
    setShowDeleteConfirm(false);
  }, [selectedItem]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const method = selectedItem ? "PUT" : "POST";
    await fetch("/api/admin", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, type: activeType }),
    });
    refresh();
    setForm({});
  };

  const handleDelete = async () => {
    if (!selectedItem?._id) return;
    await fetch(`/api/admin?id=${selectedItem._id}&type=${activeType}`, {
      method: "DELETE",
    });
    refresh();
    setForm({});
    setShowDeleteConfirm(false);
  };

  const inputBase =
    "rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 transition text-sm sm:text-base";

  return (
    <div className="flex-1 w-full p-4 sm:p-8">
      <h2
        className="text-lg font-semibold mb-6"
        style={{ color: colors.maroon }}
      >
        {selectedItem ? "Edit" : "New"} {activeType.slice(0, -1)}
      </h2>

      {activeType === "collections" && (
        <>
          <input
            name="title"
            value={form.title || ""}
            onChange={handleChange}
            placeholder="Title"
            className={`${inputBase} mb-4 bg-white border border-gray-200 focus:ring-[${colors.antiqueGold}]`}
          />
          <textarea
            name="desc"
            value={form.desc || ""}
            onChange={handleChange}
            placeholder="Description"
            className={`${inputBase} mb-4 h-28 bg-white border border-gray-200 focus:ring-[${colors.antiqueGold}]`}
          />
          <input
            name="slug"
            value={form.slug || ""}
            onChange={handleChange}
            placeholder="Slug"
            className={`${inputBase} mb-4 bg-white border border-gray-200 focus:ring-[${colors.antiqueGold}]`}
          />
        </>
      )}

      {activeType === "subcollections" && (
        <>
          <input
            name="title"
            value={form.title || ""}
            onChange={handleChange}
            placeholder="Title"
            className={`${inputBase} mb-4 bg-white border border-gray-200 focus:ring-[${colors.antiqueGold}]`}
          />
          <textarea
            name="desc"
            value={form.desc || ""}
            onChange={handleChange}
            placeholder="Description"
            className={`${inputBase} mb-4 h-28 bg-white border border-gray-200 focus:ring-[${colors.antiqueGold}]`}
          />
          <Dropdown
            name="parentCollection"
            value={form.parentCollection || ""}
            onChange={handleChange}
            placeholder="Select Parent Collection"
            className={`${inputBase} bg-white border border-gray-200 focus:ring-[${colors.antiqueGold}]`}
            options={safeCollections.map((col) => ({
              value: col._id,
              label: col.title || "Untitled",
            }))}
          />
        </>
      )}

      {activeType === "poems" && (
        <>
          <input
            name="title"
            value={form.title || ""}
            onChange={handleChange}
            placeholder="Title"
            className={`${inputBase} mb-4 bg-white border border-gray-200 focus:ring-[${colors.antiqueGold}]`}
          />
          <textarea
            name="poem"
            value={form.poem || ""}
            onChange={handleChange}
            placeholder="Poem"
            className={`${inputBase} mb-4 h-40 bg-white border border-gray-200 focus:ring-[${colors.antiqueGold}]`}
          />
          <Dropdown
            name="parentSubcollection"
            value={form.parentSubcollection || ""}
            onChange={handleChange}
            placeholder="Select Parent Subcollection"
            className={`${inputBase} bg-white border border-gray-200 focus:ring-[${colors.antiqueGold}]`}
            options={safeSubcollections.map((sub) => ({
              value: sub._id,
              label: sub.title || "Untitled",
            }))}
          />
        </>
      )}

      <div className="flex flex-wrap gap-3 mt-4">
        <button
          onClick={handleSubmit}
          className="px-6 py-2 rounded-md text-white transition"
          style={{ backgroundColor: colors.maroon }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = colors.darkMaroon;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = colors.maroon;
          }}
        >
          {selectedItem ? "Update" : "Publish"}
        </button>

        {selectedItem && (
          <div className="relative">
            <button
              onClick={() => setShowDeleteConfirm(!showDeleteConfirm)}
              className="text-poetryBrown px-2"
            >
              ⋯
            </button>
            {showDeleteConfirm && (
              <div
                className="absolute right-0 mt-2 w-48 rounded-lg shadow-lg p-3 z-10 bg-white border border-gray-100 animate-dropdown"
              >
                <p className="mb-3 text-sm" style={{ color: colors.poetryBrown }}>
                  Delete this {activeType.slice(0, -1)}?
                </p>
                <button
                  onClick={handleDelete}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm w-full transition-transform duration-200 hover:scale-[1.02]"
                >
                  Confirm Delete
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes dropdownFadeSlide {
          0% {
            opacity: 0;
            transform: translateY(-8px) scale(0.98);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .animate-dropdown {
          animation: dropdownFadeSlide 0.25s ease-out;
        }
      `}</style>
    </div>
  );
}
