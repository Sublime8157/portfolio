import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { findIconDefinition, library } from "@fortawesome/fontawesome-svg-core";
import { faS } from "@fortawesome/free-solid-svg-icons";
import Editor from "../../../components/tiptap/Editor";
import Motion from "../../utils/Motion";
import { faGripVertical, faTrash } from "@fortawesome/free-solid-svg-icons";
import resolveIcon from "../../../hooks/resolveIcon";

library.add(faS);

const TechnologiesBLock = ({ card, onDelete, onUpdate, isEditing }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: card.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const icon = resolveIcon(card.iconName);

  return (
    <div ref={setNodeRef} style={style} className="relative group w-full">
      {/* drag button */}
      {isEditing && (
        <button
          {...attributes}
          {...listeners}
          className="absolute -top-5 left-0 text-gray-500 hover:text-gray-300 
                         cursor-grab text-xs select-none touch-none"
        >
          <FontAwesomeIcon icon={faGripVertical} />
        </button>
      )}
      {/* remove button */}
      {isEditing && (
        <button
          onClick={() => onDelete(card.id)}
          className="cursor-pointer absolute -top-5 right-0 text-red-400 
                     hover:text-red-300 text-xs"
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
      )}
    </div>
  );
};

export default TechnologiesBLock;
