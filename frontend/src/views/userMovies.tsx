import MovieCard from "../components/cards/movieCard";
import AppLayout from "../layout/appLayout";
import { useState, useEffect, useContext } from "react";
import { getMoviesByCreator } from "../api/movies";
import Loader from "../components/loader/loader";
import IMovie from "../types/movies";
import toast from "react-hot-toast";
import { UserContext } from "../context/userContext";

interface IMovieRespone extends IMovie {
    averageRating: number;
    totalReviews: number;
    _id: string;
    image: string;
}

const UserMovies = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [movies, setMovies] = useState<[IMovieRespone] | []>([]);
    const [refreshMovies, setRefreshMovies] = useState<number>(1);

    const { user } = useContext(UserContext);


    useEffect(() => {
        (async () => {
            try {
                setIsLoading(true);
                const { data } = await getMoviesByCreator(user?.token || "") as any;
                setMovies(data)
                setIsLoading(false);
            } catch (error) {
                console.log('error', error);
                toast.error("Error in fetching movie data!")
            }
        })()
    }, [refreshMovies])

    if (isLoading) {
        return (
            <>
                <AppLayout>
                    <div className="w-screen h-screen flex items-center justify-center">
                        <Loader />
                    </div>
                </AppLayout>
            </>
        );
    }

    return (
        <AppLayout>
            <div className="my-32 mx-10 min-h-screen bg-bgPrimary flex flex-col gap-10">
                {movies.length === 0 ?
                    <div>
                        <p className="text-xl text-textWhite text-center">No movies uploaded by user</p>
                    </div>
                    :

                    <div className=" grid grid-cols-1ta gap-x-5 gap-y-10 md:grid-cols-2 md:gap-x-6 lg:grid-cols-3 ">
                        {movies?.map((movie: IMovieRespone) => (
                            <MovieCard type="user" image={movie.image} name={movie.name} year={movie.year} genre={movie.genre} averageRating={movie.averageRating} totalReviews={movie.totalReviews} _id={movie._id} setIsLoading={setIsLoading} setRefreshMovies={setRefreshMovies}/>
                        ))}
                    </div>}
            </div>
        </AppLayout>

    )
}

export default UserMovies;