// src/pages/Todos.jsx

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const TODOS_PER_PAGE = 5;

export default function Todos() {
  const [newTodo, setNewTodo] = useState("");
  const [page, setPage] = useState(1);
  const [todos, setTodos] = useState([]);

  // Load todos from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("todos");
    if (saved) {
      setTodos(JSON.parse(saved));
    }
  }, []);

  // Save todos to localStorage on change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleAddTodo = () => {
    if (newTodo.trim() === "") return;
    const newItem = {
      id: Date.now(),
      title: newTodo,
      completed: false,
    };
    setTodos([newItem, ...todos]);
    setNewTodo("");
  };

  const handleDelete = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const handleToggle = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Pagination
  const startIndex = (page - 1) * TODOS_PER_PAGE;
  const paginatedTodos = todos.slice(startIndex, startIndex + TODOS_PER_PAGE);
  const totalPages = Math.ceil(todos.length / TODOS_PER_PAGE);

  const handleNext = () => setPage((p) => Math.min(p + 1, totalPages));
  const handlePrev = () => setPage((p) => Math.max(p - 1, 1));

  return (
    <div className="max-w-md mx-auto mt-10 p-4 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">My Todo App (Page {page})</h1>

      <div className="flex mb-4">
        <input
          className="border p-2 flex-1 rounded-l"
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add new todo"
        />
        <Button className="rounded-l-none" onClick={handleAddTodo}>
          Add
        </Button>
      </div>

      <ul>
        {paginatedTodos.map((todo) => (
          <li key={todo.id} className="flex justify-between items-center mb-2">
            <Link to={`/todos/${todo.id}`}>
              <span
                onClick={() => handleToggle(todo.id)}
                className={`cursor-pointer ${
                  todo.completed ? "line-through text-gray-400" : ""
                }`}
              >
                {todo.title}
              </span>
            </Link>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => handleDelete(todo.id)}
            >
              Delete
            </Button>
          </li>
        ))}
      </ul>

      <div className="flex justify-between mt-4">
        <Button disabled={page === 1} onClick={handlePrev}>
          Previous
        </Button>
        <Button disabled={page === totalPages} onClick={handleNext}>
          Next
        </Button>
      </div>
    </div>
  );
}
