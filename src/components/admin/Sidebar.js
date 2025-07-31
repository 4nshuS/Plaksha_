export default function Sidebar({ activeType, setActiveType }) {
  return (
    <div className="w-1/6 bg-gray-800 text-white p-4">
      <h1 className="text-xl mb-4">Content</h1>
      {["collections", "subcollections", "poems"].map((type) => (
        <div
          key={type}
          onClick={() => setActiveType(type)}
          className={`cursor-pointer mb-2 p-2 rounded ${
            activeType === type ? "bg-gray-600" : ""
          }`}
        >
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </div>
      ))}
    </div>
  );
}
