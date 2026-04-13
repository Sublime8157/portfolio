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
import { useTrainingBlocks } from "./hooks/useTrainingBlocks.js";
import TrainingBlock from "./components/TrainingBlock.jsx";
import Motion from "../utils/Motion.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faSave } from "@fortawesome/free-regular-svg-icons";

const Trainings = () => {
  const {
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
  } = useTrainingBlocks();

  const [isHovered, setIsHovered] = useState(false);
  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      reorderTrainings(active.id, over.id);
    }
  };

  return (
    <div className="flex flex-col">
      <Motion direction="top" className="text-center text-lg mb-10 md:text-2xl">
        TRAININGS
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
                       border-gray-800 text-gray-400 hover:text-white 
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
            items={trainings.map((t) => t.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="flex flex-col gap-8 pt-5">
              {trainings.map((training, index) => (
                <TrainingBlock
                  key={training.id}
                  training={training}
                  isEditing={isEditing}
                  delay={index * 0.03}
                  onDelete={deleteTraining}
                  onUpdate={updateTraining}
                  onAddTag={addTag}
                  onRemoveTag={removeTag}
                  onUpdateTag={updateTag}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>

        {/* Add training — edit mode only */}
        {isEditing && (
          <div className="h-full w-full flex self-center mt-4">
            <button
              onClick={addTraining}
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

export default Trainings;
