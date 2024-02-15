import Button from "../buttons/button";
import { FC, useContext } from 'react';
import { Link } from "react-router-dom";
import { deleteMovie } from '../../api/movies';
import toast from "react-hot-toast";
import { UserContext } from "../../context/userContext";


type MovieCardProps = {
    name: string;
    image: string;
    year: string;
    genre: string;
    averageRating: number;
    totalReviews: number;
    type: "user" | "generic";
    _id: string;
    setIsLoading?: any;
    setRefreshMovies?: any
};

const MovieCard: FC<MovieCardProps> = ({ name, image, year, genre, averageRating, totalReviews, type, _id, setIsLoading, setRefreshMovies }) => {

    const { user } = useContext(UserContext);

    const deleteOwnMovie = () => {
        (async () => {
            try {
                setIsLoading(true);
                const { deleted } = await deleteMovie(_id, user?.token || "") as any;
                console.log(deleted);
                setIsLoading(false);
                setRefreshMovies((prev: number) => prev+1);
                toast.success('Movie deleted successfully!');
            } catch (error) {
                console.log('error', error);
                toast.error('Movie deletion process failed');
            }
        })();
    }
    return (
        <div className="py-2 w-full ">
            <div className="bg-bgSecondary shadow-lg border-gray-900 max-h-80 border rounded-3xl p-3 flex space-x-8 mb-20">
                <div className="h-48 overflow-visible w-1/2">
                    <img className="rounded-3xl shadow-lg" src={image} alt="" />
                </div>
                <div className="flex flex-col w-1/2 space-y-4">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-bold">{name}</h2>
                        {type === "generic" && <div className="bg-textIndigo text-md font-bold rounded-xl p-1">{averageRating.toFixed(1)}/5 ({totalReviews})</div>}
                    </div>
                    <div>
                        <div className="text-lg text-textIndigo">{year}</div>
                    </div>
                    <p className=" text-textWhite max-h-40 overflow-y-hidden">{genre}</p>
                    <div className="flex justify-start">
                        <Link to={type === "generic" ? _id : ""}>
                            <Button text={type === "generic" ? "View Details" : "Delete Movie"} onClick={type === "user" ? deleteOwnMovie : null} />
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default MovieCard;

