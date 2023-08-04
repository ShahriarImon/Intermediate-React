import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { todoQuery } from "../useTodos";
import usePostService, { Post } from "../../services/usePostService";

interface previousDataContext {
  previousData: Post[];
}

const useAddPost = (query: todoQuery, onAdd: () => void) => {
  const queryClient = useQueryClient();
  const postService = usePostService(query);
  return useMutation<Post, Error, Post, previousDataContext>({
    mutationFn: (data) => postService.post(data),
    // mutationFn: (data) =>
    //   axios
    //     .post("https://jsonplaceholder.typicode.com/todos", data)
    //     .then((res) => res.data),

    // ...............For optimistic Update................

    onMutate: (newPost) => {
      const previousData =
        queryClient?.getQueryData<Post[]>(["posts", query]) || [];

      queryClient?.setQueryData<Post[]>(["posts", query], (posts = []) => [
        newPost,
        ...posts,
      ]);
      return { previousData };
    },

    onSuccess: (savedPost, newPost, context) => {
      // ...............For optimistic Update................

      queryClient?.setQueryData<Post[]>(["posts", query], (posts) =>
        posts?.map((post) => (post === newPost ? savedPost : post))
      );

      // ...............For normal update................

      // queryClient?.setQueryData<Todo[]>(["todos", query], (todos = []) => [
      //   savedTodo,
      //   ...todos,
      // ]);

      onAdd();
    },

    // ...............For optimistic Update................

    onError: (error, newTodo, context) => {
      if (!context?.previousData) return;
      queryClient?.setQueryData<Post[]>(["posts", query], (posts) => [
        ...context?.previousData,
      ]);
    },
  });
};

export default useAddPost;
