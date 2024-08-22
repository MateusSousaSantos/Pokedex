import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Pokedex from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <header>
      <h1>Pokedex Mateus Sousa</h1>
    </header>
    <Pokedex />
  </StrictMode>
);
