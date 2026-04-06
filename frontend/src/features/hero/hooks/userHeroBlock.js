import { useState } from "react";
import { arrayMove } from "@dnd-kit/sortable";
import ProfileImage from "../../../assets/ProfileImage.png";

const uid = () => crypto.randomUUID();

export const createTextBlock = (content = "<p>New Text Block</p>") => ({
  id: uid(),
  type: "text",
  content,
});

export const createButtonBlock = (label = "Button", url = "#") => ({
  id: uid(),
  type: "button",
  label,
  url,
});

const initialBlocks = [
  createTextBlock("FREELANCE / FULL-TIME · RIZAL, PH"),
  createTextBlock("Software Developer"),
  createTextBlock("I am a software developer based in Rizal, PH."),
  createButtonBlock(
    "LinkedIn",
    "https://www.linkedin.com/in/joven-miran-449207313/",
  ),
  createButtonBlock("Copy Email", "miranj8157@gmail.com"),
];

export const useHeroBlocks = () => {
  const [blocks, setBlocks] = useState(initialBlocks);
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState(ProfileImage);

  const updateProfileImage = (file) => {
    const url = URL.createObjectURL(file);
    setProfileImage(url);
  };

  const startEditing = () => setIsEditing(true);
  const stopEditing = () => setIsEditing(false);

  // add new block
  const addTextBlock = () => {
    setBlocks((prev) => [...prev, createTextBlock()]);
  };

  // add new button block
  const addButtonBlock = () => {
    setBlocks((prev) => [...prev, createButtonBlock()]);
  };

  // delete block by id
  const deleteBlock = (id) => {
    setBlocks((prev) => prev.filter((b) => b.id !== id));
  };

  //   update block content
  const updateBlock = (id, content) => {
    setBlocks((prev) => prev.map((b) => (b.id === id ? { ...b, content } : b)));
  };

  // update button
  const updateButton = (id, field, value) => {
    setBlocks((prev) =>
      prev.map((b) => (b.id === id ? { ...b, [field]: value } : b)),
    );
  };

  const reorderBlocks = (activeId, overId) => {
    setBlocks((prev) => {
      const oldIndex = prev.findIndex((b) => b.id === activeId);
      const newIndex = prev.findIndex((b) => b.id === overId);
      return arrayMove(prev, oldIndex, newIndex);
    });
  };

  return {
    blocks,
    isEditing,
    profileImage,
    updateProfileImage,
    startEditing,
    stopEditing,
    addTextBlock,
    addButtonBlock,
    deleteBlock,
    updateBlock,
    updateButton,
    reorderBlocks,
  };
};
