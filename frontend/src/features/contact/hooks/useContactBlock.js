import { useState } from "react";
import { nanoid } from "nanoid";

const uid = () => nanoid();

const initialContactList = [
  { id: uid(), type: "Phone", link: "+639154403873", icon: "call" },
  { id: uid(), type: "Email", link: "miranj8157@gmail.com", icon: "mail" },
  {
    id: uid(),
    type: "Github",
    link: "https://github.com/Sublime8157",
    icon: "logo-github",
  },
  {
    id: uid(),
    type: "LinkedIn",
    link: "https://www.linkedin.com/in/joven-miran-449207313/",
    icon: "logo-linkedin",
  },
];

export const useContactBlocks = () => {
  const [heading, setHeading] = useState(
    "<p>Let's work it out, what's on your mind?</p>",
  );
  const [subheading, setSubheading] = useState("<p>Feel free to reach out</p>");
  const [contactLinks, setContactLinks] = useState(initialContactList);
  const [isEditing, setIsEditing] = useState(false);
  const [bgColor, setBgColor] = useState("transparent");

  const startEditing = () => setIsEditing(true);
  const stopEditing = () => setIsEditing(false);

  const updateContactLink = (id, field, value) => {
    setContactLinks((prev) =>
      prev.map((c) => (c.id === id ? { ...c, [field]: value } : c)),
    );
  };

  const addContact = () => {
    setContactLinks((prev) => [
      ...prev,
      { id: uid(), type: "New Contact", link: "#", icon: "link" },
    ]);
  };

  const removeContact = (id) => {
    setContactLinks((prev) => prev.filter((c) => c.id !== id));
  };

  return {
    heading,
    subheading,
    setHeading,
    setSubheading,
    contactLinks,
    updateContactLink,
    isEditing,
    startEditing,
    stopEditing,
    addContact,
    removeContact,
    bgColor,
    setBgColor,
  };
};
