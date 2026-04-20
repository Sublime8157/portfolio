import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { faPenToSquare, faSave } from "@fortawesome/free-regular-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Editor from "../tiptap/Editor.jsx";
import SectionColorPicker from "../SectionColorPicker.jsx";

const RowBlock = ({
  row,
  isEditing,
  onEdit,
  onSave,
  onDelete,
  onUpdateBgColor,
  onAddColumn,
  onDeleteColumn,
  onAddBlock,
  onDeleteBlock,
  onUpdateBlock,
  onUpdateImage,
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: row.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  // Column width based on count
  const colClass =
    row.columns.length === 1
      ? "w-full"
      : row.columns.length === 2
        ? "w-full lg:w-1/2"
        : "w-full lg:w-1/3";

  return (
    <div
      ref={setNodeRef}
      style={{ ...style, backgroundColor: row.bgColor }}
      className="relative group transition-colors duration-300 p-4 lg:px-20 px-10 py-6"
    >
      {/* Row Controls — visible on hover or edit */}
      <div
        className={`absolute -top-4 px-20 right-0 flex items-center gap-2 
                   transition-opacity duration-150 w-full justify-between
                   ${isEditing ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
      >
        {/* Drag handle */}
        <button
          {...attributes}
          {...listeners}
          className="cursor-grab text-text-paragraph hover:text-text-headline 
                     text-xs select-none touch-none"
        >
          ⠿
        </button>
        <div>
          {/* Edit / Save */}
          <button
            onClick={isEditing ? onSave : onEdit}
            className="text-xs px-2 py-1 rounded border border-stroke 
                     text-text-paragraph hover:text-text-headline 
                     hover:border-text-headline bg-transparent cursor-pointer"
          >
            <FontAwesomeIcon icon={isEditing ? faSave : faPenToSquare} />
          </button>

          {/* Delete row */}
          <button
            onClick={() => onDelete(row.id)}
            className="text-xs px-2 py-1 rounded border border-stroke
                     text-red-400 hover:text-red-300 cursor-pointer"
          >
            <FontAwesomeIcon icon={faTrashCan} />
          </button>
        </div>
      </div>

      <div className="w-full items-center flex flex-row gap-4">
        {/* Columns */}
        <div className="flex w-12/12 flex-col lg:flex-row gap-4">
          {row.columns.map((column) => (
            <div
              key={column.id}
              className={`${colClass} flex flex-col gap-3 
                       ${isEditing ? "border border-dashed border-stroke rounded p-3" : ""}`}
            >
              {/* Blocks inside column */}
              {column.blocks.map((block) => (
                <div key={block.id} className="relative group/block">
                  {/* TEXT BLOCK */}
                  {block.type === "text" &&
                    (isEditing ? (
                      <Editor
                        content={block.content}
                        onUpdate={(html) =>
                          onUpdateBlock(row.id, column.id, block.id, {
                            content: html,
                          })
                        }
                      />
                    ) : (
                      <div
                        dangerouslySetInnerHTML={{ __html: block.content }}
                      />
                    ))}

                  {/* IMAGE BLOCK */}
                  {block.type === "image" && (
                    <div className="relative">
                      {block.src ? (
                        <img
                          src={block.src}
                          alt={block.alt}
                          className="w-full object-cover rounded"
                        />
                      ) : (
                        isEditing && (
                          <div
                            className="w-full h-32 border border-dashed border-stroke 
                                       rounded flex items-center justify-center 
                                       text-text-paragraph text-xs"
                          >
                            No image yet
                          </div>
                        )
                      )}
                      {isEditing && (
                        <label
                          className="absolute inset-0 flex items-center justify-center
                                       bg-black/40 opacity-0 group-hover/block:opacity-100
                                       transition-opacity cursor-pointer rounded"
                        >
                          <span className="text-white text-xs">
                            Click to upload
                          </span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files[0];
                              if (file)
                                onUpdateImage(
                                  row.id,
                                  column.id,
                                  block.id,
                                  file,
                                );
                            }}
                          />
                        </label>
                      )}
                    </div>
                  )}

                  {/* BUTTON BLOCK */}
                  {block.type === "button" &&
                    (isEditing ? (
                      <div className="flex flex-col gap-1">
                        <input
                          value={block.label}
                          onChange={(e) =>
                            onUpdateBlock(row.id, column.id, block.id, {
                              label: e.target.value,
                            })
                          }
                          className="bg-transparent border-b border-stroke 
                                   text-text-headline text-sm outline-none"
                          placeholder="Button label"
                        />
                        <input
                          value={block.url}
                          onChange={(e) =>
                            onUpdateBlock(row.id, column.id, block.id, {
                              url: e.target.value,
                            })
                          }
                          className="bg-transparent border-b border-stroke 
                                   text-text-paragraph text-xs outline-none"
                          placeholder="URL"
                        />
                        <button
                          className="mt-1 px-4 py-2 rounded bg-accent 
                                   text-accent-text text-sm w-fit cursor-pointer"
                        >
                          {block.label}
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => window.open(block.url, "_blank")}
                        className="px-4 py-2 rounded bg-accent text-accent-text 
                                 text-sm cursor-pointer hover:opacity-90 
                                 transition-opacity"
                      >
                        {block.label}
                      </button>
                    ))}

                  {/* Delete block — edit mode only */}
                  {isEditing && (
                    <button
                      onClick={() => onDeleteBlock(row.id, column.id, block.id)}
                      className="absolute -top-3 -right-3 w-5 h-5 rounded-full 
                               bg-red-400 text-white text-xs flex items-center 
                               justify-center opacity-0 group-hover/block:opacity-100
                               transition-opacity cursor-pointer"
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}

              {/* Add block controls — edit mode only */}
              {isEditing && (
                <div className="flex gap-1 mt-1">
                  {["text", "image", "button"].map((type) => (
                    <button
                      key={type}
                      onClick={() => onAddBlock(row.id, column.id, type)}
                      className="text-xs border border-dashed border-stroke 
                               rounded px-2 py-1 text-text-paragraph 
                               hover:text-text-headline hover:border-text-headline 
                               transition-colors cursor-pointer capitalize"
                    >
                      + {type}
                    </button>
                  ))}
                </div>
              )}

              {/* Delete column — edit mode, more than 1 column */}
              {isEditing && row.columns.length > 1 && (
                <button
                  onClick={() => onDeleteColumn(row.id, column.id)}
                  className="text-xs text-red-400 hover:text-red-300 
                           cursor-pointer flex items-center gap-1 mt-1"
                >
                  <FontAwesomeIcon icon={faTrashCan} /> Remove Column
                </button>
              )}
            </div>
          ))}
        </div>
        <div className="h-full">
          {isEditing && row.columns.length < 3 && (
            <button
              onClick={() => onAddColumn(row.id)}
              className="min-h-22 text-xs border border-dashed border-stroke rounded 
                         px-3 py-1 text-text-paragraph hover:text-text-headline 
                         hover:border-text-headline transition-colors cursor-pointer w-fit
                         flex items-center gap-1"
            >
              <FontAwesomeIcon icon={faPlus} />
            </button>
          )}
        </div>
        {/* Edit mode bottom controls */}
      </div>
      {isEditing && (
        <div className="flex flex-col justify-center items-center gap-3 mt-4 pt-3 border-t border-stroke">
          {/* Background color */}
          <SectionColorPicker
            currentColor={row.bgColor}
            onColorChange={(color) => onUpdateBgColor(row.id, color)}
          />

          {/* Add column — max 3 */}
        </div>
      )}
    </div>
  );
};

export default RowBlock;
