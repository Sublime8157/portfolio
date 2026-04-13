import { useTheme } from "../context/ThemeContext.jsx"; // ✅ from context now
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="fixed bottom-6 right-6 z-50 
                 w-10 h-10 rounded-full 
                 flex items-center justify-center
                 border border-gray-600 
                 bg-[#0f0e17] dark:bg-white
                 text-white dark:text-[#0f0e17]
                 shadow-lg hover:scale-110 
                 transition-all duration-300 cursor-pointer"
    >
      <FontAwesomeIcon icon={isDark ? faSun : faMoon} />
    </button>
  );
};

export default ThemeToggle;
