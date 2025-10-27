"use client";

import Link from "next/link";
import { useTodos } from "./context/todoContext";
import { useState } from "react";

export default function HomePage() {
  const { todos, addTodo, toggleTodo, deleteTodo } = useTodos();
  const [title, setTitle] = useState("");

  const handleAdd = () => {
    if (title.trim() === "") return;
    addTodo({
      id: Date.now(),
      title,
      completed: false,
    });
    setTitle("");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-4">
      <h1 className="text-3xl font-bold mb-4">My Todo App</h1>

      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Add a new todo"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 rounded"
        />
        <button
          onClick={handleAdd}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add
        </button>
      </div>

      <ul className="mt-6 space-y-2 w-64">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="flex justify-between items-center border-b pb-2"
          >
            <Link href={`/todo/${todo.id}`} className="text-blue-600">
              {todo.title}
            </Link>
            <div className="flex gap-2">
              <button
                onClick={() => toggleTodo(todo.id)}
                className="text-sm text-green-600"
              >
                {todo.completed ? "Undo" : "Done"}
              </button>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="text-sm text-red-600"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
