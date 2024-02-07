import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './views/home';
import Login from './views/login';
import Signup from './views/signup';
import MovieDetails from './views/movieDetails';
import UserMovies from './views/userMovies';
import FallbackPage from './views/fallback';

function AppRoutes() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/movies/:id" element={<MovieDetails />} />
          <Route path="/user-movies" element={<UserMovies />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="*"
            element={<FallbackPage />}
          />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default AppRoutes
