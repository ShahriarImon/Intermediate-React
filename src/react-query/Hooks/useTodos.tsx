import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useTodoService from "../services/useTodoService";

export interface Todo {
  id: number;
  title: string;
  userId: number;
  completed: boolean;
}
export interface todoQuery {
  pageNo: number;
  pageSize: number;
  userId: number | undefined;
}

const useTodos = (query: todoQuery) => {
  const todoService = useTodoService(query);
  const fetchTodo = async () => {
    return axios
      .get<Todo[]>("https://jsonplaceholder.typicode.com/todos", {
        params: {
          userId: query?.userId,
          _start: (query?.pageNo - 1) * query?.pageSize,
          _limit: query?.pageSize,
        },
      })
      .then((res) => res.data);
  };

  return useQuery<Todo[], Error>({
    queryKey: ["todos", query],
    queryFn: todoService.getAll,
    // queryFn: fetchTodo,
    staleTime: 5000,
    keepPreviousData: true,
  });
};

export default useTodos;
