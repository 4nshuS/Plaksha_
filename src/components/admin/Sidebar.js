import { colors } from "@/lib/colors";

export default function Sidebar({ activeType, setActiveType }) {
  return (
    <div
      className="w-full sm:w-1/6 p-5"
      style={{ backgroundColor: colors.maroon, color: "white" }}
    >
      <h1 className="text-lg font-semibold mb-6 tracking-wide">Content</h1>
      {["collections", "subcollections", "poems"].map((type) => (
        <div
          key={type}
          onClick={() => setActiveType(type)}
          className="cursor-pointer mb-3 px-4 py-2 rounded-md transition-colors duration-300"
          style={{
            backgroundColor:
              activeType === type ? colors.antiqueGold : "transparent",
            color: activeType === type ? colors.darkMaroon : "white",
          }}
          onMouseEnter={(e) => {
            if (activeType !== type) {
              e.currentTarget.style.backgroundColor = colors.antiqueGold;
              e.currentTarget.style.color = colors.darkMaroon;
            }
          }}
          onMouseLeave={(e) => {
            if (activeType !== type) {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.color = "white";
            }
          }}
        >
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </div>
      ))}
    </div>
  );
}
