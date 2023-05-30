import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./Components/Home/Home.jsx";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import All from "./Components/All/All";
import Album from "./Components/Album/Album";

const Router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/all", element: <All /> },
  { path: "/album", element: <Album /> },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={Router} />
  </React.StrictMode>
);
