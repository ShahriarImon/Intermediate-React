import { useContext } from "react";
import { UserContext } from "../Context/AuthProvider";

const useAuth = () => useContext(UserContext);

export default useAuth;
