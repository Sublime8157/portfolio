import { useState } from "react";
import { useEditorState } from "@tiptap/react"; // ✅ import this
import { useEditorContext } from "../../context/EditorContext.jsx";
import {
  faAlignLeft,
  faAlignCenter,
  faAlignRight,
  faAlignJustify,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Toolbar = () => {
  const { activeEditor } = useEditorContext();
  const [color, setColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");

  // ✅ Subscribe to editor state changes — triggers re-render on every edit
  const editorState = useEditorState({
    editor: activeEditor,
    selector: (ctx) => ({
      isBold: ctx.editor?.isActive("bold"),
      isItalic: ctx.editor?.isActive("italic"),
      isUnderline: ctx.editor?.isActive("underline"),
      isLeft: ctx.editor?.isActive({ textAlign: "left" }),
      isCenter: ctx.editor?.isActive({ textAlign: "center" }),
      isRight: ctx.editor?.isActive({ textAlign: "right" }),
      isJustify: ctx.editor?.isActive({ textAlign: "justify" }),
    }),
  });

  if (!activeEditor) return null;

  const baseBtn =
    "w-8 h-8 flex items-center justify-center rounded border border-gray-600 transition-all duration-150";
  const active = "bg-black text-white";
  const inactive = "bg-gray-800 text-gray-400 hover:bg-gray-700";

  return (
    <div className="flex flex-col items-center gap-2 p-2 w-12 border rounded-lg border-gray-700 bg-[#011e0d] shadow-lg">
      {/* BOLD */}
      <button
        onClick={() => activeEditor.chain().focus().toggleBold().run()}
        className={`${baseBtn} cursor-pointer font-bold ${editorState?.isBold ? active : inactive}`}
      >
        B
      </button>

      {/* ITALIC */}
      <button
        onClick={() => activeEditor.chain().focus().toggleItalic().run()}
        className={`${baseBtn} cursor-pointer italic ${editorState?.isItalic ? active : inactive}`}
      >
        I
      </button>

      {/* UNDERLINE */}
      <button
        onClick={() => activeEditor.chain().focus().toggleUnderline().run()}
        className={`${baseBtn} cursor-pointer underline ${editorState?.isUnderline ? active : inactive}`}
      >
        U
      </button>

      {/* FONT SIZE */}
      <select
        onChange={(e) =>
          activeEditor.chain().focus().setFontSize(e.target.value).run()
        }
        className="w-8 h-8 text-xs rounded border border-gray-600 bg-gray-800 text-white text-center cursor-pointer"
        defaultValue="14px"
      >
        {[12, 14, 16, 18, 20, 24, 28].map((size) => (
          <option key={size} value={`${size}px`}>
            {size}
          </option>
        ))}
      </select>

      {/* TEXT ALIGN */}
      {[
        { align: "left", icon: faAlignLeft, state: editorState?.isLeft },
        { align: "center", icon: faAlignCenter, state: editorState?.isCenter },
        { align: "right", icon: faAlignRight, state: editorState?.isRight },
        {
          align: "justify",
          icon: faAlignJustify,
          state: editorState?.isJustify,
        },
      ].map(({ align, icon, state }) => {
        return (
          <button
            key={align}
            onClick={() =>
              activeEditor.chain().focus().setTextAlign(align).run()
            }
            className={`${baseBtn} cursor-pointer ${state ? active : inactive}`}
          >
            <FontAwesomeIcon icon={icon} className="text-xs" />
          </button>
        );
      })}

      {/* TEXT COLOR */}
      <input
        type="color"
        value={color}
        onChange={(e) => {
          setColor(e.target.value);
          activeEditor.chain().focus().setColor(e.target.value).run();
        }}
        className="w-8 h-8 cursor-pointer border border-gray-600 rounded bg-transparent"
      />

      {/* BACKGROUND COLOR */}
      <input
        type="color"
        value={bgColor}
        onChange={(e) => {
          setBgColor(e.target.value);
          activeEditor
            .chain()
            .focus()
            .setHighlight({ color: e.target.value })
            .run();
        }}
        className="w-8 h-8 cursor-pointer border border-gray-600 rounded bg-transparent"
      />
    </div>
  );
};

export default Toolbar;
