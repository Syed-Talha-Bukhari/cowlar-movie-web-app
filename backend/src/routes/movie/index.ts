import express from 'express';
import { getAllMovies, getMovie, getMoviesByCreator, createMovie, deleteMovie } from '../../controllers/movie';
import { isAuthenticated } from '../../middlewares/auth/isAuthenticated';

const movieRouter = express.Router();

movieRouter.route('/').get(getAllMovies).post(isAuthenticated, createMovie);
movieRouter.route('/me').get(isAuthenticated, getMoviesByCreator);
movieRouter.route('/:id').get(getMovie).delete(isAuthenticated, deleteMovie);

export {movieRouter};

