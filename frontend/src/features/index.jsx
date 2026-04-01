import sections, { sectionMap } from "./navigation/components/sections.jsx";
import Hero from "./hero/pages/hero.jsx";
import Nav from "./navigation/nav.jsx";
import Toolbar from "../components/tiptap/toolbar.jsx";
import { useState } from "react";
import { faGear, faAnglesRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const index = () => {
  const today = new Date();
  const year = today.getFullYear();

  const [hideToolbar, setHideToolbar] = useState(false);

  return (
    <div className="overflow-hidden">
      <div>
        <Nav />
      </div>
      <div
        className={`flex flex-row items-center bottom-0 left-0 fixed ease-in-out transition-all ${!hideToolbar ? "-translate-x-[calc(100%-50px)]" : ""}`}
        style={{ transitionDuration: "500ms" }}
      >
        <Toolbar />
        <button
          className="text-white cursor-pointer flex flex-row gap-1 opacity-60 hover:opacity-100 transition-transform"
          onClick={() => setHideToolbar((prev) => !prev)}
        >
          <FontAwesomeIcon icon={faGear} />
          <FontAwesomeIcon icon={faAnglesRight} />
        </button>
      </div>
      <div className="text-white"></div>
      <div className="text-sm flex flex-col text-[#fffffe] lg:px-20 ">
        {/* Hero */}
        <div
          id="hero"
          className="lg:h-screen h-auto lg:py-0 py-20 flex flex-col"
        >
          <div className="px-10 lg:h-11/12 h-9/12 flex items-center">
            <Hero />
          </div>
        </div>
        {/* Sections */}
        {sections.map((section, index) => {
          const Component = sectionMap[section];
          return (
            <div
              key={index}
              id={section.toLowerCase()}
              className="lg:p-20 p-10"
            >
              <Component />
            </div>
          );
        })}
      </div>
      <div className="flex items-center text-xs px-2 justify-between border-t border-gray-700 p-2 w-screen text-[#535356]">
        <div>@ {year} JOVEN MIRAN</div>
        <div>BUILT IN REACT & NODEJS</div>
      </div>
    </div>
  );
};

export default index;
