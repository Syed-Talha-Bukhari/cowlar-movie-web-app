import axios from "../config/config";
import IMovie from "../types/movies";
import toast from "react-hot-toast";

export const getAllMovies = async (search: string) => {
  try {
    const res = await axios.get(`/movies?name=${search}`);
    if (res.status === 200 && res.data.message === "success") {
      return {
        data: res.data.data,
      };
    }
  } catch (error: any) {
    console.log("Failed to fetch movies", error);
    toast.error(error?.response?.data?.message);
  }
  return null;
};

export const getMoviesByCreator = async (token: string) => {
  try {
    const res = await axios.get(`/movies/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.status === 200 && res.data.message === "success") {
      return {
        data: res.data.data,
      };
    }
  } catch (error: any) {
    console.log("Failed to fetch creator movies", error);
    toast.error(error?.response?.data?.message);
  }
  return null;
};

export const getMovie = async (id: string) => {
  try {
    const res = await axios.get(`/movies/${id}`);
    if (res.status === 200 && res.data.message === "success") {
      return {
        data: res.data.data,
      };
    }
  } catch (error: any) {
    console.log("Failed to fetch movie details", error);
    toast.error(error?.response?.data?.message);
  }
  return null;
};

export const createMovie = async (movie: IMovie, token: string) => {
  try {
    const res = await axios.post(
      "/movies",
      { ...movie },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (res.status === 200 && res.data.message === "success") {
      return {
        data: res.data.data,
      };
    }
  } catch (error: any) {
    console.log("Unable to create a new movie", error);
    toast.error(error?.response?.data?.message);
  }
  return null;
};

export const deleteMovie = async (movieId: string, token: string) => {
  try {
    const res = await axios.delete(`/movies/${movieId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.status === 204) {
      return {
        deleted: true,
      };
    }
  } catch (error: any) {
    console.log("Unable to delete movie", error);
    toast.error(error?.response?.data?.message);
  }
  return null;
};
