package com.adrian.film_review_site.service;

import com.adrian.film_review_site.model.Movie;
import com.adrian.film_review_site.model.PopularMetadata;
import com.adrian.film_review_site.model.PopularMovie;
import com.adrian.film_review_site.repository.MovieRepository;
import com.adrian.film_review_site.repository.PopularMetadataRepository;
import com.adrian.film_review_site.repository.PopularRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class PopularService {
    private final PopularRepository popularRepository;
    private final MovieRepository movieRepository;
    private final PopularMetadataRepository popularMetadataRepository;
    private final WebClient webClient;
    private final String apiKey;

    public PopularService(PopularRepository popularRepository, MovieRepository movieRepository, PopularMetadataRepository popularMetadataRepository, @Value("${tmdb.api.key}") String apiKey, @Value("${tmdb.base.url}") String baseUrl) {
        this.popularRepository = popularRepository;
        this.movieRepository = movieRepository;
        this.popularMetadataRepository = popularMetadataRepository;
        this.apiKey = apiKey;
        this.webClient = WebClient.builder().baseUrl(baseUrl).build();
    }

    public List<Movie> getPopular() {
        List<PopularMetadata> metadata = popularMetadataRepository.findAll();

        if (metadata.isEmpty()) {
            return requestPopularMovies();
        }

        LocalDateTime lastUpdatedDate = metadata.getFirst().getLastUpdated();
        if (lastUpdatedDate.isBefore(LocalDateTime.now().minusDays(1))) {
            return requestPopularMovies();
        } else {
            return popularRepository.getAllPopularMovies();
        }
    }

    private List<Movie> requestPopularMovies() {
        // Remove all previous records
        popularRepository.deleteAll();

        var request = webClient.get().uri(uriBuilder -> uriBuilder
                        .path("/movie/popular")
                        .queryParam("language", "en-US")
                        .build()
                )
                .header("Accept", "*/*")
                .header("Authorization", "Bearer %s".formatted(apiKey));

        var response = request
                .retrieve().bodyToMono(TmdbPopularResponse.class).block();

        if (response == null) throw new RuntimeException("Movies not found in TMDB");

        List<Movie> MovieList = new ArrayList<>();

        for (int i = 0; i < response.results.size(); i++) {
            MovieService.TmdbMovieResponse result = response.results.get(i);
            Movie movie = getMovie(result);

            PopularMovie popular = new PopularMovie();
            popular.setMovie(movie);
            popular.setPopularity(result.popularity());

            popularRepository.save(popular);
            MovieList.add(movie);
        }

        popularMetadataRepository.save(new PopularMetadata());
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


    record TmdbPopularResponse(Long page, List<MovieService.TmdbMovieResponse> results) {}
}
