import { useState } from "react";
import InputText from "../utils/InputText.jsx";
import InputTextArea from "../utils/InputTextArea.jsx";
import Button from "../utils/Button.jsx";
import Motion from "../utils/Motion.jsx";
import Editor from "../../components/tiptap/Editor.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faSave } from "@fortawesome/free-regular-svg-icons";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { useContactBlocks } from "./hooks/useContactBlock.js";
import SectionColorPicker from "../../components/SectionColorPicker.jsx";
import API from "../../../services/api.js";
import button from "../utils/Button.jsx";
import SuccessModal from "../../components/SuccessfullModal.jsx";

const Contact = () => {
  const {
    heading,
    subheading,
    setHeading,
    setSubheading,
    contactLinks,
    updateContactLink,
    isEditing,
    startEditing,
    stopEditing,
    addContact,
    removeContact,
    bgColor,
    setBgColor,
  } = useContactBlocks();

  const [isHovered, setIsHovered] = useState(false);

  const handleLinkClick = (link) => {
    if (link.includes("@")) {
      window.open(`mailto:${link}`, "_self");
    } else if (link.includes("+")) {
      window.open(`tel:${link}`, "_self");
    } else {
      window.open(link, "_blank");
    }
  };

  const [emailData, setEmailData] = useState({
    name: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setEmailData({ ...emailData, [e.target.name]: e.target.value });
  };

  const [buttonLoading, setButtonLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!emailData.name || !emailData.subject || !emailData.message) return;
    setButtonLoading(true);

    try {
      const response = await API.post("email/sendEmail", emailData);
      setShowModal(true);
      setEmailData({ name: "", subject: "", message: "" });
    } catch (e) {
      console.error(e);
      alert("Failed to send email.");
    } finally {
      setButtonLoading(false);
    }
  };

  return (
    <div
      className="relative lg:p-20 p-10"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ backgroundColor: bgColor }}
    >
      <Motion
        direction="top"
        className="text-center text-lg md:text-2xl text-text-headline"
      >
        CONTACT
      </Motion>
      {/* Edit / Save button */}
      {(isHovered || isEditing) && (
        <button
          onClick={isEditing ? stopEditing : startEditing}
          className="absolute right-10 z-10 text-xs px-2 py-1 
                     rounded border transition-all duration-150
                     border-gray-800 text-text-paragraph hover:opacity-50
                     hover:border-gray-300 bg-transparent cursor-pointer"
        >
          <FontAwesomeIcon icon={isEditing ? faSave : faPenToSquare} />
        </button>
      )}

      <SuccessModal isOpen={showModal} onClose={() => setShowModal(false)} />

      <div className="items-center lg:p-10 pt-5 flex lg:flex-row flex-col justify-evenly">
        {/* Left column — heading, subheading, contact links */}
        <div className="p-5 flex flex-col gap-4">
          {/* Heading */}
          {isEditing ? (
            <Editor
              content={heading}
              onUpdate={(html) => setHeading(html)}
              className="text-3xl lg:text-5xl text-text-headline footer italic"
            />
          ) : (
            <Motion
              className="text-3xl lg:text-5xl text-text-headline footer"
              style={{ fontStyle: "italic" }}
            >
              <div dangerouslySetInnerHTML={{ __html: heading }} />
            </Motion>
          )}

          {/* Subheading */}
          {isEditing ? (
            <Editor
              content={subheading}
              onUpdate={(html) => setSubheading(html)}
              className="text-base lg:text-lg text-text-headline italic font-extrabold"
            />
          ) : (
            <Motion
              className="text-base lg:text-lg text-text-headline font-extrabold "
              style={{ fontStyle: "italic" }}
            >
              <div dangerouslySetInnerHTML={{ __html: subheading }} />
            </Motion>
          )}

          {/* Contact Links */}
          <div className="text-gray-600 flex-wrap flex-row gap-4 lg:gap-8 flex">
            {contactLinks.map((list) => (
              <div key={list.id}>
                {isEditing ? (
                  <div
                    className="flex flex-col gap-1 border border-stroke 
                        rounded p-2 text-xs"
                  >
                    <input
                      value={list.type}
                      onChange={(e) =>
                        updateContactLink(list.id, "type", e.target.value)
                      }
                      className="bg-transparent border-b border-stroke 
                       text-text-paragraph outline-none"
                      placeholder="Label e.g. Phone"
                    />
                    <input
                      value={list.link}
                      onChange={(e) =>
                        updateContactLink(list.id, "link", e.target.value)
                      }
                      className="bg-transparent border-b border-stroke 
                       text-gray-400 outline-none"
                      placeholder="Link or number"
                    />
                    <input
                      value={list.icon}
                      onChange={(e) =>
                        updateContactLink(list.id, "icon", e.target.value)
                      }
                      className="bg-transparent border-b border-stroke 
                       text-gray-500 outline-none"
                      placeholder="Ion icon e.g. logo-github"
                    />

                    {/* Remove button */}
                    <button
                      onClick={() => removeContact(list.id)}
                      className="flex items-center justify-center gap-1 text-icon-color hover:opacity-50 
                       cursor-pointer mt-1 text-xs"
                    >
                      <FontAwesomeIcon icon={faTrashCan} /> Remove
                    </button>
                  </div>
                ) : (
                  <button onClick={() => handleLinkClick(list.link)}>
                    <Motion className="cursor-pointer hover:underline flex items-center flex-row gap-2">
                      <div className="flex flex-row gap-1">
                        <ion-icon
                          name={list.icon}
                          class="text-base lg:text-lg"
                        />
                        <div>{list.type}</div>
                      </div>
                      <div className="-rotate-45 text-base lg:text-lg">
                        <ion-icon name="arrow-forward" />
                      </div>
                    </Motion>
                  </button>
                )}
              </div>
            ))}

            {/*  Add contact button — edit mode only */}
            {isEditing && (
              <button
                onClick={addContact}
                className="border border-dashed border-gray-600 rounded p-2 
                 text-xs text-gray-500 hover:text-gray-300 
                 hover:border-gray-400 transition-colors cursor-pointer 
                 self-start"
              >
                + Add Contact
              </button>
            )}
          </div>
        </div>

        {/* Right column — Form, always functional regardless of edit mode */}
        <Motion className=" lg:p-0 w-12/12 lg:w-100">
          <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
            <InputText
              onChange={handleChange}
              name="name"
              placeholder="Name (Optional)"
              value={emailData.name}
            />
            <InputText
              onChange={handleChange}
              name="subject"
              placeholder="Subject"
              value={emailData.subject}
            />
            <InputTextArea
              name="message"
              placeholder="message"
              classname="h-40"
              onChange={handleChange}
              value={emailData.message}
            />
            <Button
              className="w-100 py-2! text-accent-text"
              disabled={buttonLoading}
              type="submit"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "40px",
              }}
            >
              {buttonLoading ? (
                <span className="buttonLoader" />
              ) : (
                "Send Message"
              )}
            </Button>
          </form>
        </Motion>
      </div>
      {isEditing && (
        <div className="relative lg:block hidden">
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
            <SectionColorPicker
              currentColor={bgColor}
              onColorChange={setBgColor}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Contact;
