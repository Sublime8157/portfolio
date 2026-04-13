import { lenisInstance } from "../../App";
import sections, { sectionIcons } from "../navigation/components/sections.jsx";
import useBreakPoints from "../../hooks/useBreakPoint.js";
import Button from "../utils/Button.jsx";
import { useState, useEffect, useRef } from "react";

const nav = () => {
  const isLg = useBreakPoints(1024);
  const handleClick = (section) => {
    const id = section.toLowerCase().replaceAll(/\ /g, "");

    // lenis is a package that handles the smooth scrolling
    if (lenisInstance) {
      // Proceed to id (section)
      lenisInstance.scrollTo(`#${id}`, {
        duration: 2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    }
  };

  const [revealNav, setRevealNav] = useState(true);
  useEffect(() => {
    setRevealNav(isLg);
  }, [isLg]);

  const navRef = useRef(null);
  useEffect(() => {
    if (revealNav) return;
    const handleClickOutsude = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setRevealNav(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutsude);
    return () => document.removeEventListener("mousedown", handleClickOutsude);
  }, []);

  return (
    <div
      className={`w-42 lg:w-screen bg-bg-main/50 lg:bg-bg-main/90 z-40 backdrop-blur-md fixed -right-20 lg:right-0 text-[#fffffe] ${revealNav ? "translate-x-0" : "translate-x-20"}`}
      style={{ transitionDuration: "1000ms" }}
    >
      <nav
        className={`relative border-b p-6 0 px-10 lg:px-20 text-xs border-stroke w-4/12 lg:w-screen transition-all `}
      >
        <button
          ref={navRef}
          className="lg:hidden block hover:opacity-50 cursor-pointer absolute top-90 -left-2 -translate-x-1/2 translate-y-1/2"
          onClick={() => setRevealNav((prev) => !prev)}
        >
          <ion-icon
            name={revealNav ? "caret-back-outline" : "caret-forward-outline"}
            class="text-lg text-text-headline"
          ></ion-icon>
        </button>
        <div className="flex lg:flex-row flex-col items-center justify-between gap-8">
          <div className="text-text-paragraph">joven.dev</div>
          <ul className="flex flex-col lg:flex-row lg:h-auto h-screen items-right gap-10">
            {sections.map((section, index) => {
              const icon = sectionIcons[section];
              return (
                <li
                  className="cursor-pointer text-text-paragraph hover:text-[#a7a9be]"
                  onClick={() => handleClick(section)}
                  key={index}
                >
                  {isLg ? (
                    <div>{section}</div>
                  ) : (
                    <Button variant="plain" className="">
                      <ion-icon name={icon} class="text-lg"></ion-icon>
                    </Button>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default nav;
