import AppLayout from "../layout/appLayout";
import { faCalendar, faClock, faFilm, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReviewCard from "../components/cards/reviewCard";
import Button from "../components/buttons/button";
import { useState, useContext, useEffect } from "react";
import { UserContext } from "../context/userContext";
import ReviewModal from "../components/modals/reviewModal";
import IMovie from "../types/movies";
import { IReview } from "../types/review";
import toast from "react-hot-toast";
import { getMovie } from "../api/movies";
import { getAllMovieReviews, getOwnMovieReview } from "../api/reviews";
import { useParams } from "react-router-dom";
import Loader from "../components/loader/loader";
import useAuthVerification from "../auth/useAuthVerification";

interface IMovieRespone extends IMovie {
    averageRating: string;
    totalReviews: string;
    _id: string;
    image: string;
    video: string;
}

interface IReviewResponse extends IReview{
    name: string;
}


const movieObj: IMovieRespone = {
    _id: "",
    name: "",
    year: "",
    genre: "",
    description: "",
    image: "",
    video: "",
    averageRating: "",
    totalReviews: ""
};

const reviewObj: IReview = {
    _id: "",
    movieId: "",
    rating: "",
    comment: "",
};

const MovieDetails = () => {
    const [isOpenModal, setOpenModal] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [refreshReviews, setRefreshReviews] = useState<number>(1);
    const [movie, setMovie] = useState<IMovieRespone>(movieObj);
    const [ownReview, setOwnReview] = useState<IReview | null>(reviewObj);
    const [allReviews, setAllReviews] = useState<[IReviewResponse] | []>([]);

    const { id } = useParams();
    const { isLogged, user } = useContext(UserContext);
    const { pageLoading } = useAuthVerification();


    useEffect(() => {
        (async () => {
            try {
                setIsLoading(true);
                const { data } = (await getMovie(id || '')) as any;
                if (isLogged) {
                    const { reviews } = (await getAllMovieReviews(
                        id || '',
                        user?.token || ''
                    )) as any;
                    const { review } = (await getOwnMovieReview(
                        id || '',
                        user?.token || ''
                    )) as any;
                    setOwnReview(review);
                    setAllReviews(reviews);
                }
                setMovie(data);
                setIsLoading(false);
            } catch (error) {
                console.log('error', error);
                toast.error('Error fetching movie details and reviews');
            }
        })();
    }, [user?.token, refreshReviews]);


    const openModal = (e: any) => {
        e.preventDefault();
        setOpenModal(true);
    };

    const closeModal = () => {
        setOpenModal(false);
    };


    if (isLoading || pageLoading){
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


    return (<>
        <AppLayout>
            <div className="bg-bgPrimary w-full my-32 mx-30 flex flex-col">
                <div className="flex-col lg:flex-row gap-5 flex justify-center items-center mb-5">
                    <div className="w-full lg:w-1/2">
                        <div className="w-full flex flex-col items-center md:flex-row gap-10">
                            <img
                                src={movie?.image}
                                className="aspect-[2/3] rounded w-full max-w-[300px]"
                            />
                            <div className="w-full flex flex-col items-center lg:items-start">
                                <h2 className="text-4xl font-extrabold lg:text-5xl">{movie?.name}</h2>
                                <div className="flex items-center gap-5 mt-5">
                                    <span className="flex items-center gap-2">
                                        <FontAwesomeIcon
                                            icon={faCalendar}
                                            height={16}
                                            color="#646cff"
                                        />
                                        {movie?.year}
                                    </span>
                                    <span className="flex items-center gap-2">
                                        <FontAwesomeIcon icon={faClock} height={16} color="#646cff" />
                                        {"1h 22m"}
                                    </span>
                                </div>
                                <div className="flex items-center gap-5">
                                    <span className="flex items-center gap-2">
                                        <FontAwesomeIcon icon={faFilm} height={16} color="#646cff" />
                                        {movie?.genre}
                                    </span>
                                    <div className="flex items-center gap-2 my-2">
                                        <FontAwesomeIcon icon={faStar} height={16} color="#646cff" />
                                        {parseFloat(movie?.averageRating).toFixed(1)} / 5
                                    </div>
                                </div>
                                <div>{movie?.description}</div>
                            </div>
                        </div>
                    </div>
                    <iframe
                        className=' border rounded-xl border-gray-900 w-[85vw] h-[380px] sm:w-[85vw] md:w-[35vw] lg:w-[35vw] xl:w-[35vw] 2xl:w-[35vw]'
                        src={movie?.video}
                        title='YouTube video player'
                        frameBorder='0'
                        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                        allowFullScreen
                    ></iframe>
                </div>


                <div className='border-t border-gray-600 py-8 lg:py-16'>
                    <div className='mx-auto px-10 md:px-32'>
                        {isLogged ? <>
                            <div className='w-full flex flex-row justify-between'>
                                <div className='flex justify-between items-center mb-6'>
                                    <h2 className='text-2xl lg:text-3xl font-bold dark:text-white'>
                                        User Feedback
                                    </h2>
                                </div>
                                {!ownReview &&
                                    <form className='mb-6 self-end'>
                                        <Button text="Add Review" onClick={openModal} />
                                    </form>
                                }
                            </div>


                            {ownReview && <>
                                <div className='flex justify-between items-center mb-4'>
                                    <h2 className='text-lg lg:text-2xl font-bold'>
                                        Your Review
                                    </h2>
                                </div>

                                <ReviewCard
                                    own={true}
                                    reviewBody={{
                                        _id: ownReview?._id,
                                        movieId: id as string,
                                        comment: ownReview?.comment,
                                        rating: ownReview?.rating,
                                        name: user?.name as string,
                                    }}
                                    setRefreshReviews={setRefreshReviews}
                                    openModal={openModal}
                                />

                            </>}

                            <div className='flex justify-between items-center mb-4'>
                                <h2 className='text-lg lg:text-2xl font-bold'>
                                    All Reviews
                                </h2>
                            </div>

                            {allReviews?.map((review: IReviewResponse) => (
                                <ReviewCard own={false} reviewBody={{
                                    _id: review?._id,
                                    movieId: id as string,
                                    comment: review?.comment,
                                    rating: review?.rating,
                                    name: review?.name,
                                }} />
                            ))}


                            {allReviews?.length === 0 && (
                                <>
                                    <p className='text-xl text-textWhite text-center my-12'>
                                        This movie has no reviews yet
                                    </p>
                                </>
                            )}

                        </> : <>
                            <p className="text-xl text-textWhite text-center">You need to Log In to view User Feedback</p>
                        </>}
                    </div>
                </div>
            </div>
        </AppLayout>

        <ReviewModal
            openModal={isOpenModal}
            onClose={closeModal}
            setIsLoading= {setIsLoading}
            setRefreshReviews= {setRefreshReviews}
            movieId= {id as string}
            editData={ownReview ? ownReview : undefined}
        />

    </>);
};

export default MovieDetails;
