import trainingList from "./trainingList";
import Motion from "../../utils/Motion";

const trainings = () => {
  return (
    <div className="flex flex-col">
      <Motion direction="top" className="text-center text-lg md:text-2xl">
        TRAININGS
      </Motion>
      <div className="flex flex-col gap-8 lg:p-10 pt-5">
        {trainingList.map((training, index) => (
          <Motion key={index} direction="bottom" delay={index * 0.03}>
            <div className="flex flex-col gap-2">
              <div>
                <h6 className="lg:text-base text-sm">{training.title}</h6>
                <h6
                  className="text-[#a7a9be] lg:text-base text-sm"
                  style={{ fontStyle: "italic" }}
                >
                  {training.duration}
                </h6>
              </div>
              <p className="text-[#a7a9be] lg:text-base text-sm">
                {training.paragraph}
              </p>
            </div>
          </Motion>
        ))}
      </div>
    </div>
  );
};

export default trainings;
