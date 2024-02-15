import mongoose, { Model } from "mongoose";
import { IMovie } from "./../../types/movie";

const movieSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter a movie name"],
      unique: [true, "Movie with this name already exists. Enter another name"],
    },
    year: {
      type: Number,
      required: [true, "Please enter the movie release year"],
      validate: {
        validator: function (value: number) {
          return value <= new Date().getFullYear();
        },
        message: (props: any) =>
          `Release year must be less than or equal to the current year`,
      },
    },
    description: {
      type: String,
      required: [true, "Please enter some description of the movie"],
    },
    image: {
      type: String,
      default:
        "https://image.tmdb.org/t/p/w600_and_h900_bestv2/mS5SLxMYcKfUxA0utBSR5MOAWWr.jpg",
    },

    video: {
      type: String,
      default: "https://www.youtube.com/embed/K4TOrB7at0Y?si=Uhz6ywvhr6KvDSD2",
    },
    genre: {
      type: String,
      enum: [
        "Action",
        "Adventure",
        "Comedy",
        "Drama",
        "Fantasy",
        "Horror",
        "Sci-Fi",
        "Thriller",
        "Mystery",
        "Romance",
      ],

      required: [true, "Please select atleast one genre"],
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Please add a creator of the movie"],
    },
  },
  { collection: "Movie" }
);

movieSchema.pre<IMovie>('save', function (next: any) {
	if (!this.image) {
		this.image = 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/mS5SLxMYcKfUxA0utBSR5MOAWWr.jpg';
	}
	if (!this.video) {
		this.video = 'https://www.youtube.com/embed/K4TOrB7at0Y?si=Uhz6ywvhr6KvDSD2';
	}
	next();
});

const MovieModel: Model<IMovie> = mongoose.model<IMovie>("Movie", movieSchema);

export default MovieModel;
