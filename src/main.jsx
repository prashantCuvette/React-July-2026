import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { BrowserRouter } from "react-router";
import { Toaster } from "react-hot-toast";
import { TaskProvider } from "./contexts/Task.jsx";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <TaskProvider>
      <Toaster />
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </TaskProvider>
  </AuthProvider>
);
