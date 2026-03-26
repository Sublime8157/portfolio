import { faCode, faDatabase,  faWrench } from "@fortawesome/free-solid-svg-icons";

const tech = [
  {
    tech: "Frontend", 
    lists: ["WebixJS", "React", "TailwindCSS"],

  },
  {
    tech: "Backend", 
    lists: ["NodeJS", "Ruby on Rails", "SQL Server", "MySQL", "Laravel"],
  },
  {
    tech: "Tools",
    lists: ["Git", "Sourcetree", "Figma", "Photoshop"],
  },
];

export const icons = {
  Frontend: faCode, 
  Backend: faDatabase, 
  Tools: faWrench
}

export default tech;
