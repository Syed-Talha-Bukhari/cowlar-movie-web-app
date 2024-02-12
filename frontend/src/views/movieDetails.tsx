import AppLayout from "../layout/appLayout";
import { faCalendar, faClock, faFilm, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReviewCard from "../components/cards/reviewCard";
import Button from "../components/buttons/button";
import { useState } from "react";
import ReviewModal from "../components/modals/reviewModal";

const MovieDetails = () => {
    const [isOpenModal, setOpenModal] = useState<boolean>(false);


    const openModal = (e: any) => {
        e.preventDefault();
        setOpenModal(true);
    };

    const closeModal = () => {
        setOpenModal(false);
    };

    return (<>
        <AppLayout>
            <div className="bg-bgPrimary w-full my-32 mx-30 flex flex-col">
                <div className="flex-col lg:flex-row gap-5 flex justify-center items-center mb-5">
                    <div className="w-full lg:w-1/2">
                        <div className="w-full flex flex-col items-center md:flex-row gap-10">
                            <img
                                src="https://m.media-amazon.com/images/M/MV5BMTU2NjA1ODgzMF5BMl5BanBnXkFtZTgwMTM2MTI4MjE@._V1_.jpg"
                                className="aspect-[2/3] rounded w-full max-w-[300px]"
                            />
                            <div className="w-full flex flex-col items-center lg:items-start">
                                <h2 className="text-4xl font-extrabold lg:text-5xl">John Wick</h2>
                                <div className="flex items-center gap-5 mt-5">
                                    <span className="flex items-center gap-2">
                                        <FontAwesomeIcon
                                            icon={faCalendar}
                                            height={16}
                                            color="#646cff"
                                        />
                                        2015
                                    </span>
                                    <span className="flex items-center gap-2">
                                        <FontAwesomeIcon icon={faClock} height={16} color="#646cff" />
                                        {"1h 22m"}
                                    </span>
                                </div>
                                <div className="flex items-center gap-5">
                                    <span className="flex items-center gap-2">
                                        <FontAwesomeIcon icon={faFilm} height={16} color="#646cff" />
                                        Action
                                    </span>
                                    <div className="flex items-center gap-2 my-2">
                                        <FontAwesomeIcon icon={faStar} height={16} color="#646cff" />
                                        8.7 / 10
                                    </div>
                                </div>
                                <div>A thrilling action movie</div>
                            </div>
                        </div>
                    </div>
                    <iframe
                        className=' border rounded-xl border-gray-900 w-[85vw] h-[380px] sm:w-[85vw] md:w-[560px] lg:w-[620px] xl:w-[620px] 2xl:w-[620px]'
                        src="https://www.youtube.com/embed/C0BMx-qxsP4?si=z0jg4sH62mqLwhCY"
                        title='YouTube video player'
                        frameBorder='0'
                        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                        allowFullScreen
                    ></iframe>
                </div>

                <div className='border-t border-gray-600 py-8 lg:py-16'>
                    <div className='mx-auto px-10 md:px-32'>
                        <div className='w-full flex flex-row justify-between'>
                            <div className='flex justify-between items-center mb-6'>
                                <h2 className='text-2xl lg:text-3xl font-bold dark:text-white'>
                                    User Feedback
                                </h2>
                            </div>
                            <form className='mb-6 self-end'>
                                <Button text="Add Review" onClick={openModal} />
                            </form>
                        </div>


                        <div className='flex justify-between items-center mb-4'>
                            <h2 className='text-lg lg:text-2xl font-bold'>
                                Your Review
                            </h2>
                        </div>



                        <ReviewCard
                            own={true}
                            reviewBody={{
                                _id: "2",
                                movieId: "2",
                                comment: "Good Moview",
                                rating: 8.3,
                                createdAt: "14/4/2002",
                                updatedAt: "14/4/2002",
                                name: "John",
                            }}
                        // setReFetchReview={setReFetchReview}
                        // openModal={openModal}
                        />

                        {/* {ownReviews?.length === 0 && (
                            <> */}
                        {/* <p className='text-center font-medium my-12'>
                                    {' '}
                                    You haven't gave a review for this movie 😔
                                </p> */}
                        {/* </>
                        )} */}

                        <div className='flex justify-between items-center mb-4'>
                            <h2 className='text-lg lg:text-2xl font-bold'>
                                All Reviews
                            </h2>
                        </div>

                        {/* {allReviews?.map((e: any) => {
                            return  */}
                        <ReviewCard own={false} reviewBody={{
                            _id: "2",
                            movieId: "2",
                            comment: "Good Movie",
                            rating: 4,
                            createdAt: "14/4/2002",
                            updatedAt: "14/4/2002",
                            name: "John",
                        }} />
                        {/* })}
                        {allReviews?.length === 0 && (
                            <>
                                <p className='text-center font-medium my-12'>
                                    {' '}
                                    No reviews available 😔
                                </p>
                            </>
                        )} */}
                    </div>
                </div>

            </div>


        </AppLayout>

        <ReviewModal 
        openModal={isOpenModal}
        onClose={closeModal}
        />
        
    </>);
};

export default MovieDetails;
