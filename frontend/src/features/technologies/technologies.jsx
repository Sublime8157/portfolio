import technologyList from "./components/technologyList";
const technologies = () => {
  return (
    <div className="flex w-full flex-col">
      <h1 className="text-4xl text-center">Technologies</h1>
      <div className="mt-10 flex flex-row justify-around items-start">
        <ul className="flex flex-col gap-2">
          <h1 className="text-xl mb-2 text-[#a7a9be]">Backend</h1>
          {technologyList.backend.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
        <ul className="flex flex-col gap-2">
          <h1 className="text-xl mb-2 text-[#a7a9be]">Frontend</h1>
          {technologyList.frontend.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
        <ul className="flex flex-col gap-2">
          <h1 className="text-xl mb-2 text-[#a7a9be]">Tools</h1>
          {technologyList.tools.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default technologies;
