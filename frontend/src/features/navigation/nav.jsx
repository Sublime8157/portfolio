import { lenisInstance } from "../../App";

const nav = () => {
  const sections = [
    "About me",
    "Technologies",
    "Experiences",
    "Trainings",
    "Contact",
  ];

  const handleClick = (section) => {
    const id = section.toLowerCase().replaceAll(/\ /g, "");
    
    if (lenisInstance) {
      lenisInstance.scrollTo(`#${id}`, {
        duration: 2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    }
  };

  return (
    <nav className="flex items-center justify-between">
      <div>Joven</div>
      <ul className="flex gap-10">
        {sections.map((section, index) => (
          <li
            className="cursor-pointer hover:text-[#a7a9be]"
            onClick={() => handleClick(section)}
            key={index}
          >
            {section}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default nav;
