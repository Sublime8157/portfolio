import About from "../../about/about.jsx";
import Technologies from "../../technologies/technologies.jsx";
import Experiences from "../../experiences/experiences.jsx";
import Projects from "../../projects/projects.jsx";
import Trainings from "../../trainings/trainings.jsx";
import Contacts from "../../contact/contacts.jsx";

export const sections = [
  "About",
  "Technologies",
  "Experiences",
  "Projects",
  "Trainings",
  "Contact",
];

export const sectionIcons = {
  About: "person-outline",
  Technologies: "code-outline",
  Experiences: "document-outline",
  Projects: "file-tray-stacked-outline",
  Trainings: "book-outline",
  Contact: "send-outline",
};

export const sectionMap = {
  About,
  Technologies,
  Experiences,
  Projects,
  Trainings,
  Contact: Contacts,
};

export default sections;
