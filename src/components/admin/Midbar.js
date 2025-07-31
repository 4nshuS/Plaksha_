export default function Midbar({ items = [], activeType, setSelectedItem }) {
  const safeItems = Array.isArray(items) ? items : [];

  return (
    <div className="w-1/4 border-r">
      <h2 className="p-4 font-semibold capitalize">{activeType}</h2>
      <ul>
        {safeItems.map((item) => (
          <li
            key={item._id}
            onClick={() => setSelectedItem(item)}
            className="p-2 cursor-pointer hover:bg-gray-100"
          >
            {item.title || "Untitled"}
          </li>
        ))}
      </ul>
    </div>
  );
}
