import experienceList from "../components/experienceList.jsx";
import Motion from "../../utils/Motion.jsx";
import Button from "../../utils/Button.jsx";
import { useState, useCallback } from "react";
import useBreakPoints from "../../../hooks/useBreakPoint.js";
import Hr from "../../utils/Hr.jsx";

const Experiences = () => {
  const isLg = useBreakPoints(1024);
  const [revealedIndices, setRevealedIndices] = useState(() => new Set());

  // this function add / removing item on Set() 
  const toggleReveal = useCallback((index) => {
    setRevealedIndices((prev) => {
      const next = new Set(prev);
      if (next.has(index)) { // toggle the adding and removing on set
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  }, []);

  const isRevealed = (index) => isLg || revealedIndices.has(index);

  return (
    <div className="flex flex-col gap-10">
      <Motion direction="top" className="mt-10 text-center text-lg md:text-2xl">
        EXPERIENCES
      </Motion>
      <ul className="pt-5 flex flex-col justify-between gap-20 items-center">
        {experienceList.map((exp, index) => (
          <Motion
            direction="bottom"
            key={index}
            className=" flex gap-4 flex-col"
          >
            <div className="flex flex-row justify-between items-center">
              <div className="gap-2 items-center flex flex-row">
                <img src={exp.logo} width={40}></img>
                <div className="flex flex-col">
                  <h6 className="lg:text-base text-sm">
                    {exp.name} - {exp.role}
                  </h6>
                  <h6
                    className="text-[#a7a9be] lg:text-base text-sm"
                    style={{ fontStyle: "italic" }}
                  >
                    {exp.tenure}
                  </h6>
                </div>
              </div>
              {!isLg && (
                <Button variant="plain" onClick={() => toggleReveal(index)}>
                  <ion-icon
                    name={isRevealed(index) ? "remove-outline" : "add-outline"}
                    class="text-2xl"
                  ></ion-icon>
                </Button>
              )}
            </div>
            <div
              style={{
                maxHeight: isRevealed(index) ? "500px" : "0px",
                opacity: isRevealed(index) ? 1 : 0,
                overflow: "hidden",
                transition: "max-height 0.8s ease, opacity 0.5s ease",
              }}
            >
              <div className="text-sm text-[#a7a9be] whitespace-pre-line">
                {exp.paragraph.split("\n").map(
                  (line, i) =>
                    line.trim() !== "" && (
                      <div key={i} className="mb-2 flex gap-4 items-start">
                        <div className="z-10 text-xs mt-1">
                          <ion-icon name="send-outline"></ion-icon>
                        </div>
                        <p>{line}</p>
                      </div>
                    ),
                )}
              </div>
            </div>
            <Hr></Hr>
          </Motion>
        ))}
      </ul>
    </div>
  );
};

export default Experiences;
