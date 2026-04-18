package com.adrian.film_review_site.controller;

import com.adrian.film_review_site.model.Movie;
import com.adrian.film_review_site.service.MovieService;
import com.adrian.film_review_site.service.PopularService;
import com.adrian.film_review_site.service.TrendingService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/movies")
public class MovieController {

    private final MovieService movieService;
    private final PopularService popularService;
    private final TrendingService trendingService;

    public MovieController(MovieService movieService, PopularService popularService, TrendingService trendingService) {
        this.movieService = movieService;
        this.popularService = popularService;
        this.trendingService = trendingService;
    }

    @GetMapping("/{id}")
    public Movie getMovie(@PathVariable Long id) {
        return movieService.getMovie(id);
    }

    @GetMapping("/popular")
    public List<Movie> getPopularMovies() {
        return popularService.getPopular();
    }

    @GetMapping("/trending")
    public List<Movie> getTrendingMovies() {
        return trendingService.getTrending();
    }
}
