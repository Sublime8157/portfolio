import technologyList, { icons } from "./components/technologyList";
import Motion from "../utils/Motion";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TechnologiesBlock from "./components/TechnologiesBlock.jsx";

const Technologies = () => {
  const {
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
  } = useTechnologiesBlock();

  const [isHovered, setIsHovered] = useState(false);
  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      reorderCards(active.id, over.id);
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-lg lg:text-2xl text-center">Technologies</h1>

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
            items={cards.map((c) => c.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="mt-10 flex flex-col flex-wrap lg:justify-around gap-8 items-start">
              {cards.map((card) => {
                return (
                  <TechnologiesBlock
                    key={card.id}
                    card={card}
                    isEditing={isEditing}
                    onDelete={deleteCard}
                    onUpdate={updateCard}
                    onAddTag={addTag}
                    onRemoveTag={removeTag}
                    onUpdateTag={updateTag}
                  />
                );
              })}
              {isEditing && (
                <div className="h-full w-full flex self-center">
                  <button
                    onClick={addCard}
                    className="h-20 w-full cursor-pointer text-gray-500 border border-dashed border-gray-600 
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

export default Technologies;
