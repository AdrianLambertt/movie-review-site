package com.adrian.film_review_site.service;

import com.adrian.film_review_site.model.Genre;
import com.adrian.film_review_site.model.Movie;
import com.adrian.film_review_site.repository.GenreRepository;
import com.adrian.film_review_site.repository.MovieRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.List;
import java.util.Optional;

@Service
public class MovieService {

    private final MovieRepository movieRepository;
    private final GenreRepository genreRepository;
    private final WebClient webClient;
    private final String apiKey;

    public MovieService(MovieRepository movieRepository, GenreRepository genreRepository, @Value("${tmdb.api.key}") String apiKey, @Value("${tmdb.base.url}") String baseUrl) {
        this.movieRepository = movieRepository;
        this.genreRepository = genreRepository;
        this.apiKey = apiKey;
        this.webClient = WebClient.builder().baseUrl(baseUrl).build();
    }

    public Movie getMovie (Long tmdb_id) {
        Optional<Movie> maybeMovie = movieRepository.findById(tmdb_id);
        if (maybeMovie.isPresent()) {
            Movie movie = maybeMovie.get();

            boolean current = movie.getVersion() >= Movie.CURRENT_VERSION;
            boolean withinCacheLimit = movie.getLastUpdated().isAfter(java.time.LocalDateTime.now().minusMonths(6));
            if (current && withinCacheLimit) {
                return movie;
            }
        }

        var request = webClient.get().uri(uriBuilder -> uriBuilder
                        .path("/movie/{id}")
                        .queryParam("language", "en-US")
                        .build(tmdb_id)
                )
                .header("Accept", "*/*")
                .header("Authorization", "Bearer %s".formatted(apiKey));

        var response = request
                .retrieve().bodyToMono(TmdbMovieResponse.class).block();


        if (response == null) throw new RuntimeException("Movie not found in TMDB");

        List<Genre> genres = response.genres.stream()
                .map(g -> genreRepository.findById(g.id)
                        .orElseGet(() -> genreRepository.save(new Genre(g.id, g.name))))
                .toList();

        Movie movie = new Movie(
                response.id,
                response.title,
                response.overview,
                response.release_date,
                response.poster_path,
                response.vote_count,
                response.vote_average,
                response.runtime,
                genres
        );

        return movieRepository.save(movie);
    }

    public TmdbVideosResponse getVideos(Long tmdbId) {
        return webClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/movie/{id}/videos")
                        .queryParam("language", "en-US")
                        .build(tmdbId))
                .header("Accept", "*/*")
                .header("Authorization", "Bearer %s".formatted(apiKey))
                .retrieve()
                .bodyToMono(TmdbVideosResponse.class)
                .block();
    }

    public record TmdbVideosResponse(String id, List<TmdbVideo> results) {}
    public record TmdbVideo(String iso_639_1, String iso_3166_1, String name, String key, String site, float size, String type,
                            boolean official, String published_at, String id) {}

    public record TmdbMovieResponse(Long id, String title, String overview,
                             String release_date, String poster_path, Long vote_count, double vote_average, float popularity, int runtime, List<TmdbGenreResponse> genres) {}

    public record TmdbGenreResponse(Long id, String name) {}
}
