import { lenisInstance } from "../../App";
import sections from "../navigation/components/sections.jsx";

const nav = () => {
  const handleClick = (section) => {
    const id = section.toLowerCase().replaceAll(/\ /g, "");

    // lenis is a package that handles the smooth scrolling
    if (lenisInstance) {
      // Proceed to id (section)
      lenisInstance.scrollTo(`#${id}`, {
        duration: 2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    }
  };

  return (
    <nav className="border-b py-6  flex flex-row px-20 text-xs border-gray-800 w-screen items-center justify-between">
      <div>joven.dev</div>
      <ul className="flex gap-10">
        {sections.map((section, index) => (
          <li
            className="cursor-pointer hover:text-[#a7a9be]"
            onClick={() => handleClick(section)}
            key={index}
          >
            {section.toUpperCase()}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default nav;
