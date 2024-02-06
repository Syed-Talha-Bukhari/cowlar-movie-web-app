import express from 'express';
import { getAllMovies } from '../../controllers/movie/movie';

const movieRouter = express.Router();

movieRouter.route('/').get(getAllMovies);

export {movieRouter};

