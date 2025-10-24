import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { TodoProvider } from "./context/TodoContext";
import Todos from "./pages/Todos";
import TodoDetail from "./pages/TodoDetail";
import NotFound from "./pages/NotFound";
import "./index.css";

const router = createBrowserRouter([
  { path: "/", element: <Todos /> },
  { path: "/todos/:id", element: <TodoDetail /> },
  { path: "*", element: <NotFound /> },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <TodoProvider>
      <RouterProvider router={router} />
    </TodoProvider>
  </React.StrictMode>
);
