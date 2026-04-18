package com.adrian.film_review_site.model;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;


@Entity
@Table(name = "popular_movies")
public class PopularMovie {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private float popularity;

    @Column(nullable = false)
    @CreationTimestamp
    private LocalDateTime createdAt;

    @OneToOne
    @JoinColumn(name = "movie_id")
    private Movie movie;

    public PopularMovie() {}

    public void setId(Long id) {
        this.id = id;
    }

    public Movie getMovie() {
        return movie;
    }

    public void setMovie(Movie movie) {
        this.movie = movie;
    }

    public float getPopularity() {
        return popularity;
    }

    public void setPopularity(float popularity) {
        this.popularity = popularity;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
