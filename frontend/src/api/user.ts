import toast from "react-hot-toast";
import axios from "../config/config";
import { INewUser } from '../types/user';

export const loginUser = async (email: string, password: string) => {
  try {
    const res = await axios.post(
      "/auth/login",
      {
        email,
        password,
      },
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      }
    );
    if (res.status === 200 && res.data.message === "success") {
      toast.success("Logged In Successfully!", {
        duration: 2000,
      });
      return {
        user: res.data.data,
        token: res.data.token,
      };
    }
  } catch (error: any) {
    console.log("Error logging in!", error);
    toast.error(error?.response?.data?.message);
  }
  return null;
};

export const signUpUser = async ( user: INewUser) => {
  try {
    const res = await axios.post("/auth/signup", {
      user
    });
    if (res.status === 200 && res.data.message === "success") {
      toast.success("User Registered Successfully!", {
        duration: 2000,
      });
      return {
        user: res.data.data,
        token: res.data.token,
      };
    }
  } catch (error: any) {
    console.log("Error in User Regustration", error);
    toast.error(error?.response?.data?.message);
  }
  return null;
};

export const verifyUser = async (token: string) => {
  try {
    const response = await axios.get("/auth/verify-user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      return response.data.data;
    } else {
      throw new Error("Token Not Verified");
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};
