import { Types } from "mongoose";

interface IMovie extends Document {
    name: string;
    year: string;
    description: string;
    image?: string;
    video?: string;
    genre: string;
    creator: Types.ObjectId;
}

export { IMovie }