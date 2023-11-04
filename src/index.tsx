// index.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import "./index.css";
import App from "./App";
import Error from "./pages/error";
import Home from "./pages/home";
import CreateTokenICP from "./pages/TokenGen/pages/erc20Standard";
import { AppRoutes } from "./shared/constants";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
