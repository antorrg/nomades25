import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import { ToastContainer } from "react-toastify";
import axios from "axios";
import { BrowserRouter } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";
import store from "./redux/store.js";
import { AuthProvider } from "./Auth/AuthContext.jsx";
import { HelmetProvider } from "react-helmet-async";
import App from "./App.jsx";
import "./index.css";

const url = import.meta.env.VITE_URL;

axios.defaults.baseURL = url;

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HelmetProvider>
      <AuthProvider>
        <ReduxProvider store={store}>
          <BrowserRouter>
            <App />
            <ToastContainer />
          </BrowserRouter>
        </ReduxProvider>
      </AuthProvider>
    </HelmetProvider>
  </StrictMode>
);
