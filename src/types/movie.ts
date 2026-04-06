export type Film = {
  id: number;
  title: string;
  overview: string;
  voteAverage: number;
  voteCount: number;
  image: string;
  rating: number;
};

export interface FilmResponse extends Film {
  name: string;
  vote_average: number;
  poster_path: string;
  release_date: string;
}

export type Genre = {
  id: number;
  name: string;
};

export type Movie = {
  id: number;
  title: string;
  overview: string;
  releaseDate: string;
  posterPath: string;
  voteCount: number;
  voteAverage: number;
  version: number;
  runtime: number;
  genres: Genre[];
};

export interface TMDBVideoResponse {
  id: number;
  results: TMDBVideo[];
}

export type TMDBVideo = {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
  id: string;
};
