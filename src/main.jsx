import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { logConfig } from "./__api__/Config.js";

// Log the configuration on app start
logConfig();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter
      basename="/RORO"
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <App />
    </BrowserRouter>
  </StrictMode>
);
