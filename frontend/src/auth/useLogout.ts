import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";
import toast from "react-hot-toast";

const useLogOut = () => {
  const navigate = useNavigate();
  const { setIsLogged, updateUser } = useContext(UserContext);

  const logout = () => {
    localStorage.removeItem("token");
    setIsLogged(false);
    updateUser(null);
    toast("Loggin Out", {
      duration: 2000,
    });
    navigate("/login");
  };
  return { logout };
};
export default useLogOut;
