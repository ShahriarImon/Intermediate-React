import { postQuery } from "../Hooks/usePosts";
import { todoQuery } from "../Hooks/useTodos";
import APIClient from "./apiClient";

export interface Post {
  id: number;
  title: string;
  userId: number;
  body: string;
}

const usePostService = (query: postQuery) => {
  return new APIClient<Post>("/posts", query);
};
export default usePostService;
