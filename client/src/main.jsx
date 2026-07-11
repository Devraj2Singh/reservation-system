import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import "./styles/global.css";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")).render(

    <BrowserRouter>
  <AuthProvider>
    <App />
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 2500,
      }}
    />
  </AuthProvider>
</BrowserRouter>

);