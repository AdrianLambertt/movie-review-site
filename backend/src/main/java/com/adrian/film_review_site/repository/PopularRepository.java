package com.adrian.film_review_site.repository;

import com.adrian.film_review_site.model.Movie;
import com.adrian.film_review_site.model.PopularMovie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface PopularRepository extends JpaRepository<PopularMovie, Long>{
    @Query("SELECT p.movie FROM PopularMovie p order by p.popularity desc")
    List<Movie> getAllPopularMovies();
}
