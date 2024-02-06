import { IRequest, IResponse } from "../../types/express";
import { NextFunction } from "express";
import { AppError } from "../../utils/appError";
import { catchAsync } from "../../utils/catchAsync";
import { getAllMoviesSortedService, getMovieByIdService, createMovieService, deleteMovieService, getMoviesByCreatorService } from '../../services/movie';
import { IMovie } from "../../types/movie";


export const getAllMovies = catchAsync(
  async (req: IRequest, res: IResponse, next: NextFunction) => {
    const searchName = (req.query.name as string) || "";

    const movies = await getAllMoviesSortedService(searchName);

    if (!movies) {
      return next(new AppError('No movies available on platform', 404))
    }

    return res.status(200).json({
      message: "success",
      data: movies,
      length: movies?.length,
    });
  }
);

export const getMovie = catchAsync(async (req: IRequest, res: IResponse, next: NextFunction) => {

    const movieId = req.params.id

    const movie = await getMovieByIdService(movieId);

    if (!movie) {
        return next(new AppError('No such movie available on platform', 404))
      }

    return res.status(200).json({
        message: "success",
        data: movie
    });
});

export const getMoviesByCreator = catchAsync(async (req: IRequest, res: IResponse, next: NextFunction) => {

    const movies = await getMoviesByCreatorService(req.user.id);

    if (!movies) {
        return next(new AppError('No movies found to be created by user', 401))
      }

    return res.status(200).json({
        message: "success",
        length: movies?.length,
        data: movies
    });
});

export const createMovie = catchAsync(async (req: IRequest, res: IResponse, next: NextFunction) => {

    const { name, description, year, image, video, genre } = req.body;

    const createdMovie = await createMovieService({ name, description, year, image, video, genre, creator: req.user.id } as IMovie);

    if (!createdMovie) {
        return next(new AppError('Movie creation process failed', 400))
      }

    return res.status(200).json({
        message: "success",
        data: createdMovie
    });
});

export const deleteMovie = catchAsync(async (req: IRequest, res: IResponse, next: NextFunction) => {

    const deletedMovie = await deleteMovieService(req.user.id, req.params.id);

    if (!deletedMovie) {
        return next(new AppError('Movie deletion process failed', 400))
      }

    return res.status(204).json({
        message: "success"
    });
});




