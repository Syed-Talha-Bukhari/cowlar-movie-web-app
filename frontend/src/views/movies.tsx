import MovieCard from "../components/cards/movieCard";
import AppLayout from "../layout/appLayout";
import { useState, useEffect } from "react";
import { getAllMovies } from "../api/movies";
import Loader from "../components/loader/loader";
import IMovie from "../types/movies";
import Button from "../components/buttons/button";
import { useForm } from 'react-hook-form';
import toast from "react-hot-toast";

interface IMovieRespone extends IMovie {
    averageRating: number;
    totalReviews: number;
    _id: string;
    image: string;
}

const Movies = () => {

    const { register, handleSubmit } = useForm();

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [movies, setMovies] = useState<[IMovieRespone] | []>([]);

    useEffect(() => {
        (async () => {
            try {
                setIsLoading(true);
                const { data } = await getAllMovies("") as any;
                setMovies(data)
                setIsLoading(false);
            } catch (error) {
                console.log('error', error);
                toast.error("Error in fetching movie data!")
            }
        })()
    }, [])

    const searchMovies = async (data: any) => {
        const movie = data.search;
        console.log(data);
        console.log("Clicked")
        try {
            setIsLoading(true);
            const { data } = await getAllMovies(movie) as any;
            setMovies(data);
            setIsLoading(false);
        } catch (error) {
            console.log('error', error);
            toast.error("Error in fetching movie data!")
        }
    }


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
                <form onSubmit={handleSubmit(searchMovies)}>
                    <div className="flex gap-1 justify-center items-center">
                        <input {...register('search')} type="text" name="search" id="search" className="bg-gray-100 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white w-full lg:w-1/2 h-9" placeholder="Search Movies" required />
                        <Button text="Search" type="submit"/>
                    </div>
                </form>

                <div className=" grid grid-cols-1ta gap-x-5 gap-y-10 md:grid-cols-2 md:gap-x-6 lg:grid-cols-3 ">
                    {movies?.map((movie: IMovieRespone) => (
                        <MovieCard type="generic" image={movie.image} name={movie.name} year={movie.year} genre={movie.genre} averageRating={movie.averageRating} totalReviews={movie.totalReviews} _id={movie._id} />
                    ))}
                </div>
            </div>
        </AppLayout>

    )
}

export default Movies;