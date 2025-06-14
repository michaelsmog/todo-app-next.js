import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function TodoDetail() {
  const navigate = useNavigate();
  const location = useLocation();
  const todo = location.state?.todo;

  if (!todo) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>No todo found.</p>
        <Button className="ml-4" onClick={() => navigate(-1)}>Back</Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Todo Details</h1>
      <div className="p-4 bg-white shadow rounded w-80 mb-4">
        <p><strong>ID:</strong> {todo.id}</p>
        <p><strong>Title:</strong> {todo.title}</p>
        <p><strong>Completed:</strong> {todo.completed ? "✅" : "❌"}</p>
      </div>
      <Button onClick={() => navigate(-1)}>Back</Button>
    </div>
  );
}
