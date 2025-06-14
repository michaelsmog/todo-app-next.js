import React, { createContext, useContext, useState } from "react";

// Create the context
const TodoContext = createContext();

// Provide the context to your app
export function TodoProvider({ children }) {
  const [todos, setTodos] = useState([
    { id: 1, title: "Learn React", completed: false },
    { id: 2, title: "Build Todo App", completed: true },
  ]);

  // Add todo
  const addTodo = (title) => {
    const newTodo = { id: Date.now(), title, completed: false };
    setTodos((prev) => [newTodo, ...prev]);
  };

  // Toggle todo
  const toggleTodo = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Delete todo
  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  // Get single todo by id
  const getTodo = (id) => {
    return todos.find((todo) => todo.id === parseInt(id));
  };

  return (
    <TodoContext.Provider value={{ todos, addTodo, toggleTodo, deleteTodo, getTodo }}>
      {children}
    </TodoContext.Provider>
  );
}

// Hook to use the context
export function useTodos() {
  return useContext(TodoContext);
}
