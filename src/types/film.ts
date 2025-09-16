export type film = {
  title: string;
  overview: string;
  image: string;
  rating: number;
  vote_count: number;
};

export interface filmResponse extends film {
  name: string;
  vote_average: number;
  poster_path: string;
  release_date: string;
}
