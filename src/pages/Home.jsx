import { useEffect, useState } from "react";
import axios from "axios";
import HomeTrendingCard from "../components/HomeTrendingCard";
import Footer from "../components/Footer";

export default function Discover() {
  const [sliderIndex, setSliderIndex] = useState(0);

  const [filmPopularData, setFilmPopularData] = useState([]);
  const [filmTrendingData, setFilmTrendingData] = useState([]);
  const [loadingPopular, setLoadingPopular] = useState(true);
  const [loadingTrending, setLoadingTrending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiKey = import.meta.env.VITE_TMDB_API_KEY;

    const fetchPopular = async () => {
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

        setFilmPopularData(
          response.data.results.map((film) => {
            return {
              title: film.title || film.name,
              overview: film.overview,
              image: `https://image.tmdb.org/t/p/w500${film.poster_path}`,
              rating: film.vote_average,
              vote_count: film.vote_count,
            };
          })
        );

        setLoadingPopular(false);
      } catch (error) {
        setError(error.message);
        setLoadingPopular(false);
        console.error(
          "Error fetching film list:",
          error.response?.data || error.message
        );
      }
    };

    const fetchTrending = async () => {
      try {
        const response = await axios({
          method: "GET",
          url: "https://api.themoviedb.org/3/trending/movie/week",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          params: { language: "en-US" },
        });

        setFilmTrendingData(
          response.data.results.map((film) => {
            return {
              title: film.title || film.name,
              overview: film.overview,
              image: `https://image.tmdb.org/t/p/w500${film.poster_path}`,
              rating: film.vote_average,
              vote_count: film.vote_count,
            };
          })
        );

        setLoadingTrending(false);
      } catch (error) {
        setError(error.message);
        setLoadingTrending(false);
        console.error(
          "Error fetching film list:",
          error.response?.data || error.message
        );
      }
    };

    fetchPopular();
    fetchTrending();
  }, []);

  if (loadingPopular || loadingTrending) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div
      id="screen-container"
      className="display-flex-col items-center, justify-center, pb-[0px] h-screen bg-gray-700"
    >
      {filmTrendingData && (
        <div className="bg-gray-900 py-12">
          <h3 className="text-3xl font-bold mb-4 text-white">Trending Films</h3>
          <div className="relative display-flex-row justify-align-center">
            <div className="display-flex-row justify-center">
              <HomeTrendingCard
                films={filmTrendingData}
                sliderIndex={sliderIndex}
              />
              <HomeTrendingCard
                films={filmTrendingData}
                sliderIndex={sliderIndex + 1}
              />
              <HomeTrendingCard
                films={filmTrendingData}
                sliderIndex={sliderIndex + 2}
              />
              <HomeTrendingCard
                films={filmTrendingData}
                sliderIndex={sliderIndex + 3}
              />
              <HomeTrendingCard
                films={filmTrendingData}
                sliderIndex={sliderIndex + 4}
              />
              <HomeTrendingCard
                films={filmTrendingData}
                sliderIndex={sliderIndex + 5}
              />
            </div>
            <a
              className="btn-prev absolute left-5 sm:left-10 bg-white p-2 rounded-full w-10 h-10 flex justify-center items-center z-1"
              onClick={() =>
                setSliderIndex(
                  sliderIndex - 6 >= 0 ? sliderIndex - 6 : sliderIndex
                )
              }
            >
              &lt;
            </a>
            <a
              className="btn-next absolute right-5 sm:right-10 bg-white p-2 rounded-full w-10 h-10 flex justify-center items-center z-1"
              onClick={() => {
                // cannot go above 17 due to only two films aviailable. (Grab 20 total)
                return setSliderIndex(
                  sliderIndex + 6 < 18 ? sliderIndex + 6 : sliderIndex
                );
              }}
            >
              &gt;
            </a>
          </div>
        </div>
      )}
      {filmPopularData && (
        <div className="bg-gray-900 py-12">
          <h3 className="text-3xl font-bold mb-4 text-white">Popular Films</h3>
          <div className="relative display-flex-row justify-align-center ">
            <div className="display-flex-row justify-center">
              <HomeTrendingCard
                films={filmPopularData}
                sliderIndex={sliderIndex}
              />
              <HomeTrendingCard
                films={filmPopularData}
                sliderIndex={sliderIndex + 1}
              />
              <HomeTrendingCard
                films={filmPopularData}
                sliderIndex={sliderIndex + 2}
              />
              <HomeTrendingCard
                films={filmPopularData}
                sliderIndex={sliderIndex + 3}
              />
              <HomeTrendingCard
                films={filmPopularData}
                sliderIndex={sliderIndex + 4}
              />
              <HomeTrendingCard
                films={filmPopularData}
                sliderIndex={sliderIndex + 5}
              />
            </div>
            <a
              className="btn-prev absolute left-5 sm:left-10 bg-white p-2 rounded-full w-10 h-10 flex justify-center items-center z-1"
              onClick={() =>
                setSliderIndex(
                  sliderIndex - 6 >= 0 ? sliderIndex - 6 : sliderIndex
                )
              }
            >
              &lt;
            </a>
            <a
              className="btn-next absolute right-5 sm:right-10 bg-white p-2 rounded-full w-10 h-10 flex justify-center items-center z-1x"
              onClick={() => {
                // cannot go above 17 due to only two films aviailable. (Grab 20 total)
                return setSliderIndex(
                  sliderIndex + 6 < 18 ? sliderIndex + 6 : sliderIndex
                );
              }}
            >
              &gt;
            </a>
          </div>
        </div>
      )}

      {/* Sidescroll 2 - most reviewed films? Most reviews this week? Work out second scrollbar */}
      {/* (<h3 className="text-3xl font-bold mb-4">Popular Films</h3>) */}
      <div className="m-auto p-12">
        <h3 className="text-3xl font-bold mb-[50px] justify-self-center">
          Review Leaderboard
        </h3>
        <div className="grid grid-cols-2 gap-2 gap-x-[6rem] justify-center items-center">
          <div className="flex items-center gap-2">
            <img
              src="/images/no-profile-picture.png"
              alt="profile picture"
              className="h-full"
            />
            Fake User
          </div>
          <div className="flex items-center gap-2">
            <img
              src="/images/no-profile-picture.png"
              alt="profile picture"
              className="h-full"
            />
            Fake User
          </div>
          <div className="flex items-center gap-2">
            <img
              src="/images/no-profile-picture.png"
              alt="profile picture"
              className="h-full"
            />
            Fake User
          </div>
          <div className="flex items-center gap-2">
            <img
              src="/images/no-profile-picture.png"
              alt="profile picture"
              className="h-full"
            />
            Fake User
          </div>
          <div className="flex items-center gap-2">
            <img
              src="/images/no-profile-picture.png"
              alt="profile picture"
              className="h-full"
            />
            Fake User
          </div>
          <div className="flex items-center gap-2">
            <img
              src="/images/no-profile-picture.png"
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
