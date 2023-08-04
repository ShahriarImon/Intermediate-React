import { todoQuery } from "../Hooks/useTodos";
import APIClient from "./apiClient";

export interface Todo {
  id: number;
  title: string;
  userId: number;
  completed: boolean;
}

const useTodoService = (query: todoQuery) => {
  return new APIClient<Todo>("/todos", query);
};
export default useTodoService;
