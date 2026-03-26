import aboutList from "./components/aboutList";
import Motion from "../utils/Motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const about = () => {
  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-lg lg:text-2  xl text-center">ABOUT</h1>
      <div className="p-0 lg:p-10 flex flex-col lg:flex-row gap-10 justify-between items-start">
        {aboutList.map((list, index) => (
          <Motion
            key={index}
            className="  transition-all ease-in-out
  hover:scale-105 p-4 flex w-full lg:w-5/12 lg:text-base text-sm flex-col shadow-md shadow-gray-600 border-gray-600 justify-start items-start gap-4 text-[#a7a9be]"
          >
            <div className="flex flex-row items-center gap-2">
              <FontAwesomeIcon icon={list.icon} />
              <h6>{list.about}</h6>
            </div>
            <hr className="w-full text-gray-600"></hr>
            <p className="text-sm">{list.paragraph}</p>
          </Motion>
        ))}
      </div>
    </div>
  );
};

export default about;
