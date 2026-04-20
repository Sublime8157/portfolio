import { createContext, useContext } from "react";
import { usePageRows } from "../hooks/usePageRows.js";

const PageRowContext = createContext(null);

export const PageRowProvider = ({ children }) => {
  const pageRows = usePageRows();
  return (
    <PageRowContext.Provider value={pageRows}>
      {children}
    </PageRowContext.Provider>
  );
};

export const usePageRowContext = () => useContext(PageRowContext);
