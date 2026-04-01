import { useEditor, EditorContent } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import { Underline } from "@tiptap/extension-underline";
import { TextAlign } from "@tiptap/extension-text-align";
import { Link } from "@tiptap/extension-link";
import { Image } from "@tiptap/extension-image";
import { Table } from "@tiptap/extension-table";
import { TableRow } from "@tiptap/extension-table-row";
import { TableCell } from "@tiptap/extension-table-cell";
import { TableHeader } from "@tiptap/extension-table-header";

// ─── SVG Icon helper ──────────────────────────────────────────────────────────
const Icon = ({ d, size = 14 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d={d} />
  </svg>
);

const icons = {
  bold: "M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6zM6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z",
  italic: "M19 4h-9M14 20H5M15 4L9 20",
  underline: "M6 3v7a6 6 0 0 0 12 0V3M4 21h16",
  strike: "M16 4H9a3 3 0 0 0-2.83 4M4 12h16M8 20h7a3 3 0 0 0 3-3v-1",
  code: "M16 18l6-6-6-6M8 6l-6 6 6 6",
  ul: "M9 6h11M9 12h11M9 18h11M5 6v.01M5 12v.01M5 18v.01",
  ol: "M10 6h11M10 12h11M10 18h11M4 6h1v4M4 10h2M6 18H4c0-1 2-2 2-3s-1-1.5-2-1",
  quote:
    "M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1zm12 0c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z",
  hr: "M5 12h14",
  link: "M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71",
  image: "M15 8h.01M3 9l4-4 4 4 4-5 6 8H3z",
  table:
    "M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 1-2-2V9m0 0h18",
  align_l: "M3 6h18M3 12h12M3 18h15",
  align_c: "M3 6h18M6 12h12M4 18h16",
  align_r: "M3 6h18M9 12h12M6 18h15",
  align_j: "M3 6h18M3 12h18M3 18h18",
  undo: "M3 7v6h6M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13",
  redo: "M21 7v6h-6M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3L21 13",
  codeblock:
    "M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2zM14 2v6h6M8 13h8M8 17h5",
  clear: "M6 18L18 6M8 6h10v2M9 16H5v-2",
};

// ─── Toolbar Button ───────────────────────────────────────────────────────────
const ToolbarButton = ({ icon, label, active, disabled, onClick }) => (
  <button
    type="button"
    title={label}
    disabled={disabled}
    onClick={onClick}
    className={`
      relative flex items-center justify-center w-7.5 h-7
      rounded-md border-none text-sm font-medium transition-all duration-100
      ${
        active
          ? "bg-neutral-200 text-neutral-900 dark:bg-neutral-700 dark:text-neutral-100"
          : "bg-transparent text-neutral-500 hover:bg-neutral-100 hover:text-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-200"
      }
      disabled:opacity-30 disabled:cursor-not-allowed
    `}
  >
    <Icon d={icons[icon]} size={14} />
  </button>
);

// ─── Divider ──────────────────────────────────────────────────────────────────
const Divider = () => (
  <div className="w-px h-5 bg-neutral-200 dark:bg-neutral-700 mx-1 shrink-0" />
);

// ─── Toolbar ─────────────────────────────────────────────────────────────────
const Toolbar = ({ editor }) => {
  if (!editor) return null;

  const addLink = () => {
    const url = window.prompt("Enter URL");
    if (url) editor.chain().focus().setLink({ href: url }).run();
  };

  const addImage = () => {
    const url = window.prompt("Enter image URL");
    if (url) editor.chain().focus().setImage({ src: url }).run();
  };

  const insertTable = () =>
    editor
      .chain()
      .focus()
      .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
      .run();

  return (
    <div className="flex flex-row flex-wrap gap-0.5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-xl">
      {/* Heading select */}
      <select
        className="h-7 text-xs bg-transparent border-none outline-none cursor-pointer rounded-md px-1.5 pr-6 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 appearance-none min-w-25"
        value={
          editor.isActive("heading", { level: 1 })
            ? "h1"
            : editor.isActive("heading", { level: 2 })
              ? "h2"
              : editor.isActive("heading", { level: 3 })
                ? "h3"
                : editor.isActive("heading", { level: 4 })
                  ? "h4"
                  : "paragraph"
        }
        onChange={(e) => {
          const val = e.target.value;
          if (val === "paragraph") {
            editor.chain().focus().setParagraph().run();
          } else {
            editor
              .chain()
              .focus()
              .toggleHeading({ level: parseInt(val.replace("h", "")) })
              .run();
          }
        }}
      >
        <option value="paragraph">Paragraph</option>
        <option value="h1">Heading 1</option>
        <option value="h2">Heading 2</option>
        <option value="h3">Heading 3</option>
        <option value="h4">Heading 4</option>
      </select>

      <Divider />

      {/* Text formatting */}
      <ToolbarButton
        icon="bold"
        label="Bold (⌘B)"
        active={editor.isActive("bold")}
        onClick={() => editor.chain().focus().toggleBold().run()}
      />
      <ToolbarButton
        icon="italic"
        label="Italic (⌘I)"
        active={editor.isActive("italic")}
        onClick={() => editor.chain().focus().toggleItalic().run()}
      />
      <ToolbarButton
        icon="underline"
        label="Underline (⌘U)"
        active={editor.isActive("underline")}
        onClick={() => editor.chain().focus().toggleUnderline().run()}
      />
      <ToolbarButton
        icon="strike"
        label="Strikethrough"
        active={editor.isActive("strike")}
        onClick={() => editor.chain().focus().toggleStrike().run()}
      />
      <ToolbarButton
        icon="code"
        label="Inline code"
        active={editor.isActive("code")}
        onClick={() => editor.chain().focus().toggleCode().run()}
      />

      <Divider />

      {/* Alignment */}
      <ToolbarButton
        icon="align_l"
        label="Align left"
        active={editor.isActive({ textAlign: "left" })}
        onClick={() => editor.chain().focus().setTextAlign("left").run()}
      />
      <ToolbarButton
        icon="align_c"
        label="Align center"
        active={editor.isActive({ textAlign: "center" })}
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
      />
      <ToolbarButton
        icon="align_r"
        label="Align right"
        active={editor.isActive({ textAlign: "right" })}
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
      />
      <ToolbarButton
        icon="align_j"
        label="Justify"
        active={editor.isActive({ textAlign: "justify" })}
        onClick={() => editor.chain().focus().setTextAlign("justify").run()}
      />

      <Divider />

      {/* Lists & blocks */}
      <ToolbarButton
        icon="ul"
        label="Bullet list"
        active={editor.isActive("bulletList")}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
      />
      <ToolbarButton
        icon="ol"
        label="Numbered list"
        active={editor.isActive("orderedList")}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
      />
      <ToolbarButton
        icon="quote"
        label="Blockquote"
        active={editor.isActive("blockquote")}
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
      />
      <ToolbarButton
        icon="codeblock"
        label="Code block"
        active={editor.isActive("codeBlock")}
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
      />

      <Divider />

      {/* Inserts */}
      <ToolbarButton
        icon="link"
        label="Add link"
        active={editor.isActive("link")}
        onClick={addLink}
      />
      <ToolbarButton icon="image" label="Insert image" onClick={addImage} />
      <ToolbarButton icon="table" label="Insert table" onClick={insertTable} />
      <ToolbarButton
        icon="hr"
        label="Horizontal rule"
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
      />

      <Divider />

      {/* History */}
      <ToolbarButton
        icon="undo"
        label="Undo (⌘Z)"
        disabled={!editor.can().undo()}
        onClick={() => editor.chain().focus().undo().run()}
      />
      <ToolbarButton
        icon="redo"
        label="Redo (⌘⇧Z)"
        disabled={!editor.can().redo()}
        onClick={() => editor.chain().focus().redo().run()}
      />
      <ToolbarButton
        icon="clear"
        label="Clear formatting"
        onClick={() => editor.chain().focus().unsetAllMarks().run()}
      />
    </div>
  );
};

// ─── Work in Progress Banner ──────────────────────────────────────────────────
const WIPBanner = () => (
  <div className="flex items-start gap-3 px-4 py-3 mb-4 rounded-xl border border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950/40">
    <span className="mt-0.5 text-amber-500 shrink-0">
      {/* Construction icon */}
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    </span>
    <div>
      <p className="text-sm font-medium text-amber-800 dark:text-amber-300">
        Work in progress
      </p>
      <p className="text-xs text-amber-700 dark:text-amber-400 mt-0.5 leading-relaxed">
        All the content here will soon be editable (CRM style) utilizing the
        Tiptap editor. Stay tuned!
      </p>
    </div>
  </div>
);

// ─── Main Editor Component ────────────────────────────────────────────────────
export default function TiptapEditor() {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Link.configure({ openOnClick: false }),
      Image,
      Table.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    content: "<p>Start writing here...</p>",
    editorProps: {
      attributes: {
        class:
          "prose prose-sm dark:prose-invert max-w-none min-h-[160px] px-4 py-3 outline-none",
      },
    },
  });

  return (
    <div className="w-full max-w-3xl mx-auto p-4 font-sans">
      <WIPBanner />

      <div className="rounded-xl border border-neutral-200 dark:border-neutral-700 overflow-hidden bg-white dark:bg-neutral-900 shadow-sm">
        <div className="border-b border-neutral-200 dark:border-neutral-700 p-2">
          <Toolbar editor={editor} />
        </div>
        {/* <EditorContent editor={editor} /> */}
      </div>
    </div>
  );
}
