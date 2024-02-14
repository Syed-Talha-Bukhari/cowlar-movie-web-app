import mongoose, { Model } from "mongoose";
import { IReview } from "../../types/review";

const reviewSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, 'Please enter the creator of this review'],
    },
    movieId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movie",
      required: [true, 'Please enter the movie being reviewed'],
    },
    comment: {
      type: String,
      required: [true, "Please provide a comment"],
    },
    rating: {
      type: Number,
      required: [true, "Please provide a rating out of 10 in integer"],
      min: [1, "Minimum rating can be 1"],
      max: [5, "Maximum rating can be 5"],
      validate: {
        validator: Number.isInteger,
        message: 'Rating must be an integer',
    },
    },
  },
  { collection: "Review" }
);

const ReviewModel: Model<IReview> = mongoose.model<IReview>(
  "Review",
  reviewSchema
);

export default ReviewModel;
