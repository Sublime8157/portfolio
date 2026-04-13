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
import { useState } from "react";
import { useExperienceBlocks } from "./hooks/userExperienceBlock.js";
import ExperienceBlock from "./components/ExperienceBlock.jsx";
import Motion from "../utils/Motion.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faSave } from "@fortawesome/free-regular-svg-icons";

const Experiences = () => {
  const {
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
  } = useExperienceBlocks();

  const [isHovered, setIsHovered] = useState(false);
  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      reorderExperiences(active.id, over.id);
    }
  };

  return (
    <div className="flex flex-col gap-10">
      <Motion
        direction="top"
        className="mt-10 text-center text-lg md:text-2xl text-text-headline"
      >
        EXPERIENCES
      </Motion>

      <div
        className="relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Edit / Save button */}
        {(isHovered || isEditing) && (
          <button
            onClick={isEditing ? stopEditing : startEditing}
            className="absolute -top-6 right-0 z-10 text-xs px-2 py-1 
                       rounded border transition-all duration-150
                       border-gray-800 text-text-paragraph hover:opacity-70
                       hover:border-gray-300 bg-transparent cursor-pointer"
          >
            <FontAwesomeIcon icon={isEditing ? faSave : faPenToSquare} />
          </button>
        )}

        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={experiences.map((e) => e.id)}
            strategy={verticalListSortingStrategy}
          >
            <ul className="pt-8 flex flex-col justify-between gap-14 items-center">
              {experiences.map((exp) => (
                <ExperienceBlock
                  key={exp.id}
                  exp={exp}
                  isEditing={isEditing}
                  onDelete={deleteExperience}
                  onUpdate={updateExperience}
                  onUpdateLogo={updateLogo}
                  onAddTag={addTag}
                  onRemoveTag={removeTag}
                  onUpdateTag={updateTag}
                />
              ))}
            </ul>
          </SortableContext>
        </DndContext>

        {/* Add experience — edit mode only */}
        {isEditing && (
          <div className="h-full w-full flex self-center mt-8">
            <button
              onClick={addExperience}
              className="h-20 w-full cursor-pointer text-gray-500 border 
                         border-dashed border-gray-600 rounded hover:text-gray-300 
                         hover:border-gray-400 transition-colors text-3xl"
            >
              +
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Experiences;
