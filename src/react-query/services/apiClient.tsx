import axios from "axios";
import React from "react";
import { Todo } from "./useTodoService";
import { todoQuery } from "../Hooks/useTodos";

const axiosInstance = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});
class APIClient<T> {
  endPoint: string;
  query: todoQuery;
  constructor(endPoint: string, query: todoQuery) {
    this.endPoint = endPoint;
    this.query = query;
  }
  getAll = () => {
    return axiosInstance
      .get<T[]>(this.endPoint, {
        params: {
          userId: this.query?.userId,
          _start: (this.query?.pageNo - 1) * this.query?.pageSize,
          _limit: this.query?.pageSize,
        },
      })
      .then((res) => res.data);
  };
  post = (data: T) => {
    return axiosInstance.post<T>(this.endPoint, data).then((res) => res.data);
  };
}

export default APIClient;
