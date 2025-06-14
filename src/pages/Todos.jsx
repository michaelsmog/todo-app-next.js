import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Todos() {
  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [page, setPage] = useState(1);
  const TODOS_PER_PAGE = 5;

  const handleAddTodo = () => {
    if (newTodo.trim() === "") return;
    const newItem = {
      id: Date.now(),
      title: newTodo.trim(),
      completed: false,
    };
    setTodos([newItem, ...todos]);
    setNewTodo("");
  };

  const handleToggle = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleDelete = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const handleNext = () => {
    const maxPage = Math.ceil(todos.length / TODOS_PER_PAGE);
    if (page < maxPage) setPage((prev) => prev + 1);
  };

  const handlePrev = () => setPage((prev) => Math.max(prev - 1, 1));

  const paginatedTodos = todos.slice(
    (page - 1) * TODOS_PER_PAGE,
    page * TODOS_PER_PAGE
  );

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

      {paginatedTodos.length === 0 ? (
        <p className="text-gray-500">No todos on this page.</p>
      ) : (
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
      )}

      <div className="flex justify-between mt-4">
        <Button disabled={page === 1} onClick={handlePrev}>
          Previous
        </Button>
        <Button
          onClick={handleNext}
          disabled={page >= Math.ceil(todos.length / TODOS_PER_PAGE)}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
