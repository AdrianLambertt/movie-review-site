import HomeTrendingCard from './HomeTrendingCard';
import { Movie } from '../types/movie';
import { useState, useEffect, useRef } from 'react';

type SliderProps = { movieList: Movie[]; title: string };

export default function Slider({ movieList, title }: SliderProps) {
  const rowRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const [hovered, setHovered] = useState(false);

  const updateScrollState = () => {
    const el = rowRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 0);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 1);
  };

  useEffect(() => {
    updateScrollState();
  }, [movieList]);

  const scroll = (direction: 'left' | 'right') => {
    const el = rowRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.85;
    el.scrollBy({
      left: direction === 'right' ? amount : -amount,
      behavior: 'smooth',
    });
  };

  return (
    <div
      className="w-full bg-gray-900 py-6"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <h3 className="text-3xl font-bold mb-4 text-white px-12">{title}</h3>

      <div className="relative">
        {/* Left arrow */}
        <button
          onClick={() => scroll('left')}
          className={`
            absolute left-0 top-0 z-20 h-full w-12 bg-black/50 text-white text-6xl
            flex items-center justify-center transition-opacity duration-200
            ${hovered && !atStart ? 'opacity-100' : 'opacity-0 pointer-events-none'}
          `}
        >
          &#8249;
        </button>

        <div
          ref={rowRef}
          onScroll={updateScrollState}
          className="flex flex-row gap-1 overflow-x-scroll scroll-smooth px-12"
          style={{ scrollbarWidth: 'none' }}
        >
          {movieList.map((movie, index) => (
            <div
              key={index}
              className="flex-shrink-0 transition-transform duration-200 hover:scale-105 hover:z-10"
            >
              <HomeTrendingCard movie={movie} />
            </div>
          ))}
        </div>

        {/* Right arrow */}
        <button
          onClick={() => scroll('right')}
          className={`
            absolute right-0 top-0 z-20 h-full w-12 bg-black/50 text-white text-6xl
            flex items-center justify-center transition-opacity duration-200
            ${hovered && !atEnd ? 'opacity-100' : 'opacity-0 pointer-events-none'}
          `}
        >
          &#8250;
        </button>
      </div>
    </div>
  );
}
