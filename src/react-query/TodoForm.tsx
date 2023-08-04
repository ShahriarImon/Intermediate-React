import { Add, Cached, Refresh } from "@mui/icons-material";
import { Button, OutlinedInput, Stack } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React, { useRef } from "react";
import { Todo, todoQuery } from "./Hooks/useTodos";
import { Alert, Form } from "react-bootstrap";
import useAddTodo from "./Hooks/Mutation/useAddTodo";

// const postData = ;

export interface queryProps {
  query: todoQuery;
}
const TodoForm = ({ query }: queryProps) => {
  const fieldRef = useRef<HTMLInputElement>(null);
  const handleClearField = () => {
    if (fieldRef.current) fieldRef.current.value = "";
  };

  const addTodo = useAddTodo(query, handleClearField);
  const handleAdd = () => {
    if (fieldRef.current && fieldRef.current.value) {
      console.log("hello", fieldRef.current?.value);
      addTodo.mutate({
        id: 0,
        title: fieldRef.current?.value,
        completed: false,
        userId: 1,
      });
    }
  };
  return (
    <>
      {addTodo?.error && (
        <Alert variant={"danger"}>{addTodo?.error?.message}</Alert>
      )}
      <Stack
        direction={"row"}
        justifyContent={"left"}
        alignItems={"center"}
        spacing={2}
        mb={3}
      >
        <Form.Control
          size="sm"
          type="text"
          style={{ width: "400px" }}
          ref={fieldRef}
        />
        <Button
          disabled={addTodo?.isLoading}
          variant="outlined"
          size="small"
          onClick={handleAdd}
        >
          <Add />
          {/* {addTodo?.isLoading ? <Cached /> : <Add />} */}
        </Button>
      </Stack>
    </>
  );
};

export default TodoForm;
