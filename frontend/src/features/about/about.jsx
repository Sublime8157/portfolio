import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useState } from "react";
import { useAboutBlocks } from "./hooks/useAboutBlock.js";
import AboutBlock from "./components/AboutBlock.jsx";
import { faPenToSquare, faSave } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SectionColorPicker from "../../components/SectionColorPicker.jsx";

const About = () => {
  const {
    cards,
    isEditing,
    startEditing,
    stopEditing,
    addCard,
    deleteCard,
    updateCard,
    reorderCards,
    bgColor,
    setBgColor,
  } = useAboutBlocks();

  const [isHovered, setIsHovered] = useState(false);
  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      reorderCards(active.id, over.id);
    }
  };

  return (
    <div
      className="relative flex flex-col gap-8 lg:p-20 p-10"
      style={{ backgroundColor: bgColor }}
    >
      {/* Add Block Controls — only in edit mode */}
      {isEditing && (
        <div className="absolute hidden lg:block bottom-4 left-1/2 transform -translate-x-1/2 z-50">
          {/* Color Picker */}
          <SectionColorPicker
            currentColor={bgColor}
            onColorChange={setBgColor}
          />
        </div>
      )}

      <h1 className="text-lg lg:text-2xl text-center text-text-headline">
        ABOUT
      </h1>

      <div
        className="relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {(isHovered || isEditing) && (
          <button
            onClick={isEditing ? stopEditing : startEditing}
            className="absolute -top-6 right-0 z-10 text-xs px-2 py-1 
                       rounded border transition-all duration-150
                       border-gray-800 text-text-paragraph hover:opacity-50
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
            items={cards.map((c) => c.id)}
            strategy={horizontalListSortingStrategy}
          >
            <div className="p-0 lg:p-5 mt-5 flex flex-col lg:flex-row gap-10 justify-center items-start">
              {cards.map((card) => (
                <AboutBlock
                  key={card.id}
                  card={card}
                  isEditing={isEditing}
                  onDelete={deleteCard}
                  onUpdate={updateCard}
                />
              ))}
              {isEditing && (
                <div className="h-full flex self-center">
                  <button
                    onClick={addCard}
                    className="h-48 w-20 cursor-pointer text-gray-500 border border-dashed border-gray-600 
                         rounded hover:text-gray-300 hover:border-gray-400 
                         transition-colors text-3xl bold"
                  >
                    +
                  </button>
                </div>
              )}
            </div>
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
};

export default About;
