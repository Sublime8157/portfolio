import { useState } from "react";
import { arrayMove } from "@dnd-kit/sortable";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { nanoid } from "nanoid";

library.add(fas);

const uid = () => nanoid();

export const createCardBlock = (
  title = "Type",
  list = [],
  iconName = "faCode",
) => ({
  id: uid(),
  type: "card",
  list,
  title,
  iconName,
});

const initialCards = [
  createCardBlock("Frontend", ["WebixJS", "React", "TailwindCSS"], "faCode"),
  createCardBlock(
    "Backend",
    ["NodeJS", "Ruby on Rails", "SQL Server", "MySQL", "Laravel"],
    "faDatabase",
  ),
  createCardBlock(
    "Tools",
    ["Git", "Sourcetree", "Figma", "Photoshop"],
    "faWrench",
  ),
];

export const useTechnologiesBlock = () => {
  const [cards, setCards] = useState(initialCards);
  const [isEditing, setIsEditing] = useState(false);
  const [bgColor, setBgColor] = useState("transparent");

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

  // actions for list
  const addTag = (id) => {
    setCards((prev) =>
      prev.map((c) => (c.id === id ? { ...c, list: [...c.list, "New"] } : c)),
    );
  };

  const removeTag = (id, tagIndex) => {
    setCards((prev) =>
      prev.map((c) =>
        c.id === id
          ? { ...c, list: c.list.filter((_, i) => i !== tagIndex) }
          : c,
      ),
    );
  };

  const updateTag = (id, tagIndex, value) => {
    setCards((prev) =>
      prev.map((c) =>
        c.id === id
          ? {
              ...c,
              list: c.list.map((tag, i) => (i === tagIndex ? value : tag)),
            }
          : c,
      ),
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
    addTag,
    removeTag,
    updateTag,
    bgColor,
    setBgColor,
  };
};

export default useTechnologiesBlock;
