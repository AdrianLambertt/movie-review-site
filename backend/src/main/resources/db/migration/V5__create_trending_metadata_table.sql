create table trending_metadata (
  id INT PRIMARY KEY DEFAULT 1,
  last_updated TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);