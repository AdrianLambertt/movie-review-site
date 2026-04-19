import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import { format, minutesToHours } from 'date-fns';
import { Movie, TMDBVideo, TMDBVideoResponse } from '../types/movie';

const FAKE_RATINGS = [
  { rating: 10, percentage: 28 },
  { rating: 9, percentage: 22 },
  { rating: 8, percentage: 18 },
  { rating: 7, percentage: 12 },
  { rating: 6, percentage: 8 },
  { rating: 5, percentage: 5 },
  { rating: 4, percentage: 3 },
  { rating: 3, percentage: 2 },
  { rating: 2, percentage: 1 },
  { rating: 1, percentage: 1 },
];

export default function Details() {
  const { id } = useParams<{ id: string }>();
  const baseURL = import.meta.env.VITE_API_BASE_URL;

  const [error, setError] = useState<string>();
  const [movie, setMovie] = useState<Movie>();
  const [trailer, setTrailer] = useState<string | null>(null);

  const fetchMovie = useCallback(async () => {
    try {
      const [movieRes, trailerRes] = await Promise.all([
        axios.get<Movie>(`${baseURL}/api/movies/${id}`),
        axios.get<TMDBVideoResponse>(`${baseURL}/api/movies/${id}/videos`),
      ]);

      setMovie(movieRes.data);
      const trailers = getTrailersFromVideos(trailerRes.data.results);

      // Get the newest trailer from the list of trailers
      setTrailer(trailers.at(0)?.key ?? null);
    } catch (error) {
      console.log(error);
      const message = axios.isAxiosError(error)
        ? error.response?.data || error.message
        : 'An unexpected error occurred';
      setError(message);
    }
  }, [id]);

  useEffect(() => {
    fetchMovie();
  }, [fetchMovie]);

  if (error) {
    console.log(error);
    return (
      <div>
        <p>Failed to load movie. {error}</p>
        <button onClick={fetchMovie}>Try again</button>
        <Link to="/">Go home</Link>
      </div>
    );
  }

  return (
    <>
      <div id="screen-container">
        <div className="w-full h-full bg-gray-900">
          <div className="max-w-[1280px] min-w-[1300px] m-auto">
            <section id="movie" className="pb-10">
              <div
                id="header"
                className="flex justify-between content-center pt-16"
              >
                <div className="flex flex-col">
                  <h1 className="details-header text-white">
                    {movie ? movie.title : null}
                  </h1>
                  <div className="flex gap-5 pt-2">
                    <div className="text-gray-400">
                      {movie ? format(movie.releaseDate, 'y') : null}
                    </div>
                    <div className="text-gray-400">
                      {movie
                        ? `${minutesToHours(movie.runtime)}h ${movie.runtime % 60}m`
                        : null}
                    </div>
                  </div>
                </div>
                <div className="flex justify-between content-center gap-10">
                  <div className="flex flex-col">
                    <div className="font-bold tracking-wide text-white">
                      TMDB Rating
                    </div>
                    <div className="text-white text-center">{`${movie ? movie.voteAverage.toFixed(1) : '?'}/10`}</div>
                  </div>
                  <div className="flex flex-col">
                    <div className="font-bold tracking-wide text-white">
                      Review Count
                    </div>
                    <div className="text-white text-center">
                      {movie ? movie.voteCount : '0'}
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <div className="font-bold tracking-wide text-white">
                      Your Rating
                    </div>
                    <div className="text-gray-500 text-center">Review Now</div>
                  </div>
                </div>
              </div>
              <div id="body">
                <div id="visuals" className="flex mb-5">
                  <div id="poster" className="relative w-[500px]">
                    {movie && (
                      <img
                        className="absolute inset-0 w-full h-full object-cover rounded-[10px] pr-2"
                        src={`https://image.tmdb.org/t/p/w500${movie.posterPath}`}
                      />
                    )}
                  </div>
                  <div id="trailer" className="relative w-4/5 aspect-video">
                    {trailer && (
                      <iframe
                        className="absolute inset-0 w-full h-full rounded-[10px]"
                        src={`https://www.youtube.com/embed/${trailer}`}
                        allowFullScreen
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      />
                    )}
                  </div>
                </div>
                <div className="flex gap-10">
                  <div className="w-4/5">
                    <div id="genres" className="flex flex-wrap gap-2 mb-6">
                      {movie?.genres.map((genre) => (
                        <span
                          key={genre.id}
                          className="px-3 py-1 rounded-full bg-gray-700 text-white text-sm"
                        >
                          {genre.name}
                        </span>
                      ))}
                    </div>
                    <div id="description" className="text-white">
                      {movie ? movie.overview : null}
                    </div>
                  </div>
                  <div
                    id="user-opts"
                    className="flex flex-col justify-center items-center w-1/5 gap-3"
                  >
                    <button className="w-full px-4 py-2 rounded-full border border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white transition-colors">
                      Review
                    </button>
                    <button className="w-full px-4 py-2 rounded-full border border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white transition-colors">
                      Add to watchlist
                    </button>
                    <button className="w-full px-4 py-2 rounded-full border border-green-500 text-green-400 hover:bg-green-500 hover:text-white transition-colors">
                      Mark as watched
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
        <section id="user-reviews" className="bg-gray-900 px-10 py-10">
          <div className="max-w-[1280px] min-w-[1300px] m-auto">
            <h2 className="details-header text-white mb-6">Reviews</h2>
            <div className="flex flex-col gap-2">
              {FAKE_RATINGS.map(({ rating, percentage }) => (
                <div key={rating} className="flex items-center gap-3">
                  <span className="text-gray-400 w-4 text-right">{rating}</span>
                  <div className="flex-1 bg-gray-700 rounded-full h-4">
                    <div
                      className="bg-blue-500 h-4 rounded-full"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="text-gray-400 w-10">{percentage}%</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

function getTrailersFromVideos(videos: TMDBVideo[]) {
  const trailers = videos.filter(
    (video) => video.type === 'Trailer' && video.site === 'YouTube',
  );

  // return ordered trailers (latest first)
  return trailers.sort((a, b) => {
    return b.published_at.localeCompare(a.published_at);
  });
}
