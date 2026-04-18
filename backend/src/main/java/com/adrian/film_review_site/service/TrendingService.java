package com.adrian.film_review_site.service;

import com.adrian.film_review_site.model.*;
import com.adrian.film_review_site.repository.MovieRepository;
import com.adrian.film_review_site.repository.TrendingMetadataRepository;
import com.adrian.film_review_site.repository.TrendingRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class TrendingService {
    private final TrendingRepository trendingRepository;
    private final TrendingMetadataRepository trendingMetadataRepository;
    private final MovieRepository movieRepository;
    private final WebClient webClient;
    private final String apiKey;

    public TrendingService(TrendingRepository trendingRepository, TrendingMetadataRepository trendingMetadataRepository, MovieRepository movieRepository, @Value("${tmdb.api.key}") String apiKey, @Value("${tmdb.base.url}") String baseUrl) {
        this.trendingRepository = trendingRepository;
        this.trendingMetadataRepository = trendingMetadataRepository;
        this.movieRepository = movieRepository;
        this.apiKey = apiKey;
        this.webClient = WebClient.builder().baseUrl(baseUrl).build();
    }

    public List<Movie> getTrending() {
        List<TrendingMetadata> metadata = trendingMetadataRepository.findAll();

        if (metadata.isEmpty()) {
            return requestTrendingMovies();
        }

        LocalDateTime lastUpdatedDate = metadata.getFirst().getLastUpdated();
        if (lastUpdatedDate.isBefore(LocalDateTime.now().minusDays(1))) {
            return requestTrendingMovies();
        } else {
            return trendingRepository.getAllTrendingMovies();
        }
    }

    private List<Movie> requestTrendingMovies() {
        // Remove all previous records
        trendingRepository.deleteAll();

        var request = webClient.get().uri(uriBuilder -> uriBuilder
                        .path("/trending/movie/week")
                        .queryParam("language", "en-US")
                        .build()
                )
                .header("Accept", "*/*")
                .header("Authorization", "Bearer %s".formatted(apiKey));

        var response = request
                .retrieve().bodyToMono(TrendingService.TmdbTrendingResponse.class).block();

        if (response == null) throw new RuntimeException("Movies not found in TMDB");

        List<Movie> MovieList = new ArrayList<>();

        for (int i = 0; i < response.results.size(); i++) {
            MovieService.TmdbMovieResponse result = response.results.get(i);
            Movie movie = getMovie(result);

            TrendingMovie trending = new TrendingMovie();
            trending.setMovie(movie);
            trending.setTrending(i);

            trendingRepository.save(trending);
            MovieList.add(movie);
        }

        trendingMetadataRepository.save(new TrendingMetadata());
        return MovieList;
    }

    private Movie getMovie(MovieService.TmdbMovieResponse result) {
        Movie existing = movieRepository.findById(result.id()).orElse(null);
        if (existing != null && existing.getVersion() >= Movie.CURRENT_VERSION) {
            // Already has full data (runtime + genres); return as-is to avoid overwriting
            return existing;
        }

        // Partial or new movie — save basic data with version 0 so MovieService
        // will fetch full details (runtime, genres) when the detail page is requested
        Movie movie = new Movie(
                result.id(),
                result.title(),
                result.overview(),
                result.release_date(),
                result.poster_path(),
                result.vote_count(),
                result.vote_average(),
                null,
                List.of()
        );

        movie.setVersion(0);
        return movieRepository.save(movie);
    }

    record TmdbTrendingResponse(Long page, long total_pages, long total_results,
                                List<MovieService.TmdbMovieResponse> results) {
    }
}
