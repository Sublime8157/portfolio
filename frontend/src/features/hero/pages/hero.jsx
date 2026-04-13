import Profile from "../../../assets/ProfileImage.png";
import Motion from "../../utils/Motion.jsx";
import { useState } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useHeroBlocks } from "../hooks/userHeroBlock.js";
import HeroBlock from "../components/HeroBlock.jsx";
import { faPenToSquare, faSave } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Hero = () => {
  const {
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
  } = useHeroBlocks();

  const [isHovered, setIsHovered] = useState(false);
  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      reorderBlocks(active.id, over.id);
    }
  };

  return (
    <div
      className="relative flex w-full lg:flex-row lg:gap-0 gap-10 flex-col-reverse justify-between items-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {(isHovered || isEditing) && (
        <button
          onClick={isEditing ? stopEditing : startEditing}
          className="cursor-pointer absolute -top-6 right-0 z-10 text-xs px-2 py-1 
                     rounded border transition-all duration-150
                     border-gray-600 text-text-paragraph hover:opacity-50
                     hover:border-gray-300 bg-transparent"
          style={{ transitionDuration: "300ms" }}
        >
          <FontAwesomeIcon icon={isEditing ? faSave : faPenToSquare} />
        </button>
      )}
      <Motion
        direction="left"
        duration={1}
        className="flex flex-col gap-8 lg:w-6/12 w-12/12"
      >
        {/* Hoverable container with Edit/Save button */}
        <div className="relative">
          {/* Edit / Save button — top right corner */}

          {/* Block System */}
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={blocks.map((b) => b.id)}
              strategy={verticalListSortingStrategy}
            >
              {/* Text Blocks — stacked vertically */}
              <div className="flex flex-col gap-4">
                {blocks
                  .filter((b) => b.type === "text")
                  .map((block) => (
                    <HeroBlock
                      key={block.id}
                      block={block}
                      isEditing={isEditing}
                      onDelete={deleteBlock}
                      onUpdate={updateBlock}
                      onUpdateButton={updateButton}
                    />
                  ))}
                {isEditing && (
                  <div className="ms-4 flex gap-2">
                    <button
                      onClick={addTextBlock}
                      className="text-xs w-48 cursor-pointer text-gray-500 border border-dashed border-gray-600 
                           rounded px-3 py-1 hover:text-gray-300 hover:border-gray-400 
                           transition-colors"
                    >
                      +
                    </button>
                  </div>
                )}
              </div>

              {/* Button Blocks — side by side */}
              <div className="flex flex-row gap-4 flex-wrap mt-4">
                {blocks
                  .filter((b) => b.type === "button")
                  .map((block) => (
                    <HeroBlock
                      key={block.id}
                      block={block}
                      isEditing={isEditing}
                      onDelete={deleteBlock}
                      onUpdate={updateBlock}
                      onUpdateButton={updateButton}
                    />
                  ))}
              </div>
            </SortableContext>
          </DndContext>

          {/* Add Block Controls — only in edit mode */}
          {isEditing && (
            <div className="ms-4 flex gap-2 mt-4">
              <button
                onClick={addButtonBlock}
                className="text-xs w-64 cursor-pointer text-gray-500 border border-dashed border-gray-600 
                           rounded px-3 py-1 hover:text-gray-300 hover:border-gray-400 
                           transition-colors"
              >
                +
              </button>
            </div>
          )}
        </div>
      </Motion>

      {/* Profile Image — stays static */}
      <Motion direction="right" className="">
        <div className="relative group">
          <img
            src={profileImage}
            className="bg-tertiary h-60 w-60 lg:w-90 lg:h-90 rounded-full"
          />
          {isEditing && (
            <label
              className="absolute inset-0 flex items-center justify-center 
                   rounded-full cursor-pointer
                   bg-black/50 opacity-0 group-hover:opacity-100 
                   transition-opacity duration-200"
            >
              <span className="text-white text-xs text-center px-4">
                Click to replace
              </span>
              {/* Hidden file input */}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    updateProfileImage(file);
                  }
                }}
              />
            </label>
          )}
        </div>
      </Motion>
    </div>
  );
};

export default Hero;
