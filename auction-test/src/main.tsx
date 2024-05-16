import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import routes from "./constants/routes.tsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
const router = createBrowserRouter(routes);
ReactDOM.createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
