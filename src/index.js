import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BotsContextProvider } from "./contexts/BotsContext";
import { AuthContextProvider } from "./contexts/AuthContext";
import { MatchesContextProvider } from "./contexts/MatchesContext";
import { SelectedTMContextProvider } from "./contexts/SelectedTMContext";
import { TMContextProvider } from "./contexts/TMContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <TMContextProvider>
        <SelectedTMContextProvider>
          <BotsContextProvider>
            <MatchesContextProvider>
              <App />
            </MatchesContextProvider>
          </BotsContextProvider>
        </SelectedTMContextProvider>
      </TMContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
