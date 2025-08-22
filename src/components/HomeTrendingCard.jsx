export default function HomeTrendingCard({ films, sliderIndex }) {
  return (
    <div className="film-card">
      <div className="slider-img justify-align-center">
        <img
          className="min-h-[500px] min-w-[320px] h-[500px] w-[320px]"
          src={films[sliderIndex].image}
        />
      </div>
      <div className="film-context display-flex-col p-[6px]">
        <div className="flex justify-between">
          <p className="wrap-break-word">
            {"🍿 " + Math.trunc(films[sliderIndex].rating * 10) + "%"}
          </p>
          <p className="wrap-break-word">
            {films[sliderIndex].vote_count + " votes"}
          </p>
        </div>

        <span className="film-title truncate">{films[sliderIndex].title}</span>
      </div>
    </div>
  );
}
