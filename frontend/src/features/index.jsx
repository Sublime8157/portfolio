import Experiences from "./experiences/components/experiences.jsx";
import Trainings from "./trainings/components/trainings.jsx";
import Technologies from "./technologies/technologies.jsx";
import Projects from "./projects/projects.jsx";
import Hero from "./hero/pages/hero.jsx";
import Nav from "./navigation/nav.jsx";
import Contacts from "./contact/contacts.jsx";

const index = () => {
  const today = new Date();
  const year = today.getFullYear();
  
  return (
    <div>
      <div className="text-sm flex flex-col w-screen px-20 text-[#fffffe]">
        {/* About */}
        <div className="h-screen pt-10 flex flex-col">
          <div className="h-1/12 flex flex-col text-[#fffffe]">
            <Nav />
          </div>
          <div className="px-10 h-8/12 flex items-center">
            <Hero />
          </div>
        </div>
        {/* Technologies */}
        <div className="w-full h-auto">
          <Technologies />
        </div>
        {/* Experiences */}
        <div className="p-10">
          <Experiences />
        </div>
        {/* Projects */}
        <div className="px-20">
          <Projects />
        </div>
        {/* Trainings */}
        <div className="p-10">
          <Trainings />
        </div>
        {/* Contacts */}
        <div className="p-10">
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
