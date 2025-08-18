import { useEffect, useState } from "react";
import axios from "axios";
import HomeTrendingCard from "../components/HomeTrendingCard";
import Footer from "../components/Footer";

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
      className="display-flex-col items-center, justify-center, !pt-[40px] p-8 pb-[0px] h-screen bg-red-100"
    >
      <h3 className="text-3xl font-bold mb-4">Popular Films</h3>
      {films && (
        <div className="relative display-flex-row justify-align-center shadow-xl">
          <HomeTrendingCard films={films} sliderIndex={sliderIndex} />
          <HomeTrendingCard films={films} sliderIndex={sliderIndex + 1} />
          <HomeTrendingCard films={films} sliderIndex={sliderIndex + 2} />
          <HomeTrendingCard films={films} sliderIndex={sliderIndex + 3} />

          <a
            className="btn-prev absolute left-5 sm:left-10 bg-white p-2 rounded-full w-10 h-10 flex justify-center items-center z-1"
            onClick={() =>
              setSliderIndex(sliderIndex >= 0 ? sliderIndex - 3 : sliderIndex)
            }
          >
            &lt;
          </a>
          <a
            className="btn-next absolute right-5 sm:right-10 bg-white p-2 rounded-full w-10 h-10 flex justify-center items-center z-1"
            onClick={() => {
              // cannot go above 17 due to only two films aviailable. (Grab 20 total)
              return setSliderIndex(
                sliderIndex + 3 < 17 ? sliderIndex + 3 : sliderIndex
              );
            }}
          >
            &gt;
          </a>
        </div>
      )}
      {/* Sidescroll 2 - most reviewed films? Most reviews this week? Work out second scrollbar */}
      {/* (<h3 className="text-3xl font-bold mb-4">Popular Films</h3>) */}
      <div className="justify-center m-auto">
        <h3 className="text-3xl font-bold mb-[50px] justify-self-center">
          Review Leaderboard
        </h3>
        <div className="grid grid-cols-2 gap-2 gap-x-[6rem] justify-center items-center">
          <div className="flex items-center gap-2">
            <img
              src="src/assets/no-profile-picture.png"
              alt="profile picture"
              className="h-full"
            />
            Fake User
          </div>
          <div className="flex items-center gap-2">
            <img
              src="src/assets/no-profile-picture.png"
              alt="profile picture"
              className="h-full"
            />
            Fake User
          </div>
          <div className="flex items-center gap-2">
            <img
              src="src/assets/no-profile-picture.png"
              alt="profile picture"
              className="h-full"
            />
            Fake User
          </div>
          <div className="flex items-center gap-2">
            <img
              src="src/assets/no-profile-picture.png"
              alt="profile picture"
              className="h-full"
            />
            Fake User
          </div>
          <div className="flex items-center gap-2">
            <img
              src="src/assets/no-profile-picture.png"
              alt="profile picture"
              className="h-full"
            />
            Fake User
          </div>
          <div className="flex items-center gap-2">
            <img
              src="src/assets/no-profile-picture.png"
              alt="profile picture"
              className="h-full"
            />
            Fake User
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
