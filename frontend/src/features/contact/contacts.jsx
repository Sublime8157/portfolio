import ContactList from "./components/contactList";
import InputText from "../utils/InputText";
import InputTextArea from "../utils/InputTextArea.jsx"
import Button from "../utils/Button.jsx"

const contacts = () => {
  return (
    <div className="">
      <h1 className="text-center text-4xl">Contact</h1>
      <div className="items-center p-10 flex flex-row justify-evenly">
        <div>
          {ContactList.map((contact, index) => (
            <div key={index} className="flex flex-row gap-2">
              {contact.type}: <p className="text-[#a7a9be]">{contact.info}</p>
            </div>
          ))}
        </div>
        <div className="flex flex-col  gap-2">
          <InputText name="name" placeholder="Name (Optional)" />
          <InputText name="subject" placeholder="Subject" />
          <InputTextArea name="message" placeholder="message" classname="h-40 " />
          <Button classname="w-100 py-2!">Submit</Button>
        </div>
      </div>
    </div>
  );
};

export default contacts;
