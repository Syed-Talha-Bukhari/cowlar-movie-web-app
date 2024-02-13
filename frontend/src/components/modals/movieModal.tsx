import Button from "../buttons/button";
import ModalLayout from "../../layout/modalLayout";
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { createMovie } from "../../api/movies";
import toast from "react-hot-toast";
import { useContext } from "react";
import { UserContext } from "../../context/userContext";
import IMovie from "../../types/movies";

type MovieModal = {
    openModal: boolean;
    onClose: any;
    setIsLoading: any;
}

interface IMovieResponse extends IMovie {
    image: string;
    video: string
}

const MovieModal: React.FC<MovieModal> = ({ openModal, onClose, setIsLoading }) => {
    const { register, control, handleSubmit, formState: { errors } } = useForm<IMovieResponse>();

    const { user } = useContext(UserContext);


    const onCreateMovie: SubmitHandler<IMovieResponse> = async (data) => {
        setIsLoading(true);
        try {
            const newMovie = await createMovie(data, user?.token || "");
            setIsLoading(false);
            onClose();
            if(newMovie) toast.success("Movie has been added!")
        } catch (error) {
            setIsLoading(false);
            toast.error("Movie creation process failed!")
        }
        setIsLoading(false);
    };


    return (
        <>
            {openModal && (
                <ModalLayout onClose={onClose} title="Movie">

                    <div className="p-4 md:p-5">
                        <form className="space-y-4" onSubmit={handleSubmit(onCreateMovie)}>

                            <div>
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-textWhite dark:text-white">Movie Title</label>
                                <input type="text" id="name" placeholder="Enter movie title" className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-black" {...register('name', { required: 'Please enter movie name', })} />
                                {errors.name && <span className="text-sm text-red-500">{errors.name.message?.toString()}</span>}
                            </div>
                            <div>
                                <label htmlFor="year" className="block mb-2 text-sm font-medium text-textWhite dark:text-white">Release Year</label>
                                <input type="number" id="year" placeholder="Enter the year of release" className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-black"
                                    {...register('year', {
                                        required: 'Please enter release year',
                                        validate: {
                                            isNumeric: (value) => !isNaN(parseInt(value, 10)) && Number.isInteger(+value) || 'Release Year must be a number',
                                            isValidYear: (value) => {
                                                const year = parseInt(value, 10);
                                                const currentYear = new Date().getFullYear();
                                                return (year <= currentYear) || `Release Year must be smaller than current year`;
                                            },
                                        },
                                    })} />
                                {errors.year && <span className="text-sm text-red-500">{errors.year.message?.toString()}</span>}
                            </div>

                            <div>
                                <label htmlFor="genre" className="block mb-2 text-sm font-medium text-textWhite dark:text-white">Genre</label>
                                <Controller
                                    name="genre"
                                    control={control}
                                    rules={{ required: 'Please select a genre' }}
                                    render={({ field }) => (
                                        <select
                                            {...field}
                                            id="genre" className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-black">
                                            <option disabled selected value="">Select an option</option>
                                            <option>Action</option>
                                            <option>Adventure</option>
                                            <option>Comedy</option>
                                            <option>Drama</option>
                                            <option>Fantasy</option>
                                            <option>Horror</option>
                                            <option>Sci-Fi</option>
                                            <option>Thriller</option>
                                            <option>Mystery</option>
                                            <option>Romance</option>
                                        </select>
                                    )}
                                />

                                {errors.genre && (<p className="text-red-500 text-xs italic">{errors.genre.message?.toString()}</p>)}
                            </div>
                            <div>
                                <label htmlFor="image" className="block mb-2 text-sm font-medium text-textWhite dark:text-white">Image URL</label>
                                <input type="text" id="image" placeholder="Enter image URL" className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-black" {...register('image', { required: 'Please enter movie image URL' })} />
                                {errors.image && <span className="text-sm text-red-500">{errors.image.message?.toString()}</span>}
                            </div>
                            <div>
                                <label htmlFor="video" className="block mb-2 text-sm font-medium text-textWhite dark:text-white">Video URL</label>
                                <input type="text" id="video" placeholder="Enter video URL" className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-black" {...register('video', { required: 'Please enter movie video URL' })} />
                                {errors.video && <span className="text-sm text-red-500">{errors.video.message?.toString()}</span>}
                            </div>
                            <div>
                                <label htmlFor="description" className="block mb-2 text-sm font-medium text-textWhite dark:text-white">Description</label>
                                <textarea id="description" placeholder="Enter movie description" className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-black" {...register('description', { required: 'Please enter movie description' })} />
                                {errors.description && <span className="text-sm text-red-500">{errors.description.message?.toString()}</span>}
                            </div>
                            <div className="w-full m-auto flex justify-center">
                                <Button text="Add Movie" type="submit" />
                            </div>

                        </form>
                    </div>
                </ModalLayout>

            )}
        </>


    )
}

export default MovieModal;