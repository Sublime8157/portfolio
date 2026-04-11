import { useState } from "react";
import { arrayMove } from "@dnd-kit/sortable";
import ExpLogo1 from "../../../assets/Exp1.png";
import ExpLogo2 from "../../../assets/Exp2.png";

const uid = () => crypto.randomUUID();

export const createExperienceBlock = (
  name = "Company Name",
  role = "Role",
  tenure = "Start - End",
  paragraph = "Write your experience here.",
  stacks = [],
  logo = null,
) => ({
  id: uid(),
  name,
  role,
  tenure,
  paragraph,
  stacks,
  logo,
});

const initialExperiences = [
  createExperienceBlock(
    "Jeonsoft Corporation",
    "Software Developer",
    "July 2024 - January 2026",
    `Maintained and enhanced a production payroll system used by enterprise clients, resolving critical payroll computation issues affecting over 10,000 employees. \n
    Developed and customized payroll features using Node.js, Ruby on Rails, SQL, WebixJS, and Tailwind CSS, improving system usability and overall functionality. \n
    Optimized SQL queries, reducing payroll report generation time by 40%, and collaborated with senior developers to deploy fixes and enhancements to live production environments.`,
    ["SQL", "Ruby on Rails", "NodeJS", "WebixJS", "TailwindCSS"],
    ExpLogo1,
  ),
  createExperienceBlock(
    "Optogrow",
    "Intern",
    "October 2023 - February 2024",
    `Automated key workflows and processes for the company website using Go High Level, improving marketing automation, lead capture, and customer engagement. \n \n Collaborated with the development team to design and build the front-end of the company website, ensuring a responsive and user-friendly interface. \n \n Participated in meetings with international clients to gather project specifications and requirements, helping translate business needs into technical implementation for the website.`,
    ["Go High Level", "Airtable", "Zapier"],
    ExpLogo2,
  ),
];

export const useExperienceBlocks = () => {
  const [experiences, setExperiences] = useState(initialExperiences);
  const [isEditing, setIsEditing] = useState(false);

  const startEditing = () => setIsEditing(true);
  const stopEditing = () => setIsEditing(false);

  const addExperience = () =>
    setExperiences((prev) => [...prev, createExperienceBlock()]);

  const deleteExperience = (id) =>
    setExperiences((prev) => prev.filter((e) => e.id !== id));

  const updateExperience = (id, field, value) =>
    setExperiences((prev) =>
      prev.map((e) => (e.id === id ? { ...e, [field]: value } : e)),
    );

  // Logo replacement — same pattern as Hero profile image
  const updateLogo = (id, file) => {
    const url = URL.createObjectURL(file);
    updateExperience(id, "logo", url);
  };

  // Stack tag actions — same pattern as Technologies
  const addTag = (id) =>
    setExperiences((prev) =>
      prev.map((e) =>
        e.id === id ? { ...e, stacks: [...e.stacks, "New Tech"] } : e,
      ),
    );

  const removeTag = (id, tagIndex) =>
    setExperiences((prev) =>
      prev.map((e) =>
        e.id === id
          ? { ...e, stacks: e.stacks.filter((_, i) => i !== tagIndex) }
          : e,
      ),
    );

  const updateTag = (id, tagIndex, value) =>
    setExperiences((prev) =>
      prev.map((e) =>
        e.id === id
          ? {
              ...e,
              stacks: e.stacks.map((tag, i) => (i === tagIndex ? value : tag)),
            }
          : e,
      ),
    );

  const reorderExperiences = (activeId, overId) => {
    setExperiences((prev) => {
      const oldIndex = prev.findIndex((e) => e.id === activeId);
      const newIndex = prev.findIndex((e) => e.id === overId);
      return arrayMove(prev, oldIndex, newIndex);
    });
  };

  return {
    experiences,
    isEditing,
    startEditing,
    stopEditing,
    addExperience,
    deleteExperience,
    updateExperience,
    updateLogo,
    addTag,
    removeTag,
    updateTag,
    reorderExperiences,
  };
};
