const nav = () => {
  const sections = [
    "About me",
    "Technologies",
    "Experiences",
    "Trainings",
    "Contact",
  ];
  return (
    <nav className="flex items-center justify-between">
      <div>Joven</div>
      <ul className="flex gap-10">
        {sections.map((section, index) => (
          <li className="cursor-pointer hover:text-[#a7a9be]" key={index}>
            {section}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default nav;
