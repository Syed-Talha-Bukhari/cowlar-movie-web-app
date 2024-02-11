import Button from "../components/button";
import { FC } from 'react';


type MovieCardProps = {
    name: string;
    image: string;
    year: string;
    genre: string;
    rating: number;
    totalReviews: number;
    type: "user" | "generic"
};

const MovieCard : FC<MovieCardProps> = ({name, image, year, genre, rating, totalReviews, type}) => {
    return (
        <div className="py-2 w-full ">
            <div className="bg-bgSecondary shadow-lg border-gray-900 max-h-80 border rounded-3xl p-8 flex space-x-8">
                <div className="h-48 overflow-visible w-1/2">
                    <img className="rounded-3xl shadow-lg" src={image} alt="" />
                </div>
                <div className="flex flex-col w-1/2 space-y-4">
                    <div className="flex justify-between items-start">
                        <h2 className="text-xl font-bold">{name}</h2>
                        <div className="bg-textIndigo font-bold rounded-xl p-1">{rating}/10 ({totalReviews})</div>
                    </div>
                    <div>
                        <div className="text-lg text-textIndigo">{year}</div>
                    </div>
                    <p className=" text-textWhite max-h-40 overflow-y-hidden">{genre}</p>
                    <div className="flex justify-start">
                        <Button text={type === "generic" ? "View Details": "Delete Movie"} />
                    </div>
                </div>

            </div>
        </div>
    )
}

export default MovieCard;

