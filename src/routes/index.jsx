import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Todos from "../pages/Todos";
import TodoDetail from "../pages/TodoDetail";
import NotFound from "../pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Todos />,
  },
  {
    path: "/todos/:id",
    element: <TodoDetail />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);


