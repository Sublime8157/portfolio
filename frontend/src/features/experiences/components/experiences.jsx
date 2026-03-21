import experienceList from "../components/experienceList.jsx";

const experiences = () => {
  return (
    <div>
      <h1 className="mt-10 text-center text-4xl">Experiences</h1>
      <ul className="p-10 flex flex-row justify-between gap-8 items-center">
        {experienceList.map((exp, index) => (
          <div key={index} className="flex gap-4 flex-col">
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
          </div>
        ))}
      </ul>
    </div>
  );
};

export default experiences;
