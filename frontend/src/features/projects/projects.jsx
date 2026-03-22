import ProjectList from "./components/projectList";
import Motion from "../utils/Motion";

const projects = () => {
  return (
    <div>
      <Motion direction="top" className="text-2xl text-center">
        PROJECTS
      </Motion>
      {ProjectList.map((list, index) => (
        <Motion
          direction="left"
          key={index}
          className="p-10 flex flex-col gap-4"
        >
          <h6>
            {list.name} - {list.role}
          </h6>
          <p className="text-[#a7a9be] whitespace-pre-line">{list.paragraph}</p>
          <div className="flex flex-row gap-4">
            <h1>Technologies:</h1>
            <ul className="flex flex-row gap-4">
              {list.technologies.map((tech, index) => (
                <li key={index}>{tech}</li>
              ))}
            </ul>
          </div>
        </Motion>
      ))}
    </div>
  );
};

export default projects;
