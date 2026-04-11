import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import Motion from "../../utils/Motion.jsx";
import { motion } from "framer-motion";
import useBreakPoints from "../../../hooks/useBreakPoint.js";
import { useState, useCallback } from "react";

const ExperienceBlock = ({
  exp,
  isEditing,
  onDelete,
  onUpdate,
  onUpdateLogo,
  onAddTag,
  onRemoveTag,
  onUpdateTag,
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: exp.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const isLg = useBreakPoints(1024);
  const [revealed, setRevealed] = useState(false);
  const toggleReveal = useCallback(() => setRevealed((prev) => !prev), []);
  const isRevealed = isLg || revealed;

  return (
    <div ref={setNodeRef} style={style} className="relative w-full">
      {/* Drag handle — edit mode only */}
      {isEditing && (
        <button
          {...attributes}
          {...listeners}
          className="absolute -top-5 left-0 text-gray-500 hover:text-gray-300 
                     cursor-grab text-xs select-none touch-none"
        >
          ⠿ Drag
        </button>
      )}

      {/* Delete button — edit mode only */}
      {isEditing && (
        <button
          onClick={() => onDelete(exp.id)}
          className="cursor-pointer absolute -top-5 right-0 text-red-400 
                     hover:text-red-300 text-xs"
        >
          <FontAwesomeIcon icon={faTrashCan} /> Remove
        </button>
      )}

      <motion.div
        whileHover={{ scale: isEditing ? 1 : 1.01 }}
        whileTap={{ scale: 1 }}
      >
        <Motion
          direction="bottom"
          className="flex gap-4 flex-col rounded shadow-md shadow-gray-600 p-4 text-left"
        >
          {/* Header row — logo + name/role/tenure */}
          <div className="flex flex-row justify-between items-center">
            <div className="gap-2 items-center flex flex-row">
              {/* Logo — clickable to replace in edit mode */}
              <div className="relative group">
                {exp.logo && (
                  <img src={exp.logo} width={40} className="rounded" />
                )}
                {isEditing && (
                  <label
                    className="absolute inset-0 flex items-center justify-center
                                   bg-black/60 opacity-0 group-hover:opacity-100
                                   transition-opacity cursor-pointer rounded"
                  >
                    <span className="text-white text-xs">↑</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) onUpdateLogo(exp.id, file);
                      }}
                    />
                  </label>
                )}
              </div>

              {/* Name / Role / Tenure */}
              <div className="flex flex-col gap-1">
                {isEditing ? (
                  <>
                    <input
                      value={exp.name}
                      onChange={(e) => onUpdate(exp.id, "name", e.target.value)}
                      className="bg-transparent border-b border-gray-600 text-white 
                                 text-sm outline-none"
                      placeholder="Company name"
                    />
                    <input
                      value={exp.role}
                      onChange={(e) => onUpdate(exp.id, "role", e.target.value)}
                      className="bg-transparent border-b border-gray-600 text-gray-400 
                                 text-xs outline-none italic"
                      placeholder="Role"
                    />
                    <input
                      value={exp.tenure}
                      onChange={(e) =>
                        onUpdate(exp.id, "tenure", e.target.value)
                      }
                      className="bg-transparent border-b border-gray-600 text-gray-400 
                                 text-xs outline-none"
                      placeholder="Start - End"
                    />
                  </>
                ) : (
                  <>
                    <h6 className="lg:text-base text-sm">
                      {exp.name} - {exp.role}
                    </h6>
                    <h6 className="text-[#a7a9be] lg:text-base text-sm italic">
                      {exp.tenure}
                    </h6>
                  </>
                )}
              </div>
            </div>

            {/* Collapse toggle — view mode on mobile only */}
            {!isLg && !isEditing && (
              <div className="cursor-pointer" onClick={toggleReveal}>
                <ion-icon
                  name={revealed ? "remove-outline" : "add-outline"}
                  class="text-2xl"
                />
              </div>
            )}
          </div>

          {/* Expandable content */}
          <div
            style={{
              maxHeight: isRevealed || isEditing ? "1000px" : "0px",
              opacity: isRevealed || isEditing ? 1 : 0,
              overflow: "hidden",
              transition: "max-height 0.8s ease, opacity 0.5s ease",
            }}
          >
            {/* Paragraph */}
            {isEditing ? (
              <textarea
                value={exp.paragraph}
                onChange={(e) => onUpdate(exp.id, "paragraph", e.target.value)}
                rows={6}
                className="w-full bg-transparent border border-gray-600 rounded 
                           text-sm text-[#a7a9be] outline-none p-2 resize-none"
                placeholder="Describe your experience... use \n for new lines"
              />
            ) : (
              <div className="text-sm text-[#a7a9be] whitespace-pre-line">
                {exp.paragraph.split("\n").map(
                  (line, i) =>
                    line.trim() !== "" && (
                      <div key={i} className="mb-2 flex gap-4 items-start">
                        <div className="z-10 text-xs mt-1">
                          <FontAwesomeIcon
                            icon={faCircle}
                            className="text-[8px] text-[#ff8906]"
                          />
                        </div>
                        <p>{line}</p>
                      </div>
                    ),
                )}
              </div>
            )}

            {/* Stack tags */}
            <div className="flex items-center flex-row flex-wrap text-gray-600 gap-2 mt-2">
              {exp.stacks?.map((item, index) => (
                <div
                  key={index}
                  className="hoverTech rounded-full border border-gray-600 p-1 
                             px-2 text-xs flex items-center gap-1"
                >
                  {isEditing ? (
                    <>
                      <input
                        value={item}
                        onChange={(e) =>
                          onUpdateTag(exp.id, index, e.target.value)
                        }
                        className="bg-transparent outline-none text-gray-400 
                                   text-xs w-16"
                      />
                      <button
                        onClick={() => onRemoveTag(exp.id, index)}
                        className="text-red-400 hover:text-red-300 text-xs"
                      >
                        ✕
                      </button>
                    </>
                  ) : (
                    item
                  )}
                </div>
              ))}

              {/* Add tag — edit mode only */}
              {isEditing && (
                <button
                  onClick={() => onAddTag(exp.id)}
                  className="rounded-full border border-dashed border-gray-600 
                             p-1 px-2 text-xs text-gray-500 hover:text-gray-300 
                             hover:border-gray-400 transition-colors cursor-pointer"
                >
                  + Add
                </button>
              )}
            </div>
          </div>
        </Motion>
      </motion.div>
    </div>
  );
};

export default ExperienceBlock;
