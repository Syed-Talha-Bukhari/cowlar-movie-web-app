import express from 'express';
import { getAllMovieReviews, getOwnMoviewReview, getReview, createReview, deleteReview, updateReview } from '../../controllers/review';
import { isAuthenticated } from '../../middlewares/auth/isAuthenticated';

const reviewRouter = express.Router();

reviewRouter.route('/:movieId/reviews').get(getAllMovieReviews).post(isAuthenticated, createReview);
reviewRouter.route('/:movieId/reviews/me').get(isAuthenticated, getOwnMoviewReview)
reviewRouter.route('/:movieId/reviews/:reviewId').get(isAuthenticated, getReview).patch(isAuthenticated, updateReview).delete(isAuthenticated, deleteReview);

export {reviewRouter};

