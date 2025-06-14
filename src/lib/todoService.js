import axios from "axios";

const API_BASE_URL = "https://jsonplaceholder.typicode.com/todos";

// Fetch todos with pagination
export const getTodos = async (page = 1, limit = 10) => {
  const response = await axios.get(`${API_BASE_URL}?_page=${page}&_limit=${limit}`);
  return response.data;
};

// Create new todo
export const createTodo = async (newTodo) => {
  const response = await axios.post(API_BASE_URL, newTodo);
  return response.data;
};

// Update todo
export const updateTodo = async (id, updatedTodo) => {
  const response = await axios.put(`${API_BASE_URL}/${id}`, updatedTodo);
  return response.data;
};

// Delete todo
export const deleteTodo = async (id) => {
  const response = await axios.delete(`${API_BASE_URL}/${id}`);
  return response.data;
};

// Fetch single todo
export const getTodo = async (id) => {
  const response = await axios.get(`${API_BASE_URL}/${id}`);
  return response.data;
};




