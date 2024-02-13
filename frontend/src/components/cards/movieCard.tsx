import Button from "../buttons/button";
import { FC } from 'react';
import { Link } from "react-router-dom";


type MovieCardProps = {
    name: string;
    image: string;
    year: string;
    genre: string;
    averageRating: number;
    totalReviews: number;
    type: "user" | "generic";
    _id: string
};

const MovieCard: FC<MovieCardProps> = ({ name, image, year, genre, averageRating, totalReviews, type, _id }) => {
    return (
        <div className="py-2 w-full ">
            <div className="bg-bgSecondary shadow-lg border-gray-900 max-h-80 border rounded-3xl p-3 flex space-x-8 mb-20">
                <div className="h-48 overflow-visible w-1/2">
                    <img className="rounded-3xl shadow-lg" src={image} alt="" />
                </div>
                <div className="flex flex-col w-1/2 space-y-4">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-bold">{name}</h2>
                        <div className="bg-textIndigo text-md font-bold rounded-xl p-1">{averageRating}/10 ({totalReviews})</div>
                    </div>
                    <div>
                        <div className="text-lg text-textIndigo">{year}</div>
                    </div>
                    <p className=" text-textWhite max-h-40 overflow-y-hidden">{genre}</p>
                    <div className="flex justify-start">
                        <Link to={`${_id}`}>
                            <Button text={type === "generic" ? "View Details" : "Delete Movie"} />
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default MovieCard;

