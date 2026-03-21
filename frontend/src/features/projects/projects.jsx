import ProjectList from "./components/projectList";

const projects = () => {
  return (
    <div>
      <h1 className="text-4xl text-center">Projects</h1>
      {ProjectList.map((list, index) => (
        <div key={index} className="py-10 flex flex-col gap-4">
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
        </div>
      ))}
    </div>
  );
};

export default projects;
