import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Buffer } from "buffer";
import App from "./app";

globalThis.Buffer = Buffer;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
