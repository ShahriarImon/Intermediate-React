import {
  Dispatch,
  ReactNode,
  createContext,
  useReducer,
  useState,
} from "react";

type UserActionType = Login | Logout;

interface Login {
  type: "login";
  userId: number;
  username: string;
}
interface Logout {
  type: "logout";
}

interface User {
  userId: number | string;
  username: string;
}

const userReducer = (state: User, action: UserActionType): User => {
  switch (action.type) {
    case "login":
      return { ...state, userId: action.userId, username: action.username };

    case "logout":
      return { ...state, userId: "", username: "" };
    default:
      return state;
  }
};

interface userContextType {
  user: User;
  dispatch: Dispatch<UserActionType>;
}
export const UserContext = createContext<userContextType>(
  {} as userContextType
);

interface propsType {
  children: ReactNode;
}

const AuthProvider = ({ children }: propsType) => {
  const [user, dispatch] = useReducer(userReducer, {
    userId: "",
    username: "",
  });
  return (
    <UserContext.Provider value={{ user, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};
export default AuthProvider;
