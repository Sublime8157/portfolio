import aboutList from "./components/aboutList";
import Motion from "../utils/Motion";

const about = () => {
  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-lg lg:text-2  xl text-center">ABOUT</h1>
      <div className="p-0 lg:p-10 flex flex-col lg:flex-row lg:gap-0 gap-10 justify-between items-start">
        {aboutList.map((paragraph, index) => (
          <Motion
            direction={index % 2 === 0 ? "left" : "right"}
            key={index}
            className="flex w-full lg:w-5/12 lg:text-base text-sm flex-row justify-start items-start gap-4 text-[#a7a9be]"
          >
            <div>
              <ion-icon name="send-outline"></ion-icon>
            </div>
            {paragraph}
          </Motion>
        ))}
      </div>
    </div>
  );
};

export default about;
