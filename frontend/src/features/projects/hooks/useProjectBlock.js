import { useState } from "react";
import { arrayMove } from "@dnd-kit/sortable";
import Image1 from "../../../assets/Project1/1.png";
import Image2 from "../../../assets/Project1/2.png";
import Image3 from "../../../assets/Project1/3.png";
import Image4 from "../../../assets/Project1/4.png";
import Image5 from "../../../assets/Project1/5.png";
import { nanoid } from "nanoid";

const uid = () => nanoid();

export const createProjectBlock = (
  name = "Project Name",
  role = "Your Role",
  paragraph = "Describe your project here.",
  technologies = [],
  images = [],
  repository = "#",
) => ({
  id: uid(),
  name,
  role,
  paragraph,
  technologies,
  images,
  repository,
});

const initialProjects = [
  createProjectBlock(
    "E-Commerce Platform",
    "Full Stack Developer",
    "Built a web-based order, inventory, and sales management system using Laravel and MySQL, improving business visibility and operational efficiency.\n Developed a role-based admin dashboard with reporting and data visualization powered by Chart.js. \n Integrated a T-shirt customization feature using Fabric.js, enabling users to design and preview products in real time, with a responsive UI built using Tailwind CSS.",
    ["MySQL", "Laravel", "Tailwind", "ChartJS", "FabricJS", "VanillaJS"],
    [Image1, Image2, Image3, Image4, Image5],
    "https://github.com/Sublime8157/asTee-defended-.git",
  ),
];

export const useProjectBlocks = () => {
  const [projects, setProjects] = useState(initialProjects);
  const [isEditing, setIsEditing] = useState(false);

  const startEditing = () => setIsEditing(true);
  const stopEditing = () => setIsEditing(false);

  const addProject = () =>
    setProjects((prev) => [...prev, createProjectBlock()]);

  const deleteProject = (id) =>
    setProjects((prev) => prev.filter((p) => p.id !== id));

  const updateProject = (id, field, value) =>
    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, [field]: value } : p)),
    );

  // Add image from file picker
  const addImage = (id, file) => {
    const url = URL.createObjectURL(file);
    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, images: [...p.images, url] } : p)),
    );
  };

  // Remove image by index
  const removeImage = (id, imageIndex) =>
    setProjects((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, images: p.images.filter((_, i) => i !== imageIndex) }
          : p,
      ),
    );

  // Tech tag actions
  const addTag = (id) =>
    setProjects((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, technologies: [...p.technologies, "New Tech"] }
          : p,
      ),
    );

  const removeTag = (id, tagIndex) =>
    setProjects((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              technologies: p.technologies.filter((_, i) => i !== tagIndex),
            }
          : p,
      ),
    );

  const updateTag = (id, tagIndex, value) =>
    setProjects((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              technologies: p.technologies.map((tag, i) =>
                i === tagIndex ? value : tag,
              ),
            }
          : p,
      ),
    );

  const reorderProjects = (activeId, overId) => {
    setProjects((prev) => {
      const oldIndex = prev.findIndex((p) => p.id === activeId);
      const newIndex = prev.findIndex((p) => p.id === overId);
      return arrayMove(prev, oldIndex, newIndex);
    });
  };

  return {
    projects,
    isEditing,
    startEditing,
    stopEditing,
    addProject,
    deleteProject,
    updateProject,
    addImage,
    removeImage,
    addTag,
    removeTag,
    updateTag,
    reorderProjects,
  };
};
