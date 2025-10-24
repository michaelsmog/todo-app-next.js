import React, { useState } from "react";
import { useTodos } from "../context/TodoContext";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Todos() {
  const { todos, addTodo, toggleTodo, deleteTodo } = useTodos();

  const [newTodo, setNewTodo] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

  const handleAddTodo = () => {
    if (newTodo.trim() === "") return;
    addTodo(newTodo.trim());
    setNewTodo("");
  };

  const handleToggle = (id) => {
    toggleTodo(id);
  };

  const handleDelete = (id) => {
    deleteTodo(id);
  };

  // Filtering
  const filteredTodos = todos.filter((todo) => {
    const matchesSearch = todo.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filter === "all" ||
      (filter === "active" && !todo.completed) ||
      (filter === "completed" && todo.completed);
    return matchesSearch && matchesFilter;
  });

  // Pagination logic
  const startIndex = (page - 1) * itemsPerPage;
  const paginatedTodos = filteredTodos.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(filteredTodos.length / itemsPerPage);

  return (
    <div className="max-w-md mx-auto mt-10 p-4 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">My Todo App</h1>

      {/* Add new todo */}
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

      {/* Search and Filter */}
      <div className="flex mb-4 gap-2">
        <input
          className="border p-2 flex-1"
          type="text"
          placeholder="Search todos"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="border p-2 rounded"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      {/* Todo list */}
      <ul>
        {paginatedTodos.map((todo) => (
          <li key={todo.id} className="flex justify-between items-center mb-2">
            <Link to={`/todos/${todo.id}`}>
              <span
                onClick={() => handleToggle(todo.id)}
                className={`cursor-pointer ${todo.completed ? "line-through text-gray-400" : ""}`}
              >
                {todo.title}
              </span>
            </Link>
            <Button variant="destructive" size="sm" onClick={() => handleDelete(todo.id)}>
              Delete
            </Button>
          </li>
        ))}
      </ul>

      {/* Pagination */}
      <div className="flex justify-between mt-4">
        <Button onClick={() => setPage((p) => Math.max(p - 1, 1))} disabled={page === 1}>
          Prev
        </Button>
        <span>Page {page} of {totalPages}</span>
        <Button onClick={() => setPage((p) => Math.min(p + 1, totalPages))} disabled={page === totalPages}>
          Next
        </Button>
      </div>
    </div>
  );
}
