import { useEffect, useState } from "react";
import axios from "axios";
import Card from "../components/Card";

export default function Discover() {
  const [params, setParams] = useState({
    include_adult: false,
    include_null_first_air_dates: false,
    language: "en-US",
    page: 1,
    sort_by: "popularity.desc",
    "vote_average.gte": 1,
  });
  const [filmData, setFilmData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleAverageUserRatingChange = (e) => {
    e.preventDefault();
    setParams({ ...params, "vote_average.gte": e.target.value });
  };

  useEffect(() => {
    const apiKey = import.meta.env.VITE_TMDB_API_KEY;

    const fetchShows = async () => {
      try {
        const response = await axios({
          method: "GET",
          url: "https://api.themoviedb.org/3/discover/movie",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          params: params,
        });

        setFilmData(response.data.results);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
        console.error(
          "Error fetching film list:",
          error.response?.data || error.message
        );
      }
    };

    fetchShows();
  }, [params]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <div className="min-h-screen !pt-[50px] !px-[150px] flex flex-col">
        <div className="title-homepage">
          <h2 className="home-title w-[300px]">Popular Movies</h2>
        </div>
        <div className="flex flex-row">
          <div className="basis-[350px]">
            <div className="sidebar border-with-shadow flex flex-col">
              <div className="flex flex-col">
                User Rating
                <input
                  type="range"
                  defaultValue={params["vote_average.gte"]}
                  min="1"
                  max="10"
                  className="slider"
                  onChange={handleAverageUserRatingChange}
                />
              </div>
              <div>a</div>
            </div>
          </div>
          <div className="basis-3/4 flex flex-row flex-wrap">
            {filmData.map((film, i) => (
              <Card
                key={i}
                title={film.title || film.name}
                image={`https://image.tmdb.org/t/p/w500${film.poster_path}`}
                rating={film.vote_average}
                date={film.release_date}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
