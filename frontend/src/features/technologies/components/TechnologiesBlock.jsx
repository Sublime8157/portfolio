import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faS } from "@fortawesome/free-solid-svg-icons";
import Editor from "../../../components/tiptap/Editor";
import { faGripVertical, faTrash } from "@fortawesome/free-solid-svg-icons";
import resolveIcon from "../../../hooks/resolveIcon";
import Motion from "../../utils/Motion";

library.add(faS);

const TechnologiesBlock = ({
  card,
  isEditing,
  onDelete,
  onUpdate,
  onAddTag,
  onRemoveTag,
  onUpdateTag,
}) => {
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
      <Motion className="justify-start w-full items-start flex flex-col gap-2 shadow-md shadow-gray-700 rounded p-4">
        <div className="w-full self-start">
          <h1 className="text-left mb-2 text-[#a7a9be] flex flex-row gap-2 items-center">
            <FontAwesomeIcon icon={icon} className="text-[#ff8906]" />
            {isEditing ? (
              <div className="flex flex-col gap-1 w-full">
                <Editor
                  content={card.title.toUpperCase()}
                  onUpdate={(html) => onUpdate(card.id, "title", html)}
                ></Editor>
                <input
                  placeholder="Icon name e.g. faCode"
                  onChange={(e) =>
                    onUpdate(card.id, "iconName", e.target.value)
                  }
                  value={card.iconName}
                  className="bg-transparent border-b border-gray-600 text-gray-500 
                           text-xs outline-none w-full"
                ></input>
              </div>
            ) : (
              <div
                className="text-sm"
                dangerouslySetInnerHTML={{ __html: card.title.toUpperCase() }}
              />
            )}
          </h1>
          <hr className="text-gray-800"></hr>
        </div>
        <Motion>
          <li className="text-sm flex-wrap flex flex-row gap-2">
            {card.list.map((list, index) => (
              <Motion
                key={index}
                className={`text-gray-500 lg:text-base text-sm border p-1 px-2 rounded-full ${isEditing ? "" : "hoverTech"}`}
              >
                {isEditing ? (
                  <>
                    {" "}
                    <input
                      value={list}
                      onChange={(e) =>
                        onUpdateTag(card.id, index, e.target.value)
                      }
                      className="bg-transparent outline-none text-gray-400 text-sm w-20"
                    />
                    <button
                      onClick={() => onRemoveTag(card.id, index)}
                      className="cursor-pointer text-red-400 hover:text-red-300 text-xs leading-none
                    "
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </>
                ) : (
                  list
                )}
              </Motion>
            ))}
            {isEditing && (
              <button
                onClick={() => onAddTag(card.id)}
                className="text-gray-500 w-20 hoverTech lg:text-base text-sm border p-1 px-2 rounded-full"
              >
                +
              </button>
            )}
          </li>
        </Motion>
      </Motion>
    </div>
  );
};

export default TechnologiesBlock;
