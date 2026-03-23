import trainingList from "./trainingList";
import Motion from "../../utils/Motion";

const trainings = () => {
  return (
    <div className="flex flex-col">
      <Motion direction="top" className="text-center text-2xl">
        TRAININGS
      </Motion>
      <div className="flex flex-col gap-8 md:p-10 pt-5">
        {trainingList.map((training, index) => (
          <Motion direction="bottom" delay={index * 0.03}>
            <div key={index} className="flex flex-col gap-2">
              <div>
                <h6 className="md:text-base text-xs">{training.title}</h6>
                <h6 className="text-[#a7a9be] md:text-base text-xs" style={{ fontStyle: "italic" }}>
                  {training.duration}
                </h6>
              </div>
              <p className="text-[#a7a9be] md:text-base text-xs">{training.paragraph}</p>
            </div>
          </Motion>
        ))}
      </div>
    </div>
  );
};

export default trainings;
