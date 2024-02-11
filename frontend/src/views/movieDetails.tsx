import AppLayout from "../layout/appLayout";
import { faCalendar, faClock, faFilm, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const MovieDetails = () => {
    return (
        <AppLayout>
            <div className="bg-bgPrimary w-full my-32 mx-30 flex-col lg:flex-row gap-5 flex justify-center items-center">
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
        </AppLayout>
    );
};

export default MovieDetails;
