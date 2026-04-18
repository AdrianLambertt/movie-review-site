package com.adrian.film_review_site.repository;

import com.adrian.film_review_site.model.Genre;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GenreRepository extends JpaRepository<Genre, Long>{}

