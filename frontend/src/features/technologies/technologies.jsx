import technologyList, { icons } from "./components/technologyList";
import Motion from "../utils/Motion";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const technologies = () => {
  return (
    <div className="">
      <Motion direction="top" className="text-lg lg:text-2xl text-center">
        TECHNOLOGIES
      </Motion>
      <div className="mt-10 flex flex-col flex-wrap lg:justify-around gap-8 items-start">
        {technologyList.map((item, index) => (
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 1 }}
            key={index}
            className="justify-start w-full items-start flex flex-col gap-2 shadow-md shadow-gray-700 rounded p-4"
          >
            <div className="w-full self-start">
              <h1 className="text-left mb-2 text-[#a7a9be] flex flex-row gap-2 items-center">
                <FontAwesomeIcon icon={icons[item.tech]} className="text-[#ff8906]" />
                {item.tech.toUpperCase()}
              </h1>
              <hr className="text-gray-800"></hr>
            </div>
            <Motion delay={index * 0.03}>
              <li className="text-sm flex-wrap flex flex-row gap-2">
                {item.lists.map((list, index) => {
                  return (
                    <div key={index} className="text-gray-500 hoverTech lg:text-base text-sm border p-1 px-2 rounded-full">
                      {list}
                    </div>
                  );
                })}
              </li>
            </Motion>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default technologies;
