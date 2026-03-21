import trainingList from "./trainingList";

const trainings = () => {
  return (
    <div className="flex flex-col">
      <div className="text-center text-4xl">Trainings</div>

      <div className="flex flex-col gap-8 p-10">
        {trainingList.map((training, index) => (
          <div key={index} className="flex flex-col gap-2">
            <div>
              <h6>{training.title}</h6>
              <h6 className="text-[#a7a9be]" style={{ fontStyle: "italic" }}>
                {training.duration}
              </h6>
            </div>
            <p className="text-[#a7a9be]">{training.paragraph}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default trainings;
