create table trending_movies (
    id SERIAL PRIMARY KEY,
    movie_id BIGINT references movies (id) NOT NULL,
    trending INT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);