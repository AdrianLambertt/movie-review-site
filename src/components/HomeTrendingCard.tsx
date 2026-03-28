import { Movie } from '../types/movie';

type CardProps = { movie: Movie };

export default function HomeTrendingCard({ movie }: CardProps) {
  return (
    <div className="film-card">
      <div className="slider-img justify-align-center">
        <img
          className="min-h-[500px] min-w-[320px] h-[500px] w-[320px]"
          src={movie.posterPath}
        />
      </div>
      <div className="film-context display-flex-col p-[6px]">
        <div className="flex justify-between">
          <p className="wrap-break-word">
            {'🍿 ' + Math.trunc(movie.voteAverage * 10) + '%'}
          </p>
          <p className="wrap-break-word">{movie.voteCount + ' votes'}</p>
        </div>
        <span className="film-title truncate">{movie.title}</span>
      </div>
    </div>
  );
}
