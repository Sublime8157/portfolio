import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Editor from "../../../components/tiptap/Editor.jsx";
import Button from "../../utils/Button.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { useState } from "react";

const HeroBlock = ({
  block,
  onDelete,
  onUpdate,
  onUpdateButton,
  isEditing,
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: block.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const [copied, setCopied] = useState(false);

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="relative group flex items-start gap-2"
    >
      {/* Drag Handle — only visible on hover */}
      {isEditing && (
        <button
          {...attributes}
          {...listeners}
          className="opacity-0 group-hover:opacity-100 transition-opacity 
                   cursor-grab mt-1 text-text-paragraph hover:text-gray-300 
                   select-none touch-none text-xs"
        >
          ⠿
        </button>
      )}

      {/* Block Content */}
      <div className="text-text-paragraph flex-1">
        {block.type === "text" &&
          (isEditing ? (
            <Editor
              content={block.content}
              onUpdate={(html) => onUpdate(block.id, html)}
            />
          ) : (
            <div
              className={`outline-none ${block.textClass}`}
              dangerouslySetInnerHTML={{ __html: block.content }}
            />
          ))}

        {block.type === "button" &&
          (isEditing ? (
            <div className="flex flex-col gap-1">
              {/* Editable label */}
              <input
                value={block.label}
                onChange={(e) =>
                  onUpdateButton(block.id, "label", e.target.value)
                }
                className="bg-transparent border-b border-stroke text-text-paragraph
                         text-sm outline-none w-fit"
                placeholder="Button label"
              />
              {/* Editable url */}
              <input
                value={block.url}
                onChange={(e) =>
                  onUpdateButton(block.id, "url", e.target.value)
                }
                className="bg-transparent border-b border-stroke text-text-paragraph
                         text-xs outline-none w-fit"
                placeholder="URL or email"
              />
              {/* Preview of actual button */}
              <Button
                variant="primary"
                className="lg:w-60 w-40 mt-1 bg-accent text-accent-text"
                onClick={() => {
                  if (block.url.includes("@")) {
                    navigator.clipboard.writeText(block.url);
                  } else {
                    window.open(block.url, "_blank");
                  }
                }}
              >
                {block.label}
              </Button>
            </div>
          ) : (
            <Button
              variant={block.variant}
              className={`lg:w-60 w-40 mt-1 ${block.buttonClass}`}
              onClick={() => {
                if (block.url.includes("@")) {
                  navigator.clipboard.writeText(block.url);
                  setCopied(true);

                  setTimeout(() => {
                    setCopied(false);
                  }, 1500);
                } else {
                  window.open(block.url, "_blank");
                }
              }}
            >
              {copied ? "Copied!" : block.label}
            </Button>
          ))}
      </div>

      {/* Delete Button — only visible on hover */}
      {isEditing && (
        <button
          onClick={() => onDelete(block.id)}
          className="opacity-0 group-hover:opacity-100 transition-opacity
                   text-red-400 hover:text-red-300 text-xs mt-1 cursor-pointer"
        >
          <FontAwesomeIcon icon={faTrashCan} />
        </button>
      )}
    </div>
  );
};

export default HeroBlock;
