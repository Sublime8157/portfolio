import experienceList from "../components/experienceList.jsx";
import Motion from "../../utils/Motion.jsx";

const experiences = () => {
  return (
    <div>
      <Motion direction="top" className="mt-10 text-center text-2xl">
        EXPERIENCES
      </Motion>
      <ul className="md:p-10 pt-5 flex md:flex-row flex-col justify-between gap-8 items-center">
        {experienceList.map((exp, index) => (
          <Motion
            direction="bottom"
            key={index}
            className="flex gap-4 flex-col"
          >
            <div className="gap-2 items-center flex-row flex">
              <img src={exp.logo} width={40}></img>
              <div className="flex flex-col">
                <h6 className="md:text-base text-xs">
                  {exp.name} - {exp.role}
                </h6>
                <h6 className="text-[#a7a9be] md:text-base text-xs" style={{ fontStyle: "italic" }}>
                  {exp.tenure}
                </h6>
              </div>
            </div>
            <div>
              <div className="md:text-sm text-xs text-[#a7a9be] whitespace-pre-line">
                {exp.paragraph.split("\n").map((line, index) => (
                  line.trim() !== '' && (
                    <div className="mb-2 flex gap-4 items-start">
                      <div className="z-10 text-xs mt-1"><ion-icon name="send-outline"></ion-icon></div>
                      <p>{line}</p>
                    </div>
                  )
                ))}
              </div>
            </div>
          </Motion>
        ))}
      </ul>
    </div>
  );
};

export default experiences;
