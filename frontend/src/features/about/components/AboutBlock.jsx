import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { findIconDefinition, library } from "@fortawesome/fontawesome-svg-core";
import { faS } from "@fortawesome/free-solid-svg-icons";
import Editor from "../../../components/tiptap/Editor.jsx";
import Motion from "../../utils/Motion.jsx";
import { faGripVertical } from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import resolveIcon from "../../../hooks/resolveIcon.js";

library.add(faS);

const AboutBlock = ({ card, onDelete, onUpdate, isEditing }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: card.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const icon = resolveIcon(card.iconName);

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="relative group w-full lg:w-5/12"
    >
      {isEditing && (
        <button
          {...attributes}
          {...listeners}
          className="absolute -top-5 left-0 text-text-paragraph hover:text-gray-300 
                     cursor-grab text-xs select-none touch-none"
        >
          <FontAwesomeIcon icon={faGripVertical} /> Drag
        </button>
      )}

      {isEditing && (
        <button
          onClick={() => onDelete(card.id)}
          className="cursor-pointer absolute -top-5 right-0 text-icon-color
                     hover:text-red-300 text-xs"
        >
          <FontAwesomeIcon icon={faTrashCan} /> Remove
        </button>
      )}

      <Motion
        className="transition-all ease-in-out hover:scale-105 p-4 flex 
                   w-full lg:text-base text-sm flex-col shadow-md 
                   shadow-shadow-color border-gray-600 justify-start 
                   items-start gap-4 text-[#a7a9be]"
      >
        <div className="flex flex-row items-center gap-2 w-full">
          {icon && <FontAwesomeIcon icon={icon} className="text-highlight" />}

          {isEditing ? (
            <div className="flex flex-col gap-1 w-full">
              {/* Title input */}
              <input
                value={card.about}
                onChange={(e) => onUpdate(card.id, "about", e.target.value)}
                className="bg-transparent border-b border-gray-600 text-text-headline
                           text-sm outline-none w-full"
                placeholder="Card title"
              />
              {/* Icon name input */}
              <input
                value={card.iconName}
                onChange={(e) => onUpdate(card.id, "iconName", e.target.value)}
                className="bg-transparent border-b border-gray-600 text-text-paragraph
                           text-xs outline-none w-full"
                placeholder="Icon name e.g. faLaptopCode"
              />
            </div>
          ) : (
            <h6 className="text-text-headline">{card.about}</h6>
          )}
        </div>

        <hr className="w-full text-gray-600" />

        {isEditing ? (
          <Editor
            content={card.paragraph}
            onUpdate={(html) => onUpdate(card.id, "paragraph", html)}
            className="max-w-72 text-text-paragraph"
          />
        ) : (
          <div
            className="text-sm text-text-paragraph"
            dangerouslySetInnerHTML={{ __html: card.paragraph }}
          />
        )}
      </Motion>
    </div>
  );
};

export default AboutBlock;
