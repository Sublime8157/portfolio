import { useEffect, useState } from "react";

export default function Loading({ show }) {
  const [visible, setVisible] = useState(show);

  useEffect(() => {
    if (show) {
      setVisible(true);
      document.body.style.overflow = "hidden";
    } else {
      const timeout = setTimeout(() => setVisible(false), 400);
      document.body.style.overflow = "auto";
      return () => clearTimeout(timeout);
    }
  }, [show]);

  if (!visible) return null;

  return (
    <div
      className={`
        fixed inset-0 z-50 flex items-center justify-center
        transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
        ${show ? "opacity-100 scale-100 backdrop-blur-md" : "opacity-0 scale-95 backdrop-blur-0"}
      `}
      style={{
        background:
          "radial-gradient(circle at center, #1a1926 0%, #0f0e17 70%)",
      }}
    >
      <div
        className={`
          flex flex-col items-center gap-4 text-center
          transition-all duration-500
          ${show ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}
        `}
      >
        {/* Loader */}
        <div className="relative">
          <div className="loader"></div>
          <div className="absolute inset-0 blur-xl opacity-30 bg-white rounded-full"></div>
        </div>

        {/* Message */}
        <p className="mt-4 text-sm text-gray-300 tracking-wide animate-pulse max-w-xs">
          Fully editable. Click to edit, drag to rearrange.
        </p>
      </div>
    </div>
  );
}
