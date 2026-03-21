import technologyList from "./components/technologyList";
const technologies = () => {
  return (
    <div className="flex w-full flex-col">
      <h1 className="text-2xl text-center">TECHNOLOGIES</h1>
      <div className="mt-10 flex flex-row justify-around items-start">
        <ul className="flex flex-col gap-2">
          <h1 className=" mb-2 text-[#a7a9be]">BACKEND</h1>
          {technologyList.backend.map((item, index) => (
            <li className="text-sm" key={index}>{item}</li>
          ))}
        </ul>
        <ul className="flex flex-col gap-2">
          <h1 className="mb-2 text-[#a7a9be]">FRONTEND</h1>
          {technologyList.frontend.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
        <ul className="flex flex-col gap-2">
          <h1 className="mb-2 text-[#a7a9be]">TOOLS</h1>
          {technologyList.tools.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default technologies;
