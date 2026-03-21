import Profile from "../../../assets/ProfileImage.png";
import { TypeAnimation } from "react-type-animation";
import Paragraph from "../components/paragraph.jsx";
import Button from "../../utils/Button.jsx";
import Motion from "../../utils/Motion.jsx";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const Hero = () => {
  const [revealRole, setRevealRole] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setRevealRole(true);
    }, 5000);

    return () => clearTimeout(timeout); // cleanup
  }, []);

  return (
    <div className="flex w-full justify-between items-center">
      <Motion
        direction="left"
        duration={1}
        className="flex flex-col gap-8 w-6/12"
      >
        <h1 className="text-5xl">
          {!revealRole ? (
            "Software Developer"
          ) : (
            <TypeAnimation
              sequence={[
                "Software Developer",
                1000,
                "Software Engineer",
                1000,
                "Web Developer",
                1000,
              ]}
              speed={50}
              repeat={Infinity}
            />
          )}
        </h1>
        <div className="text-[#a7a9be]">
          <TypeAnimation sequence={[Paragraph, 1000]} speed={99} />
        </div>
        <div>
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 1 }}>
            <Button variant="primary" classname="w-60">
              Download Resume
            </Button>
          </motion.button>
        </div>
      </Motion>
      <Motion direction="right">
        <img src={Profile} className="h-90 w-90 rounded-full"></img>
      </Motion>
    </div>
  );
};

export default Hero;
