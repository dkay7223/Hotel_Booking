import React from "react";
import { SearchContextProvider } from "./context/SearchContext";
import { AuthContextProvider } from "./context/authContext";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.scss";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <SearchContextProvider>
        <App />
      </SearchContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
