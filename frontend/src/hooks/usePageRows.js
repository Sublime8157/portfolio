import { useState } from "react";
import { arrayMove } from "@dnd-kit/sortable";

const uid = () => crypto.randomUUID();

const createTextBlock = () => ({
  id: uid(),
  type: "text",
  content: "<p>New text block</p>",
});

const createImageBlock = () => ({
  id: uid(),
  type: "image",
  src: null,
  alt: "Image",
});

const createButtonBlock = () => ({
  id: uid(),
  type: "button",
  label: "Click me",
  url: "#",
});

const createColumn = () => ({
  id: uid(),
  blocks: [createTextBlock()],
});

export const createRow = (columnCount = 1) => ({
  id: uid(),
  bgColor: "transparent",
  columns: Array.from({ length: columnCount }, () => createColumn()),
});

export const usePageRows = () => {
  const [rows, setRows] = useState([]);
  const [isEditingRow, setIsEditingRow] = useState(null); // stores the id of the row being edited

  // --- ROW ACTIONS ---
  const addRow = (columnCount = 1) => {
    setRows((prev) => [...prev, createRow(columnCount)]);
  };

  const deleteRow = (rowId) => {
    setRows((prev) => prev.filter((r) => r.id !== rowId));
  };

  const updateRowBgColor = (rowId, color) => {
    setRows((prev) =>
      prev.map((r) => (r.id === rowId ? { ...r, bgColor: color } : r)),
    );
  };

  const reorderRows = (activeId, overId) => {
    setRows((prev) => {
      const oldIndex = prev.findIndex((r) => r.id === activeId);
      const newIndex = prev.findIndex((r) => r.id === overId);
      return arrayMove(prev, oldIndex, newIndex);
    });
  };

  // --- COLUMN ACTIONS ---
  const addColumn = (rowId) => {
    setRows((prev) =>
      prev.map((r) =>
        r.id === rowId && r.columns.length < 3
          ? { ...r, columns: [...r.columns, createColumn()] }
          : r,
      ),
    );
  };

  const deleteColumn = (rowId, columnId) => {
    setRows((prev) =>
      prev.map((r) =>
        r.id === rowId && r.columns.length > 1
          ? { ...r, columns: r.columns.filter((c) => c.id !== columnId) }
          : r,
      ),
    );
  };

  // --- BLOCK ACTIONS ---
  const addBlock = (rowId, columnId, type = "text") => {
    const newBlock =
      type === "text"
        ? createTextBlock()
        : type === "image"
          ? createImageBlock()
          : createButtonBlock();

    setRows((prev) =>
      prev.map((r) =>
        r.id === rowId
          ? {
              ...r,
              columns: r.columns.map((c) =>
                c.id === columnId
                  ? { ...c, blocks: [...c.blocks, newBlock] }
                  : c,
              ),
            }
          : r,
      ),
    );
  };

  const deleteBlock = (rowId, columnId, blockId) => {
    setRows((prev) =>
      prev.map((r) =>
        r.id === rowId
          ? {
              ...r,
              columns: r.columns.map((c) =>
                c.id === columnId
                  ? { ...c, blocks: c.blocks.filter((b) => b.id !== blockId) }
                  : c,
              ),
            }
          : r,
      ),
    );
  };

  const updateBlock = (rowId, columnId, blockId, changes) => {
    setRows((prev) =>
      prev.map((r) =>
        r.id === rowId
          ? {
              ...r,
              columns: r.columns.map((c) =>
                c.id === columnId
                  ? {
                      ...c,
                      blocks: c.blocks.map((b) =>
                        b.id === blockId ? { ...b, ...changes } : b,
                      ),
                    }
                  : c,
              ),
            }
          : r,
      ),
    );
  };

  const updateImage = (rowId, columnId, blockId, file) => {
    const url = URL.createObjectURL(file);
    updateBlock(rowId, columnId, blockId, { src: url });
  };

  return {
    rows,
    isEditingRow,
    setIsEditingRow,
    addRow,
    deleteRow,
    updateRowBgColor,
    reorderRows,
    addColumn,
    deleteColumn,
    addBlock,
    deleteBlock,
    updateBlock,
    updateImage,
  };
};
