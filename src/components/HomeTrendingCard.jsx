export default function HomeTrendingCard({ films, sliderIndex }) {
  const overview =
    films[sliderIndex].overview.length < 200
      ? films[sliderIndex].overview
      : films[sliderIndex].overview.slice(0, 200) + "...";
  console.log(overview);
  return (
    <div className="film-card">
      <div className="slider-img justify-align-center">
        <img className="h-[500px] w-[320px]" src={films[sliderIndex].image} />
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
        <p className="wrap-break-word">{overview}</p>
      </div>
    </div>
  );
}
