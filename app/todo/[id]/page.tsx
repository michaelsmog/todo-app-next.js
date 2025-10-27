"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useTodos } from "../../context/todoContext";

export default function TodoDetail() {
  const params = useParams();
  const id = params.id as string;
  const { getTodoById } = useTodos();
  const todo = getTodoById(Number(id));

  if (!todo) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h2 className="text-xl mb-4">Todo not found</h2>
        <Link href="/" className="text-blue-500 underline">Back to Todos</Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-2xl font-bold mb-2">{todo.title}</h2>
      <p className="mb-4">
        Status: {todo.completed ? "Completed" : "Incomplete"}
      </p>
      <Link href="/" className="text-blue-500 underline">Back to Todos</Link>
    </div>
  );
}
