package com.adrian.film_review_site.repository;

import com.adrian.film_review_site.model.Movie;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MovieRepository extends JpaRepository<Movie, Long>{}
