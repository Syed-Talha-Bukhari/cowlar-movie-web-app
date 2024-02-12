import reviewModel from "../../models/review";

export const getAllMovieReviewsService = async (movieId: string) => {
    const reviews = await reviewModel.find({ movieId: movieId }).populate({
        path: 'userId',
        select: 'name',
    }).lean();

    const flattenedReviews = reviews.map((review: any) => {
        return {
            _id: review._id,
            movieId: review.movieId,
            name: review.userId.name,
            comment: review.comment,
            rating: review.rating,
            createdAt: review.createdAt,
            updatedAt: review.updatedAt,
        };
    });
    return flattenedReviews;
}


export const getOwnMoviewReviewService = async (movieId: string, userId: string) => {
    const review = await reviewModel.find({ movieId: movieId, userId: userId }).populate({
        path: 'userId',
        select: 'name',
    }).lean();

    const flattenedReview = review?.map((review: any) => {
        return {
            _id: review._id,
            movieId: review.movieId,
            name: review.userId.name,
            comment: review.comment,
            rating: review.rating,
            createdAt: review.createdAt,
            updatedAt: review.updatedAt,
        };
    });
    return flattenedReview[0];
}

export const getReviewService = async (movieId: string, reviewId: string) => {
    const review = await reviewModel.findOne({ movieId: movieId, _id: reviewId });
    return review;
}

export const createReviewService = async (movieId: string, userId: string, rating: number, comment: string) => {
    const review = await reviewModel.create({ movieId, userId, rating, comment });
    return review;
}

export const updateReviewService = async (movieId: string, reviewId: string, userId: string, rating: number, description: string) => {
    const updatedReview = await reviewModel.findOneAndUpdate({ movieId, _id: reviewId, userId }, {rating, description}, { new: true, runValidators: true });
    return updatedReview;
}

export const deleteReviewService = async (movieId: string, reviewId: string, userId: string) => {
    const review = await reviewModel.findOneAndDelete({ movieId, _id: reviewId, userId });
    return review;
}



