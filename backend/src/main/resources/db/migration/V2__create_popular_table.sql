create table popular_movies (
id SERIAL PRIMARY KEY,
movie_id BIGINT references movies (id) NOT NULL
);