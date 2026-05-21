export default function BatikBorder({
  position = "top",
}: {
  position?: "top" | "bottom";
}) {
  return (
    <div
      className={`w-full overflow-hidden ${position === "bottom" ? "rotate-180" : ""}`}
      aria-hidden="true">
      <svg
        viewBox="0 0 800 40"
        preserveAspectRatio="none"
        className="w-full h-10"
        fill="none">
        {/* Garis utama */}
        <line
          x1="0"
          y1="20"
          x2="800"
          y2="20"
          stroke="#d4a40e"
          strokeOpacity="0.4"
          strokeWidth="0.5"
        />

        {/* Motif diamond berulang */}
        {Array.from({ length: 20 }).map((_, i) => {
          const x = i * 40 + 20;
          return (
            <g key={i}>
              <polygon
                points={`${x},12 ${x + 6},20 ${x},28 ${x - 6},20`}
                fill="none"
                stroke="#d4a40e"
                strokeOpacity="0.5"
                strokeWidth="0.8"
              />
              <circle cx={x} cy={20} r="1.5" fill="#d4a40e" fillOpacity="0.6" />
            </g>
          );
        })}

        {/* Garis atas dan bawah tipis */}
        <line
          x1="0"
          y1="8"
          x2="800"
          y2="8"
          stroke="#d4a40e"
          strokeOpacity="0.2"
          strokeWidth="0.5"
          strokeDasharray="4 8"
        />
        <line
          x1="0"
          y1="32"
          x2="800"
          y2="32"
          stroke="#d4a40e"
          strokeOpacity="0.2"
          strokeWidth="0.5"
          strokeDasharray="4 8"
        />
      </svg>
    </div>
  );
}
