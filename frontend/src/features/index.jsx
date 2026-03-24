import Experiences from "./experiences/components/experiences.jsx";
import Trainings from "./trainings/components/trainings.jsx";
import Technologies from "./technologies/technologies.jsx";
import Projects from "./projects/projects.jsx";
import Contacts from "./contact/contacts.jsx";
import Hero from "./hero/pages/hero.jsx";
import Nav from "./navigation/nav.jsx";
import About from "./about/about.jsx";

const index = () => {
  const today = new Date();
  const year = today.getFullYear();

  return (
    <div className="">
      <div className="bg-[#0f0e17]/90 z-50 ackdrop-blur-md fixed text-[#fffffe] lg:block hidden">
        <Nav />
      </div>
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
        <div id="about" className="lg:p-20 p-10">
          <About />
        </div>
        {/* Technologies */}
        <div id="technologies" className="lg:p-20 p-10">
          <Technologies />
        </div>
        {/* Experiences */}
        <div id="experiences" className="lg:p-20 p-10">
          <Experiences />
        </div>
        {/* Projects */}
        <div id="projects" className="lg:p-20 p-10">
          <Projects />
        </div>
        {/* Trainings */}
        <div id="trainings" className="lg:p-20 p-10">
          <Trainings />
        </div>
        {/* Contacts */}
        <div id="contact" className="lg:p-20 p-10">
          <Contacts />
        </div>
        {/* Footer */}
      </div>
      <div className="flex items-center text-xs px-2 justify-between border-t border-gray-700 p-2 w-screen text-[#535356]">
        <div>@ {year} JOVEN MIRAN</div>
        <div>BUILT IN REACT & NODEJS</div>
      </div>
    </div>
  );
};

export default index;
