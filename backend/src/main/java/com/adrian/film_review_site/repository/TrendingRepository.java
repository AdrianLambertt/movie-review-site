package com.adrian.film_review_site.repository;

import com.adrian.film_review_site.model.Movie;
import com.adrian.film_review_site.model.TrendingMovie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TrendingRepository extends JpaRepository<TrendingMovie, Long> {
    @Query("SELECT t.movie FROM TrendingMovie t order by t.trending")
    List<Movie> getAllTrendingMovies();
}

