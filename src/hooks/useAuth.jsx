import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext/AuthContext";

export const useAuth = () => {
  // Your authentication logic here
  return useContext(AuthContext);
};
