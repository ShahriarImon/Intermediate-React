import { Grid } from "@mui/material";
import PostList from "./react-query/PostList";
import TodoList from "./react-query/TodoList";
import AuthProvider from "./Context/AuthProvider";

function App() {
  return (
    <AuthProvider>
      <div>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TodoList />
          </Grid>
          <Grid item xs={6}>
            <PostList />
          </Grid>
        </Grid>
      </div>
    </AuthProvider>
  );
}

export default App;
