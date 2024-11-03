import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import { GameProvider } from "./context/GameContext.tsx";
import { Analytics } from "@vercel/analytics/react";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <GameProvider>
      <App />
      <Analytics />
    </GameProvider>
  </BrowserRouter>
);
