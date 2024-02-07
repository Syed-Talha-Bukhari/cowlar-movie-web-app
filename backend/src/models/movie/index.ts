import mongoose, { Model } from 'mongoose';
import { IMovie } from "./../../types/movie";

const movieSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Please enter a movie name'],
		unique: [true, "Movie with this name already exists. Enter another name"]
	},
	year: {
        type: Number,
        required: [true, "Please enter the movie release year"],
        validate: {
            validator: function (value: number) {
                return value <= new Date().getFullYear();
            },
            message: (props: any) => `Release year must be less than or equal to the current year`
        }
    },
	description: {
		type: String,
		required: [true,"Please enter some description of the movie"],
	},
	image: {
		type: String,
		default: "https://images.unsplash.com/photo-1542204165-65bf26472b9b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
	},
	
	video: {
		type: String,
		default: "https://youtu.be/DFTB7iSSeMQ?si=nFOnKDhe4oIOJ7Zo"
	},
	genre: {
        type: [{
            type: String,
            enum: ['Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Sci-Fi', 'Thriller', "Mystery", "Romance"]
        }],
        validate: {
            validator: function (genres: string) {
                return genres.length > 0 && genres.length <= 3
            },
            message: (props: any) => `A movie can have at most 3 genres`
        },
        required: [true,"Please select atleast one genre"]
    },
	creator: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: [true, "Please add a creator of the movie"],
	},

}, { collection: 'Movie' });
 

const MovieModel: Model<IMovie> = mongoose.model<IMovie>('Movie', movieSchema);

export default MovieModel;