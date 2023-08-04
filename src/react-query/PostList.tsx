import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useTodos from "./Hooks/useTodos";
import { MenuItem, Select, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import TodoForm from "./TodoForm";
import usePosts from "./Hooks/usePosts";
import PostForm from "./PostForm";
import useAuth from "../Hooks/useAuth";

const PostList = () => {
  const [userId, setUserId] = useState<number>();
  const [pageNo, setPageNo] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(5);
  const { data: postList } = usePosts({ userId, pageNo, pageSize });
  const { user, dispatch } = useAuth();

  return (
    <>
      <Stack
        direction="row"
        justifyContent={"space-between"}
        alignItems={"flex-start"}
      >
        <Stack sx={{ minWidth: "30%" }}>
          <Form.Select
            aria-label="Default select example"
            value={userId}
            size="sm"
            onChange={(e) => setUserId(parseInt(e.target.value))}
            style={{ width: "70%", marginBottom: "20px" }}
          >
            <option>select User</option>
            <option value="1">User -1</option>
            <option value="2">User -2</option>
            <option value="3">User -3</option>
          </Form.Select>

          {user?.userId ? (
            <Button
              variant="danger"
              size="sm"
              style={{ width: "100px" }}
              onClick={() => dispatch({ type: "logout" })}
            >
              Log out
            </Button>
          ) : (
            <Button
              variant="success"
              size="sm"
              style={{ width: "100px" }}
              onClick={() =>
                dispatch({ type: "login", userId: 1000, username: "Imon" })
              }
            >
              Login
            </Button>
          )}
        </Stack>
        <PostForm query={{ userId, pageNo, pageSize }} />
      </Stack>

      <ul className="list-group">
        {postList?.map((todo) => (
          <li key={todo.id} className="list-group-item">
            {todo.title}
          </li>
        ))}
      </ul>
      <Stack direction="row" spacing={2} mt={2}>
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

export default PostList;
