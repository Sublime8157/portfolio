import ContactList from "./components/contactList";
import InputText from "../utils/InputText";
import InputTextArea from "../utils/InputTextArea.jsx";
import Button from "../utils/Button.jsx";
import Motion from "../utils/Motion.jsx";

const contacts = () => {
  return (
    <div className="">
      <Motion direction="top" className="text-center text-2xl">
        CONTACT
      </Motion>
      <div className="items-center p-10 flex flex-row justify-evenly">
        <div>
          {ContactList.map((contact, index) => (
            <div key={index} className="flex flex-row gap-2">
              <Motion delay={index * 0.05}>
                {contact.type}: <p className="text-[#a7a9be]">{contact.info}</p>
              </Motion>
            </div>
          ))}
        </div>
        <Motion direction="right" className="flex flex-col  gap-2">
          <InputText name="name" placeholder="Name (Optional)" />
          <InputText name="subject" placeholder="Subject" />
          <InputTextArea
            name="message"
            placeholder="message"
            classname="h-40 "
          />
          <Button classname="w-100 py-2!">Submit</Button>
        </Motion>
      </div>
    </div>
  );
};

export default contacts;
