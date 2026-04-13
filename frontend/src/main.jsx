import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./styles/index.css";
import { EditorProvider } from "./context/EditorContext.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <EditorProvider>
        <App />
      </EditorProvider>
    </ThemeProvider>
  </StrictMode>,
);
