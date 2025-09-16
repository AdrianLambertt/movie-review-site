type cardProps = {
  title: string;
  image: string;
  rating: number;
  date: string;
};

export default function card({ title, image, rating, date }: cardProps) {
  return (
    <div className="card border-with-shadow">
      <div>
        <img
          src={image}
          alt="film-photo"
          className="poster w-full h-222 object-cover rounded"
        />
      </div>

      <p
        className={
          "rating " + (rating > 7 ? "good" : rating > 5 ? "mid" : "bad")
        }
      >
        {"🍿 " + Math.round(rating) * 10 + "%"}
      </p>
      <p className="title">{title}</p>

      <p className="date">{date}</p>
    </div>
  );
}
