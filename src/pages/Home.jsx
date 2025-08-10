import { useEffect, useState } from "react";
import axios from "axios";

export default function Discover() {
  const [sliderIndex, setSliderIndex] = useState(0);

  const [filmData, setFilmData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
          params: {
            include_adult: false,
            include_null_first_air_dates: false,
            language: "en-US",
            page: 1,
            sort_by: "popularity.desc",
          },
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
  }, []);

  console.log(filmData);
  const films = filmData.map((film) => {
    return {
      title: film.title || film.name,
      overview: film.overview,
      image: `https://image.tmdb.org/t/p/w500${film.poster_path}`,
      backdrop: `https://image.tmdb.org/t/p/w500${film.backdrop_path}`,
      rating: film.vote_average,
      vote_count: film.vote_count,
    };
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div
      id="screen-container"
      className="display-flex-col items-center, justify-center, !pt-[40px] p-8 h-screen bg-red-100"
    >
      <h1 className="text-2x1 font-bold mb-4">Popular Films</h1>
      {films && (
        <div
          style={{
            backgroundImage: `url(${films[sliderIndex].backdrop})`,
            opacity: 0.2,
          }}
          className="display-flex-col justify-align-center shadow-xl bg-[url({films[sliderIndex].backdrop})] bg-cover bg-center"
        >
          <div className="film-card">
            <div className="slider-img justify-align-center m-[10px]">
              <img className="h-[650px]" src={films[sliderIndex].image} />
            </div>
            <div className="film-context flex-1 display-flex-col ">
              <h1 className="film-title">{films[sliderIndex].title}</h1>

              <div className="flex justify-between">
                <p className="wrap-break-word">
                  {"🍿 " + films[sliderIndex].rating * 10 + "%"}
                </p>
                <p className="wrap-break-word">
                  {films[sliderIndex].vote_count + " votes"}
                </p>
              </div>

              <p className="wrap-break-word">release_date</p>
              <p className="wrap-break-word">{films[sliderIndex].overview}</p>
            </div>
          </div>
          <a
            className="btn-prev absolute left-5 sm:left-10 bg-white p-2 rounded-full w-10 h-10 flex justify-center items-center"
            onClick={() => setSliderIndex(sliderIndex - 1)}
          >
            &lt;
          </a>
          <a
            className="btn-next absolute right-5 sm:right-10 bg-white p-2 rounded-full w-10 h-10 flex justify-center items-center"
            onClick={() => setSliderIndex(sliderIndex + 1)}
          >
            &gt;
          </a>
        </div>
      )}
    </div>
  );
}
