import { Film } from '../types/film';

type CardProps = { film: Film };

export default function HomeTrendingCard({ film }: CardProps) {
  return (
    <div className="film-card">
      <div className="slider-img justify-align-center">
        <img
          className="min-h-[500px] min-w-[320px] h-[500px] w-[320px]"
          src={film.image}
        />
      </div>
      <div className="film-context display-flex-col p-[6px]">
        <div className="flex justify-between">
          <p className="wrap-break-word">
            {'🍿 ' + Math.trunc(film.rating * 10) + '%'}
          </p>
          <p className="wrap-break-word">{film.vote_count + ' votes'}</p>
        </div>
        <span className="film-title truncate">{film.title}</span>
      </div>
    </div>
  );
}
