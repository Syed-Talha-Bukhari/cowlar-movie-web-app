import { IRequest, IResponse } from "../../types/express";
import { NextFunction } from "express";
import { AppError } from "../../utils/appError";
import { catchAsync } from "../../utils/catchAsync";
import {
  getAllMoviesSortedService,
  getMovieByIdService,
  createMovieService,
  deleteMovieService,
  getMoviesByCreatorService,
  checkDuplicateMovieService
} from "../../services/movie";
import { IMovie } from "../../types/movie";

export const getAllMovies = catchAsync(
  async (req: IRequest, res: IResponse, next: NextFunction) => {
    const searchName = (req.query.name as string) || "";

    const movies = await getAllMoviesSortedService(searchName);

    if (!movies) {
      return next(new AppError("No movies available on platform", 404));
    }

    return res.status(200).json({
      message: "success",
      data: movies,
      length: movies?.length,
    });
  }
);

export const getMovie = catchAsync(
  async (req: IRequest, res: IResponse, next: NextFunction) => {
    const movieId = req.params.id;
    if (!movieId) {
      return next(new AppError("Specific Movie ID was not provided", 400));
    }

    const movie = await getMovieByIdService(movieId);

    if (!movie) {
      return next(new AppError("No such movie available on platform", 404));
    }

    return res.status(200).json({
      message: "success",
      data: movie,
    });
  }
);

export const getMoviesByCreator = catchAsync(
  async (req: IRequest, res: IResponse, next: NextFunction) => {
    const movies = await getMoviesByCreatorService(req.user.id);

    if (!movies) {
      return next(new AppError("No movies found to be created by user", 404));
    }

    return res.status(200).json({
      message: "success",
      length: movies?.length,
      data: movies,
    });
  }
);

export const createMovie = catchAsync(
  async (req: IRequest, res: IResponse, next: NextFunction) => {

    const { name, description, year, image, video, genre } = req.body;

    const existingMovie = await checkDuplicateMovieService(name);

    if (existingMovie) {
      return next(new AppError("A movie with this name is already present. Choose another name", 409));
    }

    const createdMovie = await createMovieService({
      name,
      description,
      year,
      image,
      video,
      genre,
      creator: req.user.id,
    } as IMovie);

    if (!createdMovie) {
      return next(new AppError("Movie creation process failed", 500));
    }

    return res.status(201).json({
      message: "success",
      data: createdMovie,
    });
  }
);

export const deleteMovie = catchAsync(
  async (req: IRequest, res: IResponse, next: NextFunction) => {
    const movieId = req.params.id;
    if (!movieId) {
      return next(new AppError("Specific Movie ID was not provided", 400));
    }

    const deletedMovie = await deleteMovieService(req.user.id, movieId);

    if (!deletedMovie) {
      return next(new AppError("Movie deletion process failed", 404));
    }

    return res.status(204).json({
      message: "success",
    });
  }
);
