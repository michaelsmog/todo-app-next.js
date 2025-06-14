// src/pages/TodoDetail.jsx

import React from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function TodoDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const saved = localStorage.getItem("todos");
  const todos = saved ? JSON.parse(saved) : [];
  const todo = todos.find((t) => t.id === Number(id));

  if (!todo) {
    return (
      <div className="flex flex-col items-center mt-20">
        <h2 className="text-xl font-bold mb-4">No todo found 😕</h2>
        <button
          className="bg-gray-800 text-white px-4 py-2 rounded"
          onClick={() => navigate(-1)}
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Todo Details</h2>
      <p>
        <strong>ID:</strong> {todo.id}
      </p>
      <p>
        <strong>Title:</strong> {todo.title}
      </p>
      <p>
        <strong>Completed:</strong> {todo.completed ? "Yes" : "No"}
      </p>
      <button
        className="mt-4 bg-gray-800 text-white px-4 py-2 rounded"
        onClick={() => navigate(-1)}
      >
        Back
      </button>
    </div>
  );
}
