import { TextStyle, FontSize } from "@tiptap/extension-text-style";
import { useEditorContext } from "../../context/EditorContext.jsx";
import { TextAlign } from "@tiptap/extension-text-align";
import { useEditor, EditorContent } from "@tiptap/react";
import Underline from "@tiptap/extension-underline";
import Highlight from "@tiptap/extension-highlight";
import { Color } from "@tiptap/extension-color";
import StarterKit from "@tiptap/starter-kit";

const Editor = ({ content, className, onUpdate }) => {
  const { registerEditor } = useEditorContext();

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Color,
      TextStyle,
      FontSize,
      Highlight.configure({ multicolor: true }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content: typeof content === "string" ? content : "",

    onUpdate: ({ editor }) => {
      if (onUpdate) onUpdate(editor.getHTML());
    },

    onFocus: ({ editor }) => {
      registerEditor(editor);
    },
  });

  return (
    <div className={className}>
      <EditorContent editor={editor} />
    </div>
  );
};

export default Editor;
