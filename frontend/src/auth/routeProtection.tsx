import {useContext, ReactNode} from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/userContext";
import toast from "react-hot-toast";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { isLogged } = useContext(UserContext);

  if (isLogged) return <>{children}</>
  else{
    toast("You need to login to access the resource!");
    return <Navigate to="/login" replace />
  }
};

export default ProtectedRoute;
