CREATE TABLE movies (
    id BIGINT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    overview TEXT NOT NULL,
    release_date VARCHAR(20) NOT NULL,
    poster_path VARCHAR(255) NOT NULL,
    vote_count BIGINT NOT NULL,
    vote_average DECIMAL(3,1) NOT NULL,
    last_updated TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
