import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
// import { UserProvider } from "./user";
import { AuthContextProvider } from "./user";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <UserProvider>
  <React.StrictMode>
    <AuthContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthContextProvider>
  </React.StrictMode>
  // </UserProvider>
);
