export type Film = {
  id: number;
  title: string;
  overview: string;
  voteAverage: number;
  vote_count: number;
  image: string;
  rating: number;
};

export interface FilmResponse extends Film {
  name: string;
  vote_average: number;
  poster_path: string;
  release_date: string;
}

export type Movie = {
  id: number;
  title: string;
  overview: string;
  releaseDate: string;
  posterPath: string;
  voteCount: number;
  voteAverage: number;
};

export interface PopularMoviesResponse {
  id: number;
  movie: Movie;
}
