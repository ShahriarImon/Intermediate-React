import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const TodoList = () => {
  const fetchTodoList = () => {
    return axios
      .get("https://jsonplaceholder.typicode.com/todos")
      .then((res) => res.data);
  };
  const { data, error } = useQuery({
    queryKey: ["todoList"],
    queryFn: fetchTodoList,
  });
  console.log("query:", data);

  // if (isLoading) return <p>Loading...</p>;

  if (error) return <p>{error.message}</p>;

  return (
    <ul className="list-group">
      {data?.map((todo) => (
        <li key={todo.id} className="list-group-item">
          {todo.title}
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
