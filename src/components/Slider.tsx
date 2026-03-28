import HomeTrendingCard from './HomeTrendingCard';
import { Movie } from '../types/movie';
import { useState } from 'react';

type SliderProps = { movieList: Movie[]; title: string };

export default function Slider({ movieList, title }: SliderProps) {
  const ITEMS_PER_PAGE = 6;
  const [FilmIndex, setFilmIndex] = useState(0);
  const visibleFilms = movieList.slice(FilmIndex, FilmIndex + ITEMS_PER_PAGE);

  const handleNext = () => {
    setFilmIndex((prev) =>
      Math.min(prev + ITEMS_PER_PAGE, movieList.length - ITEMS_PER_PAGE),
    );
  };

  const handlePrev = () => {
    setFilmIndex((prev) => Math.max(prev - ITEMS_PER_PAGE, 0));
  };

  return (
    <div className="bg-gray-900 py-12">
      <h3 className="text-3xl font-bold mb-4 text-white">{title}</h3>
      <div className="relative display-flex-row justify-align-center">
        <div className="display-flex-row justify-center">
          {visibleFilms.map((movie, index) => (
            <HomeTrendingCard key={index} movie={movie} />
          ))}
        </div>

        <button
          className="absolute left-5 sm:left-10 bg-white p-2 rounded-full w-10 h-10 flex justify-center items-center"
          onClick={handlePrev}
        >
          &lt;
        </button>
        <button
          className="absolute right-5 sm:right-10 bg-white p-2 rounded-full w-10 h-10 flex justify-center items-center"
          onClick={handleNext}
        >
          &gt;
        </button>
      </div>
    </div>
  );
}
