import { colors } from "@/lib/colors";

export default function Midbar({ items = [], activeType, setSelectedItem }) {
  const safeItems = Array.isArray(items) ? items : [];

  return (
    <div className="w-full sm:w-1/4 bg-white">
      <h2
        className="p-4 font-semibold capitalize border-b"
        style={{ color: colors.maroon, borderColor: "#e5e5e5" }}
      >
        {activeType}
      </h2>
      <ul>
        {safeItems.map((item) => (
          <li
            key={item._id}
            onClick={() => setSelectedItem(item)}
            className="p-3 cursor-pointer transition-colors duration-200"
            style={{ color: colors.poetryBrown }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = colors.antiqueGold;
              e.currentTarget.style.color = colors.darkMaroon;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "white";
              e.currentTarget.style.color = colors.poetryBrown;
            }}
          >
            {item.title || "Untitled"}
          </li>
        ))}
      </ul>
    </div>
  );
}
