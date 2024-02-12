import MovieCard from "../components/cards/movieCard";
import AppLayout from "../layout/appLayout";
import Button from "../components/buttons/button";

const Movies = () => {
    return (
        <AppLayout>
            <div className="my-32 mx-10 min-h-screen bg-bgPrimary flex flex-col gap-10">
                <div className="flex gap-1 justify-center items-center">
                <input type="email" name="email" id="email" className="bg-gray-100 border border-gray-300 text-gray-900 text-textWhite text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white w-full lg:w-1/2 h-9" placeholder="Search Movies" required />
                <Button text="Search"/>
                </div>
                
           
                <div className=" grid grid-cols-1ta gap-x-5 gap-y-10 md:grid-cols-2 md:gap-x-6 lg:grid-cols-3 ">
                    <MovieCard type="generic" image="https://m.media-amazon.com/images/M/MV5BMTU2NjA1ODgzMF5BMl5BanBnXkFtZTgwMTM2MTI4MjE@._V1_.jpg" name="John Wick" year="2015" genre="Action" rating={8.3} totalReviews={3} />
                    <MovieCard type="generic" image="https://m.media-amazon.com/images/M/MV5BMTU2NjA1ODgzMF5BMl5BanBnXkFtZTgwMTM2MTI4MjE@._V1_.jpg" name="John Wick" year="2015" genre="Action" rating={8.3} totalReviews={3} />
                    <MovieCard type="generic" image="https://m.media-amazon.com/images/M/MV5BMTU2NjA1ODgzMF5BMl5BanBnXkFtZTgwMTM2MTI4MjE@._V1_.jpg" name="John Wick" year="2015" genre="Action" rating={8.3} totalReviews={3} />
                </div>
            </div>
        </AppLayout>

    )
}

export default Movies;