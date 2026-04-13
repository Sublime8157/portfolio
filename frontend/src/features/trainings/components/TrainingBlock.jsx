import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { motion } from "framer-motion";
import Motion from "../../utils/Motion.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { faCircle } from "@fortawesome/free-solid-svg-icons";

const TrainingBlock = ({
  training,
  isEditing,
  onDelete,
  onUpdate,
  onAddTag,
  onRemoveTag,
  onUpdateTag,
  delay,
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: training.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} className="relative">
      {/* Drag handle — edit mode only */}
      {isEditing && (
        <button
          {...attributes}
          {...listeners}
          className="absolute -top-3 left-0 text-gray-500 hover:text-gray-300 
                     cursor-grab text-xs select-none touch-none"
        >
          ⠿ drag
        </button>
      )}

      {/* Delete button — edit mode only */}
      {isEditing && (
        <button
          onClick={() => onDelete(training.id)}
          className="absolute -top-3 right-0 text-red-400 
                     hover:text-red-300 text-xs cursor-pointer 
                     flex items-center gap-1"
        >
          <FontAwesomeIcon icon={faTrashCan} /> Remove
        </button>
      )}

      <Motion direction="bottom" delay={delay}>
        <motion.div
          whileHover={{ scale: isEditing ? 1 : 1.02 }}
          whileTap={{ scale: 1 }}
          className="text-left w-full flex flex-col gap-4 shadow-md shadow-gray-600 p-5 mt-4"
        >
          {/* Title + Duration */}
          {isEditing ? (
            <div className="flex flex-col gap-1">
              <input
                value={training.title}
                onChange={(e) => onUpdate(training.id, "title", e.target.value)}
                className="bg-transparent border-b border-gray-600 text-white 
                           text-sm outline-none w-full"
                placeholder="Training title"
              />
              <input
                value={training.duration}
                onChange={(e) =>
                  onUpdate(training.id, "duration", e.target.value)
                }
                className="bg-transparent border-b border-gray-600 text-[#a7a9be] 
                           text-sm outline-none italic w-full"
                placeholder="Start - End"
              />
            </div>
          ) : (
            <div>
              <h6 className="lg:text-base text-sm">{training.title}</h6>
              <h6
                className="text-[#a7a9be] lg:text-base text-sm"
                style={{ fontStyle: "italic" }}
              >
                {training.duration}
              </h6>
            </div>
          )}

          {/* Paragraph */}
          {isEditing ? (
            <textarea
              value={training.paragraph}
              onChange={(e) =>
                onUpdate(training.id, "paragraph", e.target.value)
              }
              rows={4}
              className="w-full bg-transparent border border-gray-600 rounded 
                         text-sm text-[#a7a9be] outline-none p-2 resize-none"
              placeholder="Describe your training... use \n for new lines"
            />
          ) : (
            <div className="text-[#a7a9be] text-sm whitespace-pre-line">
              {training.paragraph.split("\n").map(
                (line, i) =>
                  line.trim() !== "" && (
                    <div key={i} className="mb-2 flex gap-4 items-start">
                      <FontAwesomeIcon
                        icon={faCircle}
                        className="text-[8px] mt-2 text-[#ff8906]"
                      />
                      <p>{line}</p>
                    </div>
                  ),
              )}
            </div>
          )}

          {/* Tech tags */}
          <div className="text-gray-600 flex-wrap flex flex-row gap-2 items-center">
            {training.techs.map((tech, i) => (
              <div
                key={i}
                className={`border rounded-full px-2 border-gray-600 
                           flex items-center gap-1 ${isEditing ? "" : "hoverTech"}`}
              >
                {isEditing ? (
                  <>
                    <input
                      value={tech}
                      onChange={(e) =>
                        onUpdateTag(training.id, i, e.target.value)
                      }
                      className="bg-transparent outline-none text-gray-400 
                                 text-xs w-16"
                    />
                    <button
                      onClick={() => onRemoveTag(training.id, i)}
                      className="text-red-400 hover:text-red-300 text-xs cursor-pointer"
                    >
                      ✕
                    </button>
                  </>
                ) : (
                  tech
                )}
              </div>
            ))}

            {/* Add tag — edit mode only */}
            {isEditing && (
              <button
                onClick={() => onAddTag(training.id)}
                className="rounded-full border border-dashed border-gray-600 
                           px-2 text-xs text-gray-500 hover:text-gray-300 
                           hover:border-gray-400 transition-colors cursor-pointer"
              >
                + Add
              </button>
            )}
          </div>
        </motion.div>
      </Motion>
    </div>
  );
};

export default TrainingBlock;
