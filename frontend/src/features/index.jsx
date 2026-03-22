import Experiences from "./experiences/components/experiences.jsx";
import Trainings from "./trainings/components/trainings.jsx";
import Technologies from "./technologies/technologies.jsx";
import Projects from "./projects/projects.jsx";
import Contacts from "./contact/contacts.jsx";
import Hero from "./hero/pages/hero.jsx";
import Nav from "./navigation/nav.jsx";

const index = () => {
  const today = new Date();
  const year = today.getFullYear();

  return (
    <div>
      <div className="bg-[#0f0e17]/90 backdrop-blur-md fixed text-[#fffffe]">
        <Nav />
      </div>
      <div className="text-sm flex flex-col w-screen px-20 text-[#fffffe]">
        {/* About */}
        <div id="about" className="h-screen pt-10 flex flex-col">
          <div className="px-10 h-11/12 flex items-center">
            <Hero />
          </div>
        </div>
        {/* Technologies */}
        <div id="technologies" className="p-20">
          <Technologies />
        </div>
        {/* Experiences */}
        <div id="experiences" className="p-20">
          <Experiences />
        </div>
        {/* Projects */}
        <div id="projects" className="p-20">
          <Projects />
        </div>
        {/* Trainings */}
        <div id="trainings" className="p-20">
          <Trainings />
        </div>
        {/* Contacts */}
        <div id="contact" className="p-20">
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
