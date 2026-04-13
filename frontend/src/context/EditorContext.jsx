import { createContext, useContext, useState } from "react";

const EditorContext = createContext(null);

export const EditorProvider = ({ children }) => {
  const [activeEditor, setActiveEditor] = useState(null);
  const [toolBarVisible, setToolBarVisible] = useState(false);

  const registerEditor = (editor) => {
    setActiveEditor(editor);
    setToolBarVisible(true);
  };

  const unregisterEditor = (editor) => {
    setActiveEditor(null);
    setToolBarVisible(false);
  };

  return (
    <EditorContext.Provider
      value={{ activeEditor, toolBarVisible, registerEditor, unregisterEditor }}
    >
      {children}
    </EditorContext.Provider>
  );
};

export const useEditorContext = () => useContext(EditorContext);
