import { useState } from "react";
import { arrayMove } from "@dnd-kit/sortable";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { nanoid } from "nanoid";

// register all solid icosn for lookup
library.add(fas);

const uid = () => nanoid();

export const createCardBlock = (
  about = "Title",
  paragraph = "<p>Write something here...</p>",
  iconName = "faLaptopCode",
) => ({
  id: uid(),
  type: "card",
  about,
  paragraph,
  iconName, // stored as string
});

const initialCards = [
  createCardBlock(
    "I Do",
    "Full-stack developer focused on backend systems and real-world applications. Experienced in maintaining and enhancing enterprise ERP systems using Node.js, SQL, and modern frontend tools.",
    "faLaptopCode",
  ),
  createCardBlock(
    "I Contribute",
    "Resolved critical payroll computation issues affecting 10,000+ employees in a live production environment. Optimized SQL queries, reducing report generation time by 40% and improving system performance.",
    "faGear",
  ),
  createCardBlock(
    "I Focus",
    "Building scalable and maintainable systems with a strong emphasis on performance and reliability. Continuously improving problem-solving, system design, and backend architecture through real-world projects.",
    "faBullseye",
  ),
];

export const useAboutBlocks = () => {
  const [cards, setCards] = useState(initialCards);
  const [isEditing, setIsEditing] = useState(false);

  const startEditing = () => setIsEditing(true);
  const stopEditing = () => setIsEditing(false);

  const addCard = () => setCards((prev) => [...prev, createCardBlock()]);

  const deleteCard = (id) => {
    setCards((prev) => prev.filter((c) => c.id !== id));
  };

  const updateCard = (id, field, value) => {
    setCards((prev) =>
      prev.map((c) => (c.id === id ? { ...c, [field]: value } : c)),
    );
  };

  const reorderCards = (activeId, overId) => {
    setCards((prev) => {
      const oldIndex = prev.findIndex((c) => c.id === activeId);
      const newIndex = prev.findIndex((c) => c.id === overId);
      return arrayMove(prev, oldIndex, newIndex);
    });
  };

  return {
    cards,
    isEditing,
    startEditing,
    stopEditing,
    addCard,
    deleteCard,
    updateCard,
    reorderCards,
  };
};

export default useAboutBlocks;
