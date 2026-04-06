import { useEffect, useState } from 'react';
import { Movie } from '../types/movie';
import axios from 'axios';
import Slider from '../components/Slider';
import ReviewLeaderboard from '../components/ReviewLeaderboard';
import Footer from '../components/Footer';

export default function Home() {
  const baseURL = import.meta.env.VITE_API_BASE_URL;
  const [moviePopularData, setMoviePopularData] = useState<Movie[]>([]);
  const [movieTrendingData, setMovieTrendingData] = useState<Movie[]>([]);
  const [loadingPopular, setLoadingPopular] = useState(true);
  const [loadingTrending, setLoadingTrending] = useState(true);
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    const fetchPopular = async () => {
      try {
        const response = await axios.get<Movie[]>(
          `${baseURL}/api/movies/popular`,
        );
        setMoviePopularData(response.data);
      } catch (error) {
        const message = axios.isAxiosError(error)
          ? error.response?.data || error.message
          : 'An unexpected error occurred';
        console.error('Error fetching movie list:', message);
        setError(message);
      } finally {
        setLoadingPopular(false);
      }
    };

    const fetchTrending = async () => {
      try {
        const response = await axios.get<Movie[]>(
          `${baseURL}/api/movies/trending`,
        );
        setMovieTrendingData(response.data);
      } catch (error) {
        const message = axios.isAxiosError(error)
          ? error.response?.data || error.message
          : 'An unexpected error occurred';
        console.error('Error fetching movie list:', message);
        setError(message);
      } finally {
        setLoadingTrending(false);
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
      className="flex flex-col items-center min-h-screen bg-gray-700"
    >
      {movieTrendingData && (
        <Slider movieList={movieTrendingData} title="Trending Movies" />
      )}
      {moviePopularData && (
        <Slider movieList={moviePopularData} title="Popular Movies" />
      )}

      <ReviewLeaderboard />
      <Footer />
    </div>
  );
}
