import ProjectList from "./components/projectList";
import Motion from "../utils/Motion";
import { useState } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationArrow,
  faCircle,
  faArrowDown,
} from "@fortawesome/free-solid-svg-icons";

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
    window.open("https://github.com/Sublime8157/asTee-defended-.git", "_blank");
  };

  return (
    <div>
      <Motion direction="top" className="mb-4 text-lg lg:text-2xl text-center">
       MOST RECENT PROJECT{ProjectList.length > 1 ? "S" : ""}
      </Motion>
      {ProjectList.map((list, index) => (
        <Motion
          key={index}
          className="lg:shadow-none shadow-md shadow-gray-600 p-5 lg:p-10 pt-5 flex items-start lg:flex-row flex-col lg:gap-20"
        >
          {/* Image Stack */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 1 }}
            className="relative lg:w-80 lg:m-0 ml-3 h-32 w-full lg:mb-0 mb-10 cursor-pointer shrink-0"
            onClick={() => handleOpen(list)}
          >
            {list.images.map((image, i) => (
              <img
                key={i}
                src={image}
                className="absolute lg:w-full w-64 h-32 object-cover rounded-lg shadow-md"
                style={{
                  top: i * 6,
                  left: i * 6,
                  zIndex: list.images.length - i,
                }}
              />
            ))}
          </motion.button>
          <hr className="lg:hidden block w-full text-gray-600 mb-8"></hr>
          <div className="flex flex-col gap-4 shadow-md">
            <h6 className="lg:text-base items-center flex flex-row  gap-2 text-sm">
              <div>
                {list.name} - {list.role}
              </div>
            </h6>
            <p className="lg:text-base text-sm text-[#a7a9be] whitespace-pre-line">
              {list.paragraph.split("\n").map(
                (line, i) =>
                  line.trim() !== "" && (
                    <div key={i} className="mb-2 flex gap-4 items-start">
                      <div className="z-10 text-sm lg:text-base flex flex-row items-start gap-2">
                        <FontAwesomeIcon
                          icon={faCircle}
                          className="text-[8px] mt-2 text-[#ff8906]"
                        />
                        <p>{line}</p>
                      </div>
                    </div>
                  ),
              )}
            </p>
            <ul className="flex flex-wrap flex-row gap-4">
              {list.technologies.map((tech, i) => (
                <li key={i} className="lg:text-base text-sm">
                  <div className="flex-wrap px-2 text-sm rounded-full border border-gray-600 text-gray-600">
                    <span>{tech}</span>
                  </div>
                </li>
              ))}
            </ul>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 1 }}
              className=" cursor-pointer w-28 px-2 border border-gray-500 justify-between  text-gray-500 rounded-full p-2 flex flex-row items-center"
              onClick={handleLinkClick}
              style={{ transitionDuration: "150ms" }}
            >
              <p>Repository</p>
              <FontAwesomeIcon icon={faArrowDown} className="-rotate-130" />
            </motion.button>
          </div>
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
              className="w-full h-40 lg:h-80 object-cover rounded-lg"
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
