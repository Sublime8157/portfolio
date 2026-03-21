import Profile from "../../../assets/ProfileImage.png";
import Button from "../../utils/Button.jsx";
import Paragraph from "../components/paragraph.jsx";

const Hero = () => {
  return (
    <div className="flex w-full justify-between items-center">
      <div className="flex flex-col gap-8 w-6/12">
        <h1 className="text-5xl">Software Developer</h1>
        <Paragraph />
        <Button variant="primary" classname="w-60">Download Resume</Button>
      </div>
      <div>
        <img src={Profile} className="h-90 w-90 rounded-full"></img>
      </div>
    </div>
  );
};

export default Hero;
