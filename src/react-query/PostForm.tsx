import { Add, Cached, Refresh } from "@mui/icons-material";
import { Button, OutlinedInput, Stack } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React, { useRef } from "react";
import { Alert, Form } from "react-bootstrap";
import useAddPost from "./Hooks/Mutation/useAddPost";
import { postQuery } from "./Hooks/usePosts";

// const postData = ;

export interface queryProps {
  query: postQuery;
}
const PostForm = ({ query }: queryProps) => {
  const fieldRefTitle = useRef<HTMLInputElement>(null);
  const fieldRefInfo = useRef<HTMLInputElement>(null);
  const handleClearField = () => {
    if (fieldRefInfo.current) fieldRefInfo.current.value = "";
    if (fieldRefTitle.current) fieldRefTitle.current.value = "";
  };

  const addPost = useAddPost(query, handleClearField);
  const handleAdd = () => {
    if (
      fieldRefTitle.current &&
      fieldRefTitle.current.value &&
      fieldRefInfo.current &&
      fieldRefInfo.current.value
    ) {
      addPost.mutate({
        id: 0,
        title: fieldRefTitle.current?.value,
        userId: 1,
        body: fieldRefInfo.current?.value,
      });
    }
  };
  return (
    <>
      {addPost?.error && (
        <Alert variant={"danger"}>{addPost?.error?.message}</Alert>
      )}
      <Stack
        // direction={"row"}
        justifyContent={"center"}
        alignItems={"flex-end"}
        spacing={2}
        mb={3}
      >
        <Form.Control
          size="sm"
          type="text"
          placeholder="Title"
          style={{ width: "400px" }}
          ref={fieldRefTitle}
        />
        <Form.Control
          size="sm"
          type="text"
          placeholder="Info"
          style={{ width: "400px" }}
          ref={fieldRefInfo}
        />
        <Button
          disabled={addPost?.isLoading}
          variant="outlined"
          size="small"
          onClick={handleAdd}
        >
          <Add />
          {/* {addPost?.isLoading ? <Cached /> : <Add />} */}
        </Button>
      </Stack>
    </>
  );
};

export default PostForm;
