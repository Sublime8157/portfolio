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

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Edit / Save button */}
      {(isHovered || isEditing) && (
        <button
          onClick={isEditing ? stopEditing : startEditing}
          className="absolute -top-6 right-0 z-10 text-xs px-2 py-1 
                     rounded border transition-all duration-150
                     border-gray-800 text-gray-400 hover:text-white 
                     hover:border-gray-300 bg-transparent cursor-pointer"
        >
          <FontAwesomeIcon icon={isEditing ? faSave : faPenToSquare} />
        </button>
      )}

      <div className="items-center lg:p-10 pt-5 flex lg:flex-row flex-col justify-evenly">
        {/* Left column — heading, subheading, contact links */}
        <div className="p-5 flex flex-col gap-4">
          {/* Heading */}
          {isEditing ? (
            <Editor
              content={heading}
              onUpdate={(html) => setHeading(html)}
              className="text-3xl lg:text-5xl text-gray-400 footer italic"
            />
          ) : (
            <Motion
              className="text-3xl lg:text-5xl text-gray-400 footer"
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
              className="text-base lg:text-lg text-gray-400 italic font-extrabold"
            />
          ) : (
            <Motion
              className="text-base lg:text-lg text-gray-400"
              style={{ fontStyle: "italic", fontWeight: "800" }}
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
                    className="flex flex-col gap-1 border border-gray-700 
                        rounded p-2 text-xs"
                  >
                    <input
                      value={list.type}
                      onChange={(e) =>
                        updateContactLink(list.id, "type", e.target.value)
                      }
                      className="bg-transparent border-b border-gray-600 
                       text-white outline-none"
                      placeholder="Label e.g. Phone"
                    />
                    <input
                      value={list.link}
                      onChange={(e) =>
                        updateContactLink(list.id, "link", e.target.value)
                      }
                      className="bg-transparent border-b border-gray-600 
                       text-gray-400 outline-none"
                      placeholder="Link or number"
                    />
                    <input
                      value={list.icon}
                      onChange={(e) =>
                        updateContactLink(list.id, "icon", e.target.value)
                      }
                      className="bg-transparent border-b border-gray-600 
                       text-gray-500 outline-none"
                      placeholder="Ion icon e.g. logo-github"
                    />

                    {/* ✅ Remove button */}
                    <button
                      onClick={() => removeContact(list.id)}
                      className="flex items-center gap-1 text-red-400 hover:text-red-300 
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

            {/* ✅ Add contact button — edit mode only */}
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
        <Motion className="flex flex-col gap-2 lg:p-0 w-12/12 lg:w-100">
          <InputText name="name" placeholder="Name (Optional)" />
          <InputText name="subject" placeholder="Subject" />
          <InputTextArea
            name="message"
            placeholder="message"
            classname="h-40"
          />
          <Button className="w-full py-2! text-gray-600! border bg-[#0f0e17]!">
            Submit
          </Button>
        </Motion>
      </div>
    </div>
  );
};

export default Contact;
