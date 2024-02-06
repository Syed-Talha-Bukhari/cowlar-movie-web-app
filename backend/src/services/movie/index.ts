import MovieModel from "../../models/movie";
import ReviewModel from "../../models/review";
import { IMovie } from "../../types/movie";
import { Types } from "mongoose";

export const getAllMoviesSortedService = async (searchName: string) => {
  const sortedAverageRatedMovies = await MovieModel.aggregate([
    {
      $match: {
        $expr: {
          $cond: {
            if: !!searchName,
            then: {
              $regexMatch: {
                input: "$name",
                regex: searchName.trim(),
                options: "i",
              },
            },
            else: true,
          },
        },
      },
    },
    {
      $lookup: {
        from: "Review",
        localField: "_id",
        foreignField: "movieId",
        as: "reviews",
      },
    },
    {
      $addFields: {
        averageRating: { $avg: "$reviews.rating" },
        totalReviews: { $size: "$reviews" },
      },
    },
    {
      $group: {
        _id: "$_id",
        name: { $first: "$name" },
        year: { $first: "$year" },
        description: { $first: "$description" },
        image: { $first: "$image" },
        video: { $first: "$video" },
        genre: { $first: "$genre" },
        averageRating: { $first: "$averageRating" },
        totalReviews: { $first: "$totalReviews" },
      },
    },
    {
      $addFields: {
        averageRating: { $ifNull: ["$averageRating", 0] },
        totalReviews: { $ifNull: ["$totalReviews", 0] },
      },
    },
    {
      $sort: { averageRating: -1 },
    },
  ]);

  return sortedAverageRatedMovies;
};

export const getMovieByIdService = async (movieId: any) => {
  const movie = await MovieModel.aggregate([
    {
      $match: {
        _id: new Types.ObjectId(movieId),
      },
    },
    {
      $lookup: {
        from: "Review",
        localField: "_id",
        foreignField: "movieId",
        as: "reviews",
      },
    },
    {
      $addFields: {
        averageRating: { $avg: "$reviews.rating" },
        totalReviews: { $size: "$reviews" },
      },
    },
    {
      $group: {
        _id: "$_id",
        name: { $first: "$name" },
        year: { $first: "$year" },
        description: { $first: "$description" },
        image: { $first: "$image" },
        video: { $first: "$video" },
        genre: { $first: "$genre" },
        averageRating: { $first: "$averageRating" },
        totalReviews: { $first: "$totalReviews" },
      },
    },
    {
      $addFields: {
        averageRating: { $ifNull: ["$averageRating", 0] },
        totalReviews: { $ifNull: ["$totalReviews", 0] },
      },
    },
  ]);

  return movie.length > 0 ? movie[0] : null;
};

export const getMoviesByCreatorService = async (userId: string) => {
    const movies = await MovieModel.find({ creator: userId }).select("-creator");
    return movies;
  };

export const createMovieService = async (movieData: IMovie) => {
  const movies = await MovieModel.create(movieData);
  return movies;
};

export const deleteMovieService = async (userId: string, movieId: string) => {
  const movie = await MovieModel.findOneAndDelete({
    creator: userId,
    _id: movieId,
  });
  if (movie) {
    await ReviewModel.deleteMany({ movieId: movieId });
  }
  return movie;
};


