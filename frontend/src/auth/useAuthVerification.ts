import { useContext, useEffect, useState } from "react";
import { verifyUser } from "../api/user";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";

const useAuthVerification = () => {
  const [isPageLoading, setPageLoading] = useState(true);
  const { setIsLoggedIn, updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        const user = await verifyUser(token);
        if (user) {
          setIsLoggedIn(true);
          updateUser({ ...user, token: token });
        } else {
          localStorage.removeItem("token");
          setIsLoggedIn(false);
          updateUser(null);
          toast("Session Expired! ", {
            duration: 4000,
          });
          navigate("/login");
        }
      } else {
        toast("You are currently using the system as guest", { duration: 2000 });
        navigate("/login");
      }

      setPageLoading(false);
    };
    verifyToken();
  }, []);

  return { isPageLoading };
};

export default useAuthVerification;
