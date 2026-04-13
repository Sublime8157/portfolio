import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import Motion from "../../utils/Motion.jsx";
import { motion } from "framer-motion";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

const ProjectBlock = ({
  project,
  isEditing,
  onDelete,
  onUpdate,
  onAddImage,
  onRemoveImage,
  onAddTag,
  onRemoveTag,
  onUpdateTag,
  onOpen,
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: project.id });

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
          className="absolute left-0 text-text-paragraph hover:opacity-50 
                     cursor-grab text-xs select-none touch-none"
        >
          ⠿ drag
        </button>
      )}

      {/* Delete button — edit mode only */}
      {isEditing && (
        <button
          onClick={() => onDelete(project.id)}
          className="cursor-pointer absolute right-0 text-icon-color hover:opacity-50 text-xs"
        >
          <FontAwesomeIcon icon={faTrashCan} /> Remove
        </button>
      )}

      <Motion className="lg:shadow-none shadow-md shadow-shadow-color p-5 lg:p-10 pt-5 flex items-start lg:flex-row flex-col lg:gap-20">
        {/* Image Stack */}
        <div className="relative lg:w-80 lg:m-0 ml-3 h-32 w-full lg:mb-0 mb-10 shrink-0">
          {project.images.map((image, i) => (
            <div
              key={i}
              className="absolute"
              style={{
                top: i * 6,
                left: i * 6,
                zIndex: project.images.length - i,
              }}
            >
              <img
                src={image}
                className="lg:w-80 w-64 h-32 object-cover rounded-lg shadow-md"
              />
              {/* Remove image button — edit mode only */}
              {isEditing && (
                <button
                  onClick={() => onRemoveImage(project.id, i)}
                  className="absolute top-1 right-1 bg-black/60 text-red-400 
                             hover:text-red-300 text-xs rounded-full w-5 h-5 
                             flex items-center justify-center cursor-pointer"
                >
                  ✕
                </button>
              )}
            </div>
          ))}

          {/* Click to open modal — view mode only */}
          {!isEditing && project.images.length > 0 && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 1 }}
              className="absolute inset-0 w-full h-full cursor-pointer z-50"
              onClick={() => onOpen(project)}
            />
          )}

          {/* Add image button — edit mode only */}
          {isEditing && (
            <label
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 text-xs px-2 py-1 
                         rounded border border-dashed border-gray-600 
                         hover:text-gray-500 text-gray-300 cursor-pointer 
                         bg-black/60 transition-colors"
            >
              + Image
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) onAddImage(project.id, file);
                }}
              />
            </label>
          )}
        </div>

        <hr className="lg:hidden block w-full text-gray-600 mb-8" />

        {/* Project details */}
        <div className="flex flex-col gap-4 w-full">
          {/* Name + Role */}
          {isEditing ? (
            <div className="flex flex-col gap-1">
              <input
                value={project.name}
                onChange={(e) => onUpdate(project.id, "name", e.target.value)}
                className="bg-transparent border-b border-stroke text-text-paragraph 
                           text-sm outline-none"
                placeholder="Project name"
              />
              <input
                value={project.role}
                onChange={(e) => onUpdate(project.id, "role", e.target.value)}
                className="bg-transparent border-b border-stroke text-text-paragraph 
                           text-xs outline-none italic"
                placeholder="Your role"
              />
            </div>
          ) : (
            <h6 className="lg:text-base items-center flex flex-row gap-2 text-sm text-text-paragraph">
              {project.name} - {project.role}
            </h6>
          )}

          {/* Paragraph */}
          {isEditing ? (
            <textarea
              value={project.paragraph}
              onChange={(e) =>
                onUpdate(project.id, "paragraph", e.target.value)
              }
              rows={6}
              className="w-full bg-transparent border border-stroke rounded 
                         text-sm text-text-paragraph outline-none p-2 resize-none"
              placeholder="Describe your project... use \n for new lines"
            />
          ) : (
            <div className="lg:text-base text-sm text-text-paragraph whitespace-pre-line">
              {project.paragraph.split("\n").map(
                (line, i) =>
                  line.trim() !== "" && (
                    <div key={i} className="mb-2 flex gap-4 items-start">
                      <div className="z-10 text-sm flex flex-row items-start gap-2">
                        <FontAwesomeIcon
                          icon={faCircle}
                          className="text-[8px] mt-2 text-highlight"
                        />
                        <p>{line}</p>
                      </div>
                    </div>
                  ),
              )}
            </div>
          )}

          {/* Technologies */}
          <ul className="flex flex-wrap flex-row gap-4">
            {project.technologies.map((tech, i) => (
              <li key={i} className="lg:text-base text-sm">
                <div
                  className={`flex-wrap px-2 text-sm rounded-full 
                               border border-stroke text-gray-600 
                               flex items-center gap-1 ${isEditing ? "" : "hoverTech"}`}
                >
                  {isEditing ? (
                    <>
                      <input
                        value={tech}
                        onChange={(e) =>
                          onUpdateTag(project.id, i, e.target.value)
                        }
                        className="bg-transparent outline-none text-text-paragraph
                                   text-xs w-16"
                      />
                      <button
                        onClick={() => onRemoveTag(project.id, i)}
                        className="text-red-400 hover:text-red-300 text-xs"
                      >
                        ✕
                      </button>
                    </>
                  ) : (
                    <span>{tech}</span>
                  )}
                </div>
              </li>
            ))}

            {/* Add tag — edit mode only */}
            {isEditing && (
              <button
                onClick={() => onAddTag(project.id)}
                className="rounded-full border border-dashed border-stroke 
                           px-2 text-xs text-gray-500 hover:text-gray-300 
                           hover:border-gray-400 transition-colors cursor-pointer "
              >
                + Add
              </button>
            )}
          </ul>

          {/* Repository link */}
          {isEditing ? (
            <input
              value={project.repository}
              onChange={(e) =>
                onUpdate(project.id, "repository", e.target.value)
              }
              className="bg-transparent border-b border-stroke text-text-paragraph 
                         text-xs outline-none w-full"
              placeholder="Repository URL"
            />
          ) : (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 1 }}
              className="cursor-pointer w-28 px-2 border border-gray-500 
                         justify-between text-gray-500 rounded-full p-2 
                         flex flex-row items-center"
              onClick={() => window.open(project.repository, "_blank")}
            >
              <p>Repository</p>
              <FontAwesomeIcon icon={faArrowDown} className="-rotate-130" />
            </motion.button>
          )}
        </div>
      </Motion>
    </div>
  );
};

export default ProjectBlock;
