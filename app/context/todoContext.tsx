"use client";
import { createContext, useContext, useState, useEffect } from "react";

type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

type TodoContextType = {
  todos: Todo[];
  addTodo: (todo: Todo) => void;
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
  getTodoById: (id: number) => Todo | undefined;
};

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export function TodoProvider({ children }: { children: React.ReactNode }) {
  const [todos, setTodos] = useState<Todo[]>([]);

  // ✅ Load from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("todos");
    if (stored) {
      setTodos(JSON.parse(stored));
    }
  }, []);

  // ✅ Save to localStorage whenever todos change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (todo: Todo) => setTodos((prev) => [...prev, todo]);

  const toggleTodo = (id: number) =>
    setTodos((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );

  const deleteTodo = (id: number) =>
    setTodos((prev) => prev.filter((t) => t.id !== id));

  const getTodoById = (id: number) => todos.find((t) => t.id === id);

  return (
    <TodoContext.Provider
      value={{ todos, addTodo, toggleTodo, deleteTodo, getTodoById }}
    >
      {children}
    </TodoContext.Provider>
  );
}

export function useTodos() {
  const context = useContext(TodoContext);
  if (!context) throw new Error("useTodos must be used within a TodoProvider");
  return context;
}
