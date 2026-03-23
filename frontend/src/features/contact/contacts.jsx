import ContactList from "./components/contactList";
import InputText from "../utils/InputText";
import InputTextArea from "../utils/InputTextArea.jsx";
import Button from "../utils/Button.jsx";
import Motion from "../utils/Motion.jsx";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationArrow } from "@fortawesome/free-solid-svg-icons";

const contacts = () => {
  const handleLinkClick = (link) => {
    if (link.includes("@")) {
      console.log(link);
      window.open(`mailto:${link}`, "_self");
    } else {
      window.open(link, "_blank");
    }
  };
  return (
    <div className="">
      <Motion direction="top" className="text-center text-2xl">
        CONTACT
      </Motion>
      <div className="items-center md:p-10 pt-5 gap-8 flex md:flex-row flex-col justify-evenly">
        <div>
          {ContactList.map((contact, index) => (
            <div
              key={index}
              className="md:text-base text-xs flex md:flex-row flex-col w-full md:justify-start justify-center md:items-start items-center"
            >
              <Motion
                delay={index * 0.05}
                className="md:block flex flex-col justify-center items-center mb-2"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 1 }}
                  className="cursor-pointer w-60 px-2 py-2 justify-between border text-gray-600 border-gray-700 flex flex-row gap-2 items-center"
                  onClick={() => handleLinkClick(contact.info)}
                >
                  <div>
                    <ion-icon name={contact.icon}></ion-icon>
                  </div>
                  <p className="">{contact.type}</p>
                  <FontAwesomeIcon icon={faLocationArrow} />
                </motion.button>
              </Motion>
            </div>
          ))}
        </div>
        <Motion
          direction="right"
          className="flex flex-col gap-2 md:p-0 w-12/12 md:w-100"
        >
          <InputText name="name" placeholder="Name (Optional)" />
          <InputText name="subject" placeholder="Subject" />
          <InputTextArea
            name="message"
            placeholder="message"
            classname="h-40 "
          />
          <Button classname="w-full py-2!">Submit</Button>
        </Motion>
      </div>
    </div>
  );
};

export default contacts;
