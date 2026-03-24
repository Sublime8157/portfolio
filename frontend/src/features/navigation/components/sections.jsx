import About from "../../about/about.jsx";
import Technologies from "../../technologies/technologies.jsx";
import Experiences from "../../experiences/components/experiences.jsx";
import Projects from "../../projects/projects.jsx";
import Trainings from "../../trainings/components/trainings.jsx";
import Contacts from "../../contact/contacts.jsx";

export const sections = [
  "About",
  "Technologies",
  "Experiences",
  "Projects",
  "Trainings",
  "Contact",
];

export const sectionMap = {
  About,
  Technologies,
  Experiences,
  Projects,
  Trainings,
  Contact: Contacts,
};

export default sections;
