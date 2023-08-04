import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useTodos from "./Hooks/useTodos";
import { MenuItem, Select, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import TodoForm from "./TodoForm";
import useAuth from "../Hooks/useAuth";

const TodoList = () => {
  const [userId, setUserId] = useState<number>();
  const [pageNo, setPageNo] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const { data: todoList } = useTodos({ userId, pageNo, pageSize });
  const { user, dispatch } = useAuth();

  return (
    <>
      <Stack
        direction="row"
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Form.Select
          aria-label="Default select example"
          value={userId}
          size="sm"
          onChange={(e) => setUserId(parseInt(e.target.value))}
          style={{ width: "20%", marginBottom: "20px" }}
        >
          <option>select User</option>
          <option value="1">User -1</option>
          <option value="2">User -2</option>
          <option value="3">User -3</option>
        </Form.Select>{" "}
        <TodoForm query={{ userId, pageNo, pageSize }} />
      </Stack>
      <Typography sx={{}} mb={1}>
        {user?.username}
      </Typography>
      <ul className="list-group">
        {todoList?.map((todo) => (
          <li key={todo.id} className="list-group-item">
            {todo.title}
          </li>
        ))}
      </ul>
      <Stack direction="row" gap={2} mt={2}>
        {pageNo > 1 && (
          <Button
            variant="danger"
            onClick={() => setPageNo(pageNo > 1 ? pageNo - 1 : 0)}
          >
            Back
          </Button>
        )}
        {pageNo != pageSize && (
          <Button variant="info" onClick={() => setPageNo(pageNo + 1)}>
            Next
          </Button>
        )}
      </Stack>
    </>
  );
};

export default TodoList;
