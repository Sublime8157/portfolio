import InputText from "../utils/InputText";
import InputTextArea from "../utils/InputTextArea.jsx";
import Button from "../utils/Button.jsx";
import Motion from "../utils/Motion.jsx";
import { contactList } from "../contact/components/contactList.jsx";

const contacts = () => {
  const handleLinkClick = (link) => {
    if (link.includes("@")) {
      window.open(`mailto:${link}`, "_self");
    } else if(link.includes("+")) {
      window.open(`tel:${link}`, "_self")
    }
   else {
      window.open(link, "_blank");
    }
  };
  return (
    <div className="">
      <div className="items-center lg:p-10 pt-5 flex lg:flex-row flex-col justify-evenly">
        <div>
          <div className="p-5 flex flex-col gap-4">
            <Motion
              className="text-3xl lg:text-5xl text-gray-400 footer"
              style={{ fontStyle: "italic" }}
            >
              Let's work it out, what's on your mind?
            </Motion>
            <Motion
              className="text-base lg:text-lg text-gray-400"
              style={{ fontStyle: "italic", fontWeight: "800" }}
            >
              Feel free to reach out
            </Motion>
            <div className="text-gray-600 flex-wrap flex-row gap-4 lg:gap-8 flex">
              {contactList.map((list, index) => {
                return (
                  <button key={index} onClick={() => handleLinkClick(list.link)}>
                    <Motion className=" cursor-pointer hover:underline flex items-center flex-row gap-2">
                      <div className="flex flex-row gap-1">
                        <ion-icon
                          name={list.icon}
                          class="text-base lg:text-lg"
                        ></ion-icon>
                        <div>{list.type}</div>
                      </div>
                      <div className="-rotate-45 text-base lg:text-lg">
                        <ion-icon name="arrow-forward"></ion-icon>
                      </div>
                    </Motion>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
        <Motion className="flex flex-col gap-2 lg:p-0 w-12/12 lg:w-100">
          <InputText name="name" placeholder="Name (Optional)" />
          <InputText name="subject" placeholder="Subject" />
          <InputTextArea
            name="message"
            placeholder="message"
            classname="h-40 "
          />
          <Button className="w-full py-2! text-gray-600! border bg-[#0f0e17]!">
            Submit
          </Button>
        </Motion>
      </div>
    </div>
  );
};

export default contacts;
