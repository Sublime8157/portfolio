import { useState } from "react";
import { arrayMove } from "@dnd-kit/sortable";
import { nanoid } from "nanoid";

const uid = () => nanoid();

export const createTrainingBlock = (
  title = "Training Title",
  duration = "Start - End",
  paragraph = "Describe your training here.",
  techs = [],
) => ({
  id: uid(),
  title,
  duration,
  paragraph,
  techs,
});

const initialTrainings = [
  createTrainingBlock(
    "Web Development LVII NCII",
    "February 23 2021 - March 11 2021",
    "Introduced with the basic of web development \n Created a simple static and dynamic website using the basic fundamentals of web development.",
    ["HTML", "CSS", "PHP"],
  ),
  createTrainingBlock(
    "Java Programming NCIII",
    "August 24 2023 - October 10 2023",
    "Familiarized with Java programming language Introduced to the concept of OOP in Java and its functionality and the efficiency of using OOP \n Created a simple project as assessment individually that's emphasize the functionality of OOP",
    ["OOP", "Java"],
  ),
];

export const useTrainingBlocks = () => {
  const [trainings, setTrainings] = useState(initialTrainings);
  const [isEditing, setIsEditing] = useState(false);
  const [bgColor, setBgColor] = useState("transparent");

  const startEditing = () => setIsEditing(true);
  const stopEditing = () => setIsEditing(false);

  const addTraining = () =>
    setTrainings((prev) => [...prev, createTrainingBlock()]);

  const deleteTraining = (id) =>
    setTrainings((prev) => prev.filter((t) => t.id !== id));

  const updateTraining = (id, field, value) =>
    setTrainings((prev) =>
      prev.map((t) => (t.id === id ? { ...t, [field]: value } : t)),
    );

  const addTag = (id) =>
    setTrainings((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, techs: [...t.techs, "New Tech"] } : t,
      ),
    );

  const removeTag = (id, tagIndex) =>
    setTrainings((prev) =>
      prev.map((t) =>
        t.id === id
          ? { ...t, techs: t.techs.filter((_, i) => i !== tagIndex) }
          : t,
      ),
    );

  const updateTag = (id, tagIndex, value) =>
    setTrainings((prev) =>
      prev.map((t) =>
        t.id === id
          ? {
              ...t,
              techs: t.techs.map((tag, i) => (i === tagIndex ? value : tag)),
            }
          : t,
      ),
    );

  const reorderTrainings = (activeId, overId) => {
    setTrainings((prev) => {
      const oldIndex = prev.findIndex((t) => t.id === activeId);
      const newIndex = prev.findIndex((t) => t.id === overId);
      return arrayMove(prev, oldIndex, newIndex);
    });
  };

  return {
    trainings,
    isEditing,
    startEditing,
    stopEditing,
    addTraining,
    deleteTraining,
    updateTraining,
    addTag,
    removeTag,
    updateTag,
    reorderTrainings,
    bgColor,
    setBgColor,
  };
};
