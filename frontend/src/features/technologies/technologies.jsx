import technologyList from "./components/technologyList";
import Motion from "../utils/Motion";

const technologies = () => {
  return (
    <div className="">
      <Motion direction="top" className="text-2xl text-center">
        TECHNOLOGIES
      </Motion>
      <div className="mt-10 flex flex-row justify-around items-start">
        <ul className="flex flex-col gap-2">
          <h1 className=" mb-2 text-[#a7a9be]">BACKEND</h1>
          {technologyList.backend.map((item, index) => (
            <Motion delay={index * 0.03}>
              <li className="text-sm" key={index}>
                {item}
              </li>
            </Motion>
          ))}
        </ul>
        <ul className="flex flex-col gap-2">
          <h1 className="mb-2 text-[#a7a9be]">FRONTEND</h1>
          {technologyList.frontend.map((item, index) => (
            <Motion delay={index * 0.03}>
              <li className="text-sm" key={index}>
                {item}
              </li>
            </Motion>
          ))}
        </ul>
        <ul className="flex flex-col gap-2">
          <h1 className="mb-2 text-[#a7a9be]">TOOLS</h1>
          {technologyList.tools.map((item, index) => (
            <Motion delay={index * 0.03}>
              <li className="text-sm" key={index}>
                {item}
              </li>
            </Motion>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default technologies;
