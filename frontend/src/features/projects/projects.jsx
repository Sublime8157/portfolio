import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useState } from "react";
import { useProjectBlocks } from "./hooks/useProjectBlock.js";
import ProjectBlock from "./components/ProjectBlock.jsx";
import Motion from "../utils/Motion.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faSave } from "@fortawesome/free-regular-svg-icons";

const Projects = () => {
  const {
    projects,
    isEditing,
    startEditing,
    stopEditing,
    addProject,
    deleteProject,
    updateProject,
    addImage,
    removeImage,
    addTag,
    removeTag,
    updateTag,
    reorderProjects,
  } = useProjectBlocks();

  const [isHovered, setIsHovered] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const sensors = useSensors(useSensor(PointerSensor));

  const handleOpen = (project) => {
    setSelectedProject(project);
    setCurrentIndex(0);
  };

  const handleClose = () => setSelectedProject(null);

  const handlePrev = () =>
    setCurrentIndex((prev) =>
      prev === 0 ? selectedProject.images.length - 1 : prev - 1,
    );

  const handleNext = () =>
    setCurrentIndex((prev) =>
      prev === selectedProject.images.length - 1 ? 0 : prev + 1,
    );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      reorderProjects(active.id, over.id);
    }
  };

  return (
    <div>
      <Motion direction="top" className="mb-12 text-lg lg:text-2xl text-center">
        MOST RECENT PROJECT{projects.length > 1 ? "S" : ""}
      </Motion>

      <div
        className="relative py-10"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Edit / Save button */}
        {(isHovered || isEditing) && (
          <button
            onClick={isEditing ? stopEditing : startEditing}
            className="absolute -top-2 right-0 z-10 text-xs px-2 py-1 
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
            items={projects.map((p) => p.id)}
            strategy={verticalListSortingStrategy}
          >
            {projects.map((project) => (
              <ProjectBlock
                key={project.id}
                project={project}
                isEditing={isEditing}
                onDelete={deleteProject}
                onUpdate={updateProject}
                onAddImage={addImage}
                onRemoveImage={removeImage}
                onAddTag={addTag}
                onRemoveTag={removeTag}
                onUpdateTag={updateTag}
                onOpen={handleOpen}
              />
            ))}
          </SortableContext>
        </DndContext>

        {/* Add project — edit mode only */}
        {isEditing && (
          <div className="h-full w-full flex self-center mt-8">
            <button
              onClick={addProject}
              className="h-20 w-full cursor-pointer text-gray-500 border 
                         border-dashed border-gray-600 rounded hover:text-gray-300 
                         hover:border-gray-400 transition-colors text-3xl"
            >
              +
            </button>
          </div>
        )}
      </div>

      {/* Modal — unchanged from your original */}
      {selectedProject && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
          onClick={handleClose}
        >
          <div
            className="relative rounded-xl p-4 max-w-2xl w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute cursor-pointer -top-3.75 right-3 text-gray-500 
                         hover:text-white text-xl z-10"
              onClick={handleClose}
            >
              ✕
            </button>
            <img
              src={selectedProject.images[currentIndex]}
              className="w-full h-40 lg:h-80 object-cover rounded-lg"
            />
            <p className="text-center text-sm text-gray-500 mt-2">
              {currentIndex + 1} / {selectedProject.images.length}
            </p>
            <div className="flex justify-between mt-3">
              <button
                className="px-4 py-2 hover:opacity-50 cursor-pointer rounded-lg text-sm"
                onClick={handlePrev}
              >
                ← Prev
              </button>
              <button
                className="px-4 py-2 hover:opacity-50 cursor-pointer rounded-lg text-sm"
                onClick={handleNext}
              >
                Next →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;
