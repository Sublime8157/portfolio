const presets = [
  // Neutrals
  { hex: "#FFFFFF", label: "White" },
  { hex: "#FAFAFA", label: "Off White" },
  { hex: "#F8FAFC", label: "Snow" },
  { hex: "#F1F5F9", label: "Slate 50" },
  { hex: "#E2E8F0", label: "Slate 200" },
  { hex: "#0F172A", label: "Slate 900" },
  { hex: "#111827", label: "Gray 900" },
  { hex: "#1F2937", label: "Gray 800" },
  { hex: "#374151", label: "Gray 700" },
  { hex: "#0B0F19", label: "Midnight" },
  // Blues
  { hex: "#EFF6FF", label: "Blue 50" },
  { hex: "#DBEAFE", label: "Blue 100" },
  { hex: "#BFDBFE", label: "Blue 200" },
  // Greens
  { hex: "#ECFDF5", label: "Green 50" },
  { hex: "#D1FAE5", label: "Green 100" },
  { hex: "#A7F3D0", label: "Green 200" },
  // Yellows
  { hex: "#FEFCE8", label: "Yellow 50" },
  { hex: "#FEF9C3", label: "Yellow 100" },
  { hex: "#FDE68A", label: "Yellow 200" },
  // Reds
  { hex: "#FEF2F2", label: "Red 50" },
  { hex: "#FEE2E2", label: "Red 100" },
  { hex: "#FCA5A5", label: "Red 300" },
  // Pinks / Sky
  { hex: "#FDF2F8", label: "Pink 50" },
  { hex: "#F0F9FF", label: "Sky 50" },
];

const SectionColorPicker = ({ currentColor, onColorChange }) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row flex-wrap gap-1.5">
        {presets.map(({ hex, label }) => (
          <button
            key={hex}
            title={label}
            onClick={() => onColorChange(hex)}
            className="w-5 h-5 rounded-sm border cursor-pointer 
                       transition-transform hover:scale-110"
            style={{
              backgroundColor: hex,
              // Highlight the currently selected swatch
              borderColor: currentColor === hex ? "#ff8906" : "#55555580",
              transform: currentColor === hex ? "scale(1.2)" : "scale(1)",
            }}
          />
        ))}

        {/* Reset to transparent */}
        <button
          title="Reset"
          onClick={() => onColorChange("transparent")}
          className="w-5 h-5 rounded-sm border border-dashed cursor-pointer
                     hover:scale-110 transition-transform flex items-center 
                     justify-center text-text-paragraph"
          style={{
            borderColor:
              currentColor === "transparent" ? "#ff8906" : "#55555580",
          }}
        >
          <span className="text-xs leading-none">✕</span>
        </button>
      </div>
    </div>
  );
};

export default SectionColorPicker;
