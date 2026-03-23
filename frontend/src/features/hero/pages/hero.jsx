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

  const [copyEmail, setCopyEmail] = useState(false);
  // turn back to false after triggered to true
  useEffect(() => {
    if (copyEmail) {
      const timer = setTimeout(() => {
        setCopyEmail(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [copyEmail]);

  return (
    <div className="flex w-full md:flex-row md:gap-0 gap-10 flex-col-reverse justify-between items-center">
      <Motion
        direction="left"
        duration={1}
        className="flex flex-col gap-8 md:w-6/12 w-12/12"
      >
        <p className="text-sm text-[#88888b] tracking-widest">
          FREELANCE / FULL-TIME · RIZAL, PH
        </p>
        <h1 className="md:text-5xl text-3xl">
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
        <div className="text-[#a7a9be] md:text-base text-sm">
          <TypeAnimation sequence={[Paragraph, 1000]} speed={99} />
        </div>
        <div className="flex flex-row md:gap-4 gap-2">
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 1 }}>
            <Button variant="primary" className="md:w-60 w-40">
              Download Resume
            </Button>
          </motion.button>
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 1 }}>
            <Button
              variant="outline"
              className="md:w-60 w-40"
              onClick={() => {
                navigator.clipboard.writeText("miranj8157@gmail.com"); // This doesnt work on mobile when on local
                setCopyEmail(true);
              }}
            >
              {!copyEmail ? (
                "Copy Email"
              ) : (
                <div className="flex flex-row items-center justify-center gap-4">
                  Copied{" "}
                  <ion-icon
                    name="checkmark-done-outline"
                    class="text-lg"
                  ></ion-icon>
                </div>
              )}
            </Button>
          </motion.button>
        </div>
      </Motion>
      <Motion direction="right" className="">
        <img
          src={Profile}
          className="h-60 w-60 md:w-90 md:h-90 rounded-full"
        ></img>
      </Motion>
    </div>
  );
};

export default Hero;
