import sections, { sectionMap } from "./navigation/components/sections.jsx";
import Hero from "./hero/pages/hero.jsx";
import Nav from "./navigation/nav.jsx";
import { useEditorContext } from "../context/EditorContext.jsx";
import Toolbar from "../components/tiptap/Toolbar.jsx";
import { useEffect, useRef, useState } from "react";
import Loading from "../components/Loading.jsx";

const index = () => {
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
    <div className="overflow-x-hidden">
      <Loading show={showLoading} />
      <div>
        <Nav />
      </div>
      {toolBarVisible && (
        <div
          ref={toolbarRef}
          className="fixed left-0 top-1/2 -translate-y-1/2 z-50 
               animate-slide-in-left"
        >
          <Toolbar />
        </div>
      )}
      <div></div>
      <div className="text-sm flex flex-col text-[#fffffe] lg:px-20 ">
        {/* Hero */}
        <div
          id="hero"
          className="lg:h-screen h-auto lg:py-0 py-20 flex flex-col"
        >
          <div className="px-10 lg:h-11/12 h-9/12 flex items-center">
            <Hero />
          </div>
        </div>
        {/* Sections */}
        {sections.map((section, index) => {
          const Component = sectionMap[section];
          return (
            <div
              key={index}
              id={section.toLowerCase()}
              className="lg:p-20 p-10"
            >
              <Component />
            </div>
          );
        })}
      </div>
      <div className="flex items-center text-xs px-2 justify-between border-t border-gray-700 p-2 w-screen text-[#535356]">
        <div>@ {year} JOVEN MIRAN</div>
        <div>BUILT IN REACT & NODEJS</div>
      </div>
    </div>
  );
};

export default index;
