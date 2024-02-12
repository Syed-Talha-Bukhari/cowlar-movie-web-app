import Button from "../buttons/button";
import ModalLayout from "../../layout/modalLayout";


type MovieModal = {
    openModal: boolean;
    onClose: any
}

const MovieModal: React.FC<MovieModal> = ({ openModal, onClose }) => {
    return (
        <>
            {openModal && (
                <ModalLayout onClose={onClose} title="Movie">

                    <div className="p-4 md:p-5">
                        <form className="space-y-4" action="#">

                            <div>
                                <label htmlFor="title" className="block mb-2 text-sm font-medium text-textWhite dark:text-white">Movie Title</label>
                                <input type="text" name="title" id="title" placeholder="Enter movie title" className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-black" required />
                            </div>
                            <div>
                                <label htmlFor="year" className="block mb-2 text-sm font-medium text-textWhite dark:text-white">Release Year</label>
                                <input type="number" name="year" id="year" placeholder="Enter the year of release" className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-black" required />
                            </div>
                            
                            <div>
                            <label htmlFor="genre" className="block mb-2 text-sm font-medium text-textWhite dark:text-white">Genre</label>
                            <select name="genre" id="genre" className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-black">
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
                            </div>
                            <div>
                                <label htmlFor="image" className="block mb-2 text-sm font-medium text-textWhite dark:text-white">Image URL</label>
                                <input type="text" name="image" id="image" placeholder="Enter image URL" className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-black" required />
                            </div>
                            <div>
                                <label htmlFor="video" className="block mb-2 text-sm font-medium text-textWhite dark:text-white">Video URL</label>
                                <input type="text" name="video" id="video" placeholder="Enter video URL" className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-black" required />
                            </div>
                            <div>
                                <label htmlFor="description" className="block mb-2 text-sm font-medium text-textWhite dark:text-white">Description</label>
                                <textarea name="description" id="description" placeholder="Enter movie description" className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-black" required />
                            </div>
                            <div className="w-full m-auto flex justify-center">
                                <Button text="Add Movie" />
                            </div>

                        </form>
                    </div>
                </ModalLayout>

            )}
        </>


    )
}

export default MovieModal;