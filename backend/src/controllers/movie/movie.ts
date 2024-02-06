import { IRequest, IResponse } from "../../types/express";
import { NextFunction } from "express";
import { AppError } from "../../utils/appError";
import { catchAsync } from "../../utils/catchAsync";
import { getAllMoviesSorted } from "../../services/movie/movie";


export const getAllMovies = catchAsync(
  async (req: IRequest, res: IResponse) => {
    const searchName = (req.query.name as string) || "";

    const movies = await getAllMoviesSorted(searchName);

    if (!movies) {
      return res.status(404).json({
        message: "fail",
        data: "No movies available on platform",
      });
    }

    return res.status(200).json({
      message: "success",
      data: movies,
    });
  }
);

