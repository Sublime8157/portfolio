import trainingList from "./trainingList";
import Motion from "../../utils/Motion";
import { motion } from "framer-motion";

const trainings = () => {
  return (
    <div className="flex flex-col">
      <Motion direction="top" className="text-center text-lg md:text-2xl">
        TRAININGS
      </Motion>
      <div className="flex flex-col gap-8 lg:p-10 pt-5">
        {trainingList.map((training, index) => (
          <Motion key={index} direction="bottom" delay={index * 0.03}>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 1 }}
              className="text-left w-full flex flex-col gap-4 shadow-md shadow-gray-600 p-5"
            >
              <div>
                <h6 className="lg:text-base text-sm">{training.title}</h6>
                <h6
                  className="text-[#a7a9be] lg:text-base text-sm"
                  style={{ fontStyle: "italic" }}
                >
                  {training.duration}
                </h6>
              </div>
              <p className="text-[#a7a9be] text-sm">{training.paragraph}</p>
              <div className="text-gray-600  flex-wrap flex flex-row gap-2 items-center">
                {training.techs.map((tech, index) => {
                  return (
                    <div className="border rounded-full px-2 border-gray-600 ">
                      {tech}
                    </div>
                  );
                })}
              </div>
            </motion.button>
          </Motion>
        ))}
      </div>
    </div>
  );
};

export default trainings;
