import ProjectList from "./components/projectList";
import Motion from "../utils/Motion";
import { useState } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationArrow } from "@fortawesome/free-solid-svg-icons";

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null); // holds the clicked list
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleOpen = (list) => {
    setSelectedProject(list);
    setCurrentIndex(0); // reset to first image each time
  };

  const handleClose = () => {
    setSelectedProject(null);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? selectedProject.images.length - 1 : prev - 1,
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev === selectedProject.images.length - 1 ? 0 : prev + 1,
    );
  };

  const handleLinkClick = () => {
    window.open('https://github.com/Sublime8157/asTee-defended-.git', '_blank')
  }
  
  return (
    <div>
      <Motion direction="top" className="text-2xl text-center">
        PROJECTS
      </Motion>

      {ProjectList.map((list, index) => (
        <Motion key={index} className="md:p-10 pt-5 flex flex-col md:flex-row gap-4">
          <div className="flex flex-col gap-4">
            <h6 className="md:text-base text-xs">
              {list.name} - {list.role}
            </h6>
            <p className="md:text-base text-xs text-[#a7a9be] whitespace-pre-line">
              {list.paragraph}
            </p>
            <ul className="flex flex-row gap-4">
              {list.technologies.map((tech, i) => (
                <li key={i} className="md:text-base text-xs">
                  {tech}
                </li>
              ))}
            </ul>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 1 }}
              className="cursor-pointer w-32 px-2 py-2 justify-between border text-gray-600 border-gray-700 flex flex-row gap-2 items-center"
              onClick={handleLinkClick}
            >
              <p className="">Repository</p>
              <FontAwesomeIcon icon={faLocationArrow} />
            </motion.button>
          </div>

          {/* Image Stack */} 
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 1 }}
            className=" relative md:w-50 h-40 w-80  cursor-pointer shrink-0"
            onClick={() => handleOpen(list)}
          >
            {list.images.map((image, i) => (
              <img
                key={i}
                src={image}
                className="absolute md:w-40 h-40 object-cover rounded-lg shadow-md"
                style={{
                  top: i * 6,
                  left: i * 6,
                  zIndex: list.images.length - i,
                }}
              />
            ))}
          </motion.button>
        </Motion>
      ))}

      {/* Modal — outside the map, uses selectedProject */}
      {selectedProject && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
          onClick={handleClose}
        >
          <div
            className="relative  rounded-xl p-4 max-w-2xl w-12/12 mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute cursor-pointer -top-3.75 right-3 text-gray-500 hover:text-black text-xl z-10"
              onClick={handleClose}
            >
              ✕
            </button>

            <img
              src={selectedProject.images[currentIndex]}
              className="w-full h-40 md:h-80 object-cover rounded-lg"
            />

            <p className="text-center text-sm text-gray-500 mt-2">
              {currentIndex + 1} / {selectedProject.images.length}
            </p>

            <div className="flex justify-between mt-3">
              <button
                className="px-4 py-2 hover:opacity-50 cursor-pointer rounded-lg text-sm font-medium"
                onClick={handlePrev}
              >
                ← Prev
              </button>
              <button
                className="px-4 py-2 hover:opacity-50 cursor-pointer rounded-lg text-sm font-medium"
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
