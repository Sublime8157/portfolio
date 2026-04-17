import { useState } from "react";
import { arrayMove } from "@dnd-kit/sortable";
import ProfileImage from "../../../assets/ProfileImage.png";
import { nanoid } from "nanoid";

const uid = () => nanoid();

export const createTextBlock = (
  content = "<p>New Text Block</p>",
  textClass = "",
) => ({
  id: uid(),
  type: "text",
  content,
  textClass,
});

export const createButtonBlock = (
  label = "Button",
  url = "#",
  variant = "",
  buttonClass = "",
) => ({
  id: uid(),
  type: "button",
  label,
  url,
  variant,
  buttonClass,
});

const initialBlocks = [
  createTextBlock(
    "FREELANCE / FULL-TIME · RIZAL, PH",
    "lg:text-lg text-base text-gray-700",
  ),
  createTextBlock("Software Developer", "lg:text-5xl text-3xl"),
  createTextBlock(
    "Full-Stack Developer focused on building and maintaining ERP systems, solving real-world production issues, and continuously improving through modern web technologies.",
    "text-sm text-gray-700",
  ),
  createButtonBlock(
    "LinkedIn",
    "https://www.linkedin.com/in/joven-miran-449207313/",
    "primary",
    "bg-accent! text-accent-text!",
  ),
  createButtonBlock("Copy Email", "miranj8157@gmail.com", "outline", ""),
];

export const useHeroBlocks = () => {
  const [blocks, setBlocks] = useState(initialBlocks);
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState(ProfileImage);
  const [bgColor, setBgColor] = useState("transparent");

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
    bgColor,
    setBgColor,
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
