import toast from "react-hot-toast";
import axios from "../config/config"
import { IReview } from "../types/review";

export const getAllMovieReviews = async (movieId: string, token: string) => {
    try {
        const res = await axios.get(`/movies/${movieId}/reviews`, { headers: { Authorization: `Bearer ${token}` } });

        if (res.status === 200 && res.data.message === "success") {
            return {
                reviews: res.data.data,
            };
        }
    } catch (error: any) {
        console.log('Unable to get all the reviews', error);
        toast.error(error?.response?.data?.message);
    }
    return null;
};

export const getOwnMovieReview = async (movieId: string, token: string) => {
    try {
        const res = await axios.get(`/movies/${movieId}/reviews/me`, { headers: { Authorization: `Bearer ${token}` } });

        if (res.status === 200 && res.data.message === "success") {
                return {
                    review: res.data.data,
                };
        }
    } catch (error: any) {
        console.log(error);
        if(error.response.request.status === 404) return {review: null}
        console.log('Unable to get your review', error);
        toast.error(error?.response?.data?.message);
    }
    return null;
};

export const createReview = async (movieId: string, token: string, review: IReview) => {
    try {
        const res = await axios.post(`/movies/${movieId}/reviews`, {
            comment: review.comment,
            rating: review.rating
        }, { headers: { Authorization: `Bearer ${token}` } });

        if (res.status === 201 && res.data.message === "success") {
            return {
                data: res.data.data
            };
        }
    } catch (error: any) {
        console.log('Review creation failed!', error);
        toast.error(error?.response?.data?.message);
    }
    return null;
};

export const editReview = async (movieId: string, reviewId: string, token: string, review: IReview) => {
    try {
        const res = await axios.patch(`/movies/${movieId}/reviews/${reviewId}`, {
            comment: review.comment,
            rating: review.rating
        }, { headers: { Authorization: `Bearer ${token}` } });

        if (res.status === 200 && res.data.message === "success") {
            return {
                data: res.data.data
            };
        }
    } catch (error: any) {
        console.log('Unable to edit review!', error);
        toast.error(error?.response?.data?.message);
    }
    return null;
};

export const deleteReviews = async (movieId: string, reviewId: string, token: string) => {
    try {
        const res = await axios.delete(`/movies/${movieId}/reviews/${reviewId}`, { headers: { Authorization: `Bearer ${token}` } });

        if (res.status === 204) {
            return {
                deleted: true
            };
        }
    } catch (error: any) {
        console.log('Unable to delete review!', error);
        toast.error(error?.response?.data?.message);
    }
    return null;
};
