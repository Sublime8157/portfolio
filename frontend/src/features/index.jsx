import sections, { sectionMap } from "./navigation/components/sections.jsx";
import Hero from "./hero/pages/hero.jsx";
import Nav from "./navigation/nav.jsx";
import { useEditorContext } from "../context/EditorContext.jsx";
import Toolbar from "../components/tiptap/Toolbar.jsx";
import { useEffect, useRef, useState } from "react";
import Loading from "../components/Loading.jsx";
import ThemeToggle from "../components/ThemeToggle.jsx";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { usePageRowContext } from "../context/PageRowContext.jsx";
import RowBlock from "../components/pagebuilder/RowBlock.jsx";

const index = () => {
  const {
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
  } = usePageRowContext();

  const [columnCount, setColumnCount] = useState(1);
  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      reorderRows(active.id, over.id);
    }
  };

  const { toolBarVisible, unregisterEditor, activeEditor } = useEditorContext();
  const today = new Date();
  const year = today.getFullYear();
  const toolbarRef = useRef(null);
  const toolBarVisibleRef = useRef(toolBarVisible);

  // Keep the ref in sync with the latest value
  useEffect(() => {
    toolBarVisibleRef.current = toolBarVisible;
  }, [toolBarVisible]);

  useEffect(() => {
    const handleMouseDown = (e) => {
      if (!toolBarVisibleRef.current) return;

      const clickedInsideToolbar = toolbarRef.current?.contains(e.target);
      const clickedInsideEditor = activeEditor?.view?.dom?.contains(e.target);

      if (!clickedInsideToolbar && !clickedInsideEditor) {
        unregisterEditor();
      }
    };
    document.addEventListener("mousedown", handleMouseDown);
    return () => document.removeEventListener("mousedown", handleMouseDown);
  }, [toolBarVisible, activeEditor]);

  // set loading
  const [showLoading, setShowLoading] = useState(true);
  useEffect(() => {
    const loadingTime = setTimeout(() => {
      setShowLoading(false);
    }, 3000);

    return () => clearTimeout(loadingTime);
  }, []);

  // remove scroll when on load
  useEffect(() => {
    if (showLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [showLoading]);

  return (
    <div className="overflow-hidden bg-bg-main text-text-headline transition-colors duration-300">
      <Nav />
      {toolBarVisible && (
        <div
          ref={toolbarRef}
          className="fixed left-0 top-1/2 -translate-y-1/2 z-50 animate-slide-in-left"
        >
          <Toolbar />
        </div>
      )}
      <ThemeToggle />

      <div className="text-sm flex flex-col text-text-headline">
        {/* Hero */}
        <Hero />
        {/* Existing Sections + Row Sections interleaved */}
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={rows.map((r) => r.id)}
            strategy={verticalListSortingStrategy}
          >
            {/* Fixed sections */}
            {sections.map((section, index) => {
              const Component = sectionMap[section];
              return (
                <div key={index} id={section.toLowerCase()}>
                  <Component />
                </div>
              );
            })}

            {/* User-added rows */}
            {rows.map((row) => (
              <div key={row.id}>
                <RowBlock
                  row={row}
                  isEditing={isEditingRow === row.id}
                  onEdit={() => setIsEditingRow(row.id)}
                  onSave={() => setIsEditingRow(null)}
                  onDelete={deleteRow}
                  onUpdateBgColor={updateRowBgColor}
                  onAddColumn={addColumn}
                  onDeleteColumn={deleteColumn}
                  onAddBlock={addBlock}
                  onDeleteBlock={deleteBlock}
                  onUpdateBlock={updateBlock}
                  onUpdateImage={updateImage}
                />
              </div>
            ))}
          </SortableContext>
        </DndContext>

        {/* Add Row Controls */}
        <div className="w-full flex items-center gap-3 p-4 px-10">
          <button
            onClick={() => addRow(columnCount)}
            className="text-xs px-3 rounded w-full border py-5 border-dashed 
                       border-stroke text-text-paragraph hover:text-text-headline 
                       hover:border-text-headline transition-colors cursor-pointer"
          >
            + Add Row
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center text-xs px-2 justify-between border-t border-stroke p-2 w-screen text-text-paragraph">
        <div>@ {year} JOVEN MIRAN</div>
        <div>BUILT IN REACT & NODEJS</div>
      </div>
    </div>
  );
};

export default index;
