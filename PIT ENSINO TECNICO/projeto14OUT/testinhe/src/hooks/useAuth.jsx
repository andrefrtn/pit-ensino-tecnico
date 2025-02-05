import { useContext } from "react";
import { AuthContext } from "../contexts/auth"; // Certifique-se de usar o caminho correto

const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;
