import { IRequest, IResponse } from "../../types/express";
import { NextFunction } from "express";
import { AppError } from "../../utils/appError";
import { catchAsync } from "../../utils/catchAsync";
import { getAllMovieReviewsService, getOwnMoviewReviewService, getReviewService, updateReviewService, deleteReviewService, createReviewService } from "../../services/review";


export const getAllMovieReviews = catchAsync(async (req: IRequest, res: IResponse, next: NextFunction) => {

    const movieId = req.params.movieId
    if (!movieId) {
      return next(new AppError('Specific Movie ID was not provided', 400))
    }

    const reviews = await getAllMovieReviewsService(movieId);

    if (!reviews) {
        return next(new AppError('No reviews available for this movie', 404));
      }

    return res.status(200).json({
        message: "success",
        length: reviews.length,
        data: reviews
    });
});

export const getOwnMoviewReview = catchAsync(async (req: IRequest, res: IResponse, next: NextFunction) => {

    const movieId = req.params.movieId
    if (!movieId) {
      return next(new AppError('Specific Movie ID was not provided', 400))
    }

    const review = await getOwnMoviewReviewService(movieId, req.user.id);

    if (!review) {
        return next(new AppError('User has added no review', 404));
      }

    return res.status(200).json({
        message: "success",
        data: review
    });
});

export const getReview = catchAsync(async (req: IRequest, res: IResponse, next: NextFunction) => {

    const movieId = req.params.movieId
    if (!movieId) {
      return next(new AppError('Specific Movie ID was not provided', 400))
    }

    const reviewId = req.params.reviewId
    if (!reviewId) {
      return next(new AppError('Specific Review ID was not provided', 400))
    }

    const review = await getReviewService(movieId, reviewId)

    if (!review) return next(new AppError("Review was not found on platform", 404))

    return res.status(200).json({
        message: "success",
        data: review
    });
});

export const createReview = catchAsync(async (req: IRequest, res: IResponse, next: NextFunction) => {

    const movieId = req.params.movieId
    if (!movieId) {
      return next(new AppError('Specific Movie ID was not provided', 400))
    }

    const existingReview = await getOwnMoviewReviewService(movieId, req.user.id);

    if (existingReview) {
      return next(new AppError('User has already added a review on this movie', 409));
    }

    const { rating, comment } = req.body;

    const review = await createReviewService(movieId, req.user.id, rating, comment);

    if (!review) return next(new AppError("Unable to create review", 404))

    return res.status(200).json({
        message: "success",
        data: review
    });
});

export const updateReview = catchAsync(async (req: IRequest, res: IResponse, next: NextFunction) => {

    const movieId = req.params.movieId
    if (!movieId) {
      return next(new AppError('Specific Movie ID was not provided', 400))
    }

    const reviewId = req.params.reviewId
    if (!reviewId) {
      return next(new AppError('Specific Review ID was not provided', 400))
    }

    const { rating, comment } = req.body;

    const review = await updateReviewService(movieId, reviewId, req.user.id, rating, comment);

    if (!review) return next(new AppError("Unable to update review", 404))

    return res.status(200).json({
        message: "success",
        data: review
    });
});


export const deleteReview = catchAsync(async (req: IRequest, res: IResponse, next: NextFunction) => {

    const movieId = req.params.movieId
    if (!movieId) {
      return next(new AppError('Specific Movie ID was not provided', 400))
    }

    const reviewId = req.params.reviewId
    if (!reviewId) {
      return next(new AppError('Specific Review ID was not provided', 400))
    }

    const review = await deleteReviewService(movieId, reviewId, req.user.id);

    if (!review) return next(new AppError("Unable to delete review", 404))

    return res.status(204).json({
        message: "success",
    });
});

