import MovieModel from "../../models/movie";
import ReviewModel from "../../models/review";
import { IMovie } from "../../types/movie";



export const getAllMoviesSorted = async (searchName: string) => {
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
        creator: { $first: "$creator" },
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

