// app/services/todoService.ts
export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

let todos: Todo[] = [
  { id: 1, title: "Learn Next.js", completed: false },
  { id: 2, title: "Convert app to TypeScript", completed: true },
  { id: 3, title: "Migrate to Vue.js", completed: false },
];

// Simulate fetching todos (like an API call)
export async function fetchTodos(): Promise<Todo[]> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(todos), 500);
  });
}

// Simulate adding a todo
export async function addTodo(todo: Todo): Promise<Todo> {
  todos.push(todo);
  return new Promise((resolve) => {
    setTimeout(() => resolve(todo), 300);
  });
}

// Simulate updating a todo
export async function updateTodo(updated: Todo): Promise<Todo> {
  todos = todos.map((t) => (t.id === updated.id ? updated : t));
  return new Promise((resolve) => {
    setTimeout(() => resolve(updated), 300);
  });
}

// Simulate deleting a todo
export async function deleteTodo(id: number): Promise<number> {
  todos = todos.filter((t) => t.id !== id);
  return new Promise((resolve) => {
    setTimeout(() => resolve(id), 300);
  });
}
