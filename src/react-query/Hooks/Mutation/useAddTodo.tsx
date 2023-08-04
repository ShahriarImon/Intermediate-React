import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { Todo, todoQuery } from "../useTodos";
import useTodoService from "../../services/useTodoService";

interface previousDataContext {
  previousData: Todo[];
}

const useAddTodo = (query: todoQuery, onAdd: () => void) => {
  const queryClient = useQueryClient();
  const todoService = useTodoService(query);
  return useMutation<Todo, Error, Todo, previousDataContext>({
    mutationFn: (data) => todoService.post(data),
    // mutationFn: (data) =>
    //   axios
    //     .post("https://jsonplaceholder.typicode.com/todos", data)
    //     .then((res) => res.data),

    // ...............For optimistic Update................

    onMutate: (newTodo) => {
      const previousData =
        queryClient?.getQueryData<Todo[]>(["todos", query]) || [];

      queryClient?.setQueryData<Todo[]>(["todos", query], (todos = []) => [
        newTodo,
        ...todos,
      ]);
      return { previousData };
    },

    onSuccess: (savedTodo, newTodo, context) => {
      // ...............For optimistic Update................

      queryClient?.setQueryData<Todo[]>(["todos", query], (todos) =>
        todos?.map((todo) => (todo === newTodo ? savedTodo : todo))
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
      queryClient?.setQueryData<Todo[]>(["todos", query], (todos) => [
        ...context?.previousData,
      ]);
    },
  });
};

export default useAddTodo;
