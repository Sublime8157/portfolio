import ExpLogo1 from "../../../assets/Exp1.png";
import ExpLogo2 from "../../../assets/Exp2.png";

const experiences = [
  {
    logo: ExpLogo1,
    name: "Jeonsoft Corporation",
    role: "Software Developer",
    tenure: "July 2024 - January 2026",
    paragraph: ` Maintained and enhanced a production payroll system used by enterprise clients, resolving critical payroll computation issues affecting over 10,000 employees. \n
    Developed and customized payroll features using Node.js, Ruby on Rails, SQL, WebixJS, and Tailwind CSS, improving system usability and overall functionality. \n
    Optimized SQL queries, reducing payroll report generation time by 40%, and collaborated with senior developers to deploy fixes and enhancements to live production environments.`,
    stacks: ["SQL", "Ruby on Rails", "NodeJS", "WebixJS", "TailwindCSS"],
  },
  {
    logo: ExpLogo2,
    name: "Optogrow",
    role: "Intern",
    tenure: "October 2023 - February 2024",
    paragraph:
      "Automated key workflows and processes for the company website using Go High Level, improving marketing automation, lead capture, and customer engagement. \n \n  Collaborated with the development team to design and build the front-end of the company website, ensuring a responsive and user-friendly interface. \n \n  Participated in meetings with international clients to gather project specifications and requirements, helping translate business needs into technical implementation for the website.",
      stacks: ["Go High Level","Airtable","Zapier"]
  },
];

export default experiences;
