import mongoose, { Model } from "mongoose";
import { IReview } from "../../types/review";
import UserModel from "../user";
import MovieModel from "../movie";

const reviewSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserModel",
      required: [true, 'Please enter the creator of this review'],
    },
    movieId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MovieModel",
      required: [true, 'Please enter the movie being reviewed'],
    },
    comment: {
      type: String,
      required: [true, "Please provide a comment"],
    },
    rating: {
      type: Number,
      required: [true, "Please provide a rating out of 10"],
      min: [1, "Minimum rating can be 1"],
      max: [10, "Maximum rating can be 10"],
    },
  },
  { collection: "Review", timestamps: true }
);

reviewSchema.index({ userId: 1, movieId: 1 }, { unique: true });

const ReviewModel: Model<IReview> = mongoose.model<IReview>(
  "Review",
  reviewSchema
);

export default ReviewModel;
