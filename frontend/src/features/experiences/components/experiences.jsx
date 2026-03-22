import experienceList from "../components/experienceList.jsx";
import Motion from "../../utils/Motion.jsx";

const experiences = () => {
  return (
    <div>
      <Motion direction="top" className="mt-10 text-center text-2xl">
        EXPERIENCES
      </Motion>
      <ul className="p-10 flex flex-row justify-between gap-8 items-center">
        {experienceList.map((exp, index) => (
          <Motion
            direction="bottom"
            key={index}
            className="flex gap-4 flex-col"
          >
            <div className="gap-2 items-center flex-row flex">
              <img src={exp.logo} width={40}></img>
              <div className="flex flex-col">
                <h6>
                  {exp.name} - {exp.role}
                </h6>
                <h6 className="text-[#a7a9be]" style={{ fontStyle: "italic" }}>
                  {exp.tenure}
                </h6>
              </div>
            </div>
            <div>
              <div className="text-sm text-[#a7a9be] whitespace-pre-line">
                {exp.paragraph}
              </div>
            </div>
          </Motion>
        ))}
      </ul>
    </div>
  );
};

export default experiences;
