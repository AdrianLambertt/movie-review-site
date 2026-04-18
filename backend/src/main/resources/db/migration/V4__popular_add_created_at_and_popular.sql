alter table popular_movies
ADD popularity FLOAT NOT NULL,
ADD created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now();