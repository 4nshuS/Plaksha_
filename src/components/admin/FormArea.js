"use client";

import { useState, useEffect } from "react";

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

  return (
    <div className="flex-1 p-4">
      <h2 className="font-semibold mb-4">
        {selectedItem ? "Edit" : "New"} {activeType.slice(0, -1)}
      </h2>

      {activeType === "collections" && (
        <>
          <input name="title" value={form.title || ""} onChange={handleChange} placeholder="Title" className="border mb-2 p-2 w-full" />
          <input name="desc" value={form.desc || ""} onChange={handleChange} placeholder="Description" className="border mb-2 p-2 w-full" />
          <input name="slug" value={form.slug || ""} onChange={handleChange} placeholder="Slug" className="border mb-2 p-2 w-full" />
        </>
      )}

      {activeType === "subcollections" && (
        <>
          <input name="title" value={form.title || ""} onChange={handleChange} placeholder="Title" className="border mb-2 p-2 w-full" />
          <input name="desc" value={form.desc || ""} onChange={handleChange} placeholder="Description" className="border mb-2 p-2 w-full" />
          <select name="parentCollection" value={form.parentCollection || ""} onChange={handleChange} className="border mb-2 p-2 w-full">
            <option value="">Select Parent Collection</option>
            {safeCollections.map((col) => (
              <option key={col._id} value={col._id}>
                {col.title || "Untitled"}
              </option>
            ))}
          </select>
        </>
      )}

      {activeType === "poems" && (
        <>
          <input name="title" value={form.title || ""} onChange={handleChange} placeholder="Title" className="border mb-2 p-2 w-full" />
          <textarea name="poem" value={form.poem || ""} onChange={handleChange} placeholder="Poem" className="border mb-2 p-2 w-full h-40" />
          <select name="parentSubcollection" value={form.parentSubcollection || ""} onChange={handleChange} className="border mb-2 p-2 w-full">
            <option value="">Select Parent Subcollection</option>
            {safeSubcollections.map((sub) => (
              <option key={sub._id} value={sub._id}>
                {sub.title || "Untitled"}
              </option>
            ))}
          </select>
        </>
      )}

      <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded mt-2">
        {selectedItem ? "Update" : "Publish"}
      </button>

      {selectedItem && (
        <div className="relative mt-2 inline-block">
          <button onClick={() => setShowDeleteConfirm(!showDeleteConfirm)} className="ml-2 text-gray-600 px-2">⋯</button>
          {showDeleteConfirm && (
            <div className="absolute right-0 mt-2 bg-white border rounded shadow p-2 z-10">
              <p className="mb-2 text-sm">Delete this {activeType.slice(0, -1)}?</p>
              <button onClick={handleDelete} className="bg-red-500 text-white px-2 py-1 rounded text-sm">Confirm Delete</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
