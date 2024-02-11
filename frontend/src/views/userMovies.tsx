import MovieCard from "../cards/movieCard";
import AppLayout from "../layout/appLayout";

const UserMovies = () => {
    return (
        <AppLayout>
            <div className="my-20 mx-10 min-h-screen bg-bgPrimary gap-1 grid grid-cols-1ta gap-x-5 gap-y-10 md:grid-cols-2 md:gap-x-6 lg:grid-cols-3 ">
                <MovieCard type="user" image="https://m.media-amazon.com/images/M/MV5BMTU2NjA1ODgzMF5BMl5BanBnXkFtZTgwMTM2MTI4MjE@._V1_.jpg" name="John Wick" year="2015" genre="Action" rating={8.3} totalReviews={3}/>
                <MovieCard type="user" image="https://m.media-amazon.com/images/M/MV5BMTU2NjA1ODgzMF5BMl5BanBnXkFtZTgwMTM2MTI4MjE@._V1_.jpg" name="John Wick" year="2015" genre="Action" rating={8.3} totalReviews={3}/>
                <MovieCard type="user" image="https://m.media-amazon.com/images/M/MV5BMTU2NjA1ODgzMF5BMl5BanBnXkFtZTgwMTM2MTI4MjE@._V1_.jpg" name="John Wick" year="2015" genre="Action" rating={8.3} totalReviews={3}/>
            </div>
        </AppLayout>

    )
}

export default UserMovies;