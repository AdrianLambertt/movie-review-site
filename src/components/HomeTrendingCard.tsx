import { Link } from 'react-router-dom';
import { Movie } from '../types/movie';

type CardProps = { movie: Movie };

export default function HomeTrendingCard({ movie }: CardProps) {
  return (
    <Link
      to={`/details/${movie.id}`}
      className="movie-card rounded-[10px] no-underline text-inherit"
    >
      <div className="flex overflow-hidden justify-center items-center">
        <img
          className="min-h-[500px] min-w-[320px] h-[500px] w-[320px]"
          src={`https://image.tmdb.org/t/p/w500${movie.posterPath}`}
        />
      </div>
      <div className="movie-context flex flex-col p-[6px]">
        <div className="flex justify-between">
          <p className="wrap-break-word">
            {'🍿 ' + Math.trunc(movie.voteAverage * 10) + '%'}
          </p>
          <p className="wrap-break-word">{`${movie.voteCount} ratings`}</p>
        </div>
        <span className="movie-title truncate">{movie.title}</span>
      </div>
    </Link>
  );
}
