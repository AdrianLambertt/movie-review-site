package com.adrian.film_review_site.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.List;

@Entity(name = "movies")
public class Movie {
    public static final int CURRENT_VERSION = 3;

    @Id
    private Long id;
    private String title;
    private String overview;
    private String releaseDate;
    private String posterPath;
    private Long voteCount;
    private Double voteAverage;
    private LocalDateTime lastUpdated = LocalDateTime.now();
    private int version;
    private Integer runtime;

    @ManyToMany
    @JoinTable(
        name = "movie_genres",
        joinColumns = @JoinColumn(name = "movie_id"),
        inverseJoinColumns = @JoinColumn(name = "genre_id")
    )
    private List<Genre> genres;

    protected Movie() {
    }

    public Movie(Long id, String title, String overview, String releaseDate, String posterPath, Long voteCount, double voteAverage, Integer runtime, List<Genre> genres) {
        this.id = id;
        this.title = title;
        this.overview = overview;
        this.releaseDate = releaseDate;
        this.posterPath = posterPath;
        this.voteCount = voteCount;
        this.voteAverage = voteAverage;
        this.lastUpdated = LocalDateTime.now();
        this.version = CURRENT_VERSION;
        this.runtime = runtime;
        this.genres = genres;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getOverview() {
        return overview;
    }

    public void setOverview(String overview) {
        this.overview = overview;
    }

    public String getReleaseDate() {
        return releaseDate;
    }

    public void setReleaseDate(String releaseDate) {
        this.releaseDate = releaseDate;
    }

    public String getPosterPath() {
        return posterPath;
    }

    public void setPosterPath(String posterPath) {
        this.posterPath = posterPath;
    }

    public Long getVoteCount() {
        return voteCount;
    }

    public void setVoteCount(Long voteCount) {
        this.voteCount = voteCount;
    }

    public Double getVoteAverage() {
        return voteAverage;
    }

    public void setVoteAverage(Double voteAverage) {
        this.voteAverage = voteAverage;
    }

    public LocalDateTime getLastUpdated() {
        return lastUpdated;
    }

    public void setLastUpdated(LocalDateTime lastUpdated) {
        this.lastUpdated = lastUpdated;
    }

    public int getVersion() {
        return version;
    }

    public void setVersion(int version) {
        this.version = version;
    }

    public Integer getRuntime() {
        return runtime;
    }

    public void setRuntime(Integer runTime) {
        this.runtime = runTime;
    }

    public List<Genre> getGenres() {
        return genres;
    }
}
