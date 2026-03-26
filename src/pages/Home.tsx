import { useEffect, useState } from 'react';
import { FilmResponse, PopularMoviesResponse } from '../types/film';
import axios from 'axios';
import Slider from '../components/Slider';
import Footer from '../components/Footer';

export default function Discover() {
  const [filmPopularData, setFilmPopularData] = useState([]);
  const [filmTrendingData, setFilmTrendingData] = useState([]);
  const [loadingPopular, setLoadingPopular] = useState(true);
  const [loadingTrending, setLoadingTrending] = useState(true);
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    const apiKey = import.meta.env.VITE_TMDB_API_KEY;

    const fetchPopular = async () => {
      try {
        const response = await axios.get(
          'http://localhost:8080/api/movies/popular',
        );

        setFilmPopularData(
          response.data.map((popularResponse: PopularMoviesResponse) => {
            return {
              title: popularResponse.movie.title,
              overview: popularResponse.movie.overview,
              image: `https://image.tmdb.org/t/p/w500${popularResponse.movie.posterPath}`,
              rating: popularResponse.movie.voteAverage,
              vote_count: popularResponse.movie.voteCount,
            };
          }),
        );

        setLoadingPopular(false);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setError(error.message);
          setLoadingPopular(false);
          console.error(
            'Error fetching film list:',
            error.response?.data || error.message,
          );
        }
      }
    };

    const fetchTrending = async () => {
      try {
        const response = await axios({
          method: 'GET',
          url: 'https://api.themoviedb.org/3/trending/movie/week',
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${apiKey}`,
          },
          params: { language: 'en-US' },
        });

        setFilmTrendingData(
          response.data.results.map((film: FilmResponse) => {
            return {
              title: film.title || film.name,
              overview: film.overview,
              image: `https://image.tmdb.org/t/p/w500${film.poster_path}`,
              rating: film.vote_average,
              vote_count: film.vote_count,
            };
          }),
        );

        setLoadingTrending(false);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setError(error.message);
          setLoadingPopular(false);
          console.error(
            'Error fetching film list:',
            error.response?.data || error.message,
          );
        }
      }
    };

    fetchPopular();
    fetchTrending();
  }, []);

  if (loadingPopular || loadingTrending) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div
      id="screen-container"
      className="display-flex-col items-center, justify-center, pb-[0px] h-screen bg-gray-700"
    >
      {filmTrendingData && (
        <Slider filmList={filmTrendingData} title="Trending Films" />
      )}
      {filmPopularData && (
        <Slider filmList={filmPopularData} title="Popular Films" />
      )}

      {/* Sidescroll 2 - most reviewed films? Most reviews this week? Work out second scrollbar */}
      {/* (<h3 className="text-3xl font-bold mb-4">Popular Films</h3>) */}
      <div className="m-auto p-12">
        <h3 className="text-3xl font-bold mb-[50px] justify-self-center">
          Review Leaderboard
        </h3>
        <div className="grid grid-cols-2 gap-2 gap-x-[6rem] justify-center items-center">
          <div className="flex items-center gap-2">
            <img
              src="/images/no-profile-picture.png"
              alt="profile picture"
              className="h-full"
            />
            Fake User
          </div>
          <div className="flex items-center gap-2">
            <img
              src="/images/no-profile-picture.png"
              alt="profile picture"
              className="h-full"
            />
            Fake User
          </div>
          <div className="flex items-center gap-2">
            <img
              src="/images/no-profile-picture.png"
              alt="profile picture"
              className="h-full"
            />
            Fake User
          </div>
          <div className="flex items-center gap-2">
            <img
              src="/images/no-profile-picture.png"
              alt="profile picture"
              className="h-full"
            />
            Fake User
          </div>
          <div className="flex items-center gap-2">
            <img
              src="/images/no-profile-picture.png"
              alt="profile picture"
              className="h-full"
            />
            Fake User
          </div>
          <div className="flex items-center gap-2">
            <img
              src="/images/no-profile-picture.png"
              alt="profile picture"
              className="h-full"
            />
            Fake User
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
