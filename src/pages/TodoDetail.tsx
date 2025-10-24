import React from "react";
import { useParams, Link } from "react-router-dom";
import { useTodos } from "../context/TodoContext";

export default function TodoDetail() {
  const { id } = useParams();
  const { getTodoById } = useTodos();
  const todo = getTodoById(id);

  if (!todo) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h2 className="text-xl mb-4">Todo not found</h2>
        <Link to="/" className="text-blue-500 underline">Back to Todos</Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-2xl font-bold mb-2">{todo.title}</h2>
      <p className="mb-4">
        Status: {todo.completed ? "Completed" : "Incomplete"}
      </p>
      <Link to="/" className="text-blue-500 underline">Back to Todos</Link>
    </div>
  );
}
