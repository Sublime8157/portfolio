import aboutList from "./components/aboutList";
import Motion from "../utils/Motion";

const about = () => {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl lg:text-4xl text-center">About</h1>
      <div className="p-0 lg:p-10 flex flex-col lg:flex-row lg:gap-0 gap-20 justify-between items-start">
        {aboutList.map((paragraph, index) => (
          <Motion direction={index % 2 === 0 ? "left" : "right"}
            key={index}
            className="flex w-full lg:w-5/12 lg:text-base text-sm flex-row justify-start items-start gap-8 text-[#a7a9be]"
          >
              <div><ion-icon name="send-outline"></ion-icon></div>
              {paragraph}
          </Motion>
        ))}
      </div>
    </div>
  );
};

export default about;
