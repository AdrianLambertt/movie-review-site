export type film = {
  id: number;
  title: string;
  overview: string;
  voteAverage: number;
  vote_count: number;
};

export interface filmResponse extends film {
  name: string;
  vote_average: number;
  poster_path: string;
  release_date: string;
}

export type movie = {
  id: number;
  title: string;
  overview: string;
  releaseDate: string;
  posterPath: string;
  voteCount: number;
  voteAverage: number;
};

export interface popularMoviesResponse {
  id: number;
  movie: movie;
}
