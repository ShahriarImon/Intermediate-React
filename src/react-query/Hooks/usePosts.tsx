import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import usePostService, { Post } from "../services/usePostService";

export interface postQuery {
  pageNo: number;
  pageSize: number;
  userId: number | undefined;
}

const usePosts = (query: postQuery) => {
  const todoService = usePostService(query);
  const fetchTodo = async () => {
    return axios
      .get<Post[]>("https://jsonplaceholder.typicode.com/todos", {
        params: {
          userId: query?.userId,
          _start: (query?.pageNo - 1) * query?.pageSize,
          _limit: query?.pageSize,
        },
      })
      .then((res) => res.data);
  };

  return useQuery<Post[], Error>({
    queryKey: ["posts", query],
    queryFn: todoService.getAll,
    // queryFn: fetchTodo,
    staleTime: 5000,
    keepPreviousData: true,
  });
};

export default usePosts;
