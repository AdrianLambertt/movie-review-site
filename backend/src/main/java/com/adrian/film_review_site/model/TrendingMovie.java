package com.adrian.film_review_site.model;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import java.time.LocalDateTime;

@Entity
@Table(name = "trending_movies")
public class TrendingMovie {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private int trending;

    @Column(nullable = false)
    @CreationTimestamp
    private LocalDateTime createdAt;

    @OneToOne
    @JoinColumn(name = "movie_id")
    private Movie movie;

    public TrendingMovie() {}

    public void setId(Long id) {
        this.id = id;
    }

    public Movie getMovie() {
        return movie;
    }

    public void setMovie(Movie movie) {
        this.movie = movie;
    }

    public float getTrending() {
        return trending;
    }

    public void setTrending(int trending) {
        this.trending = trending;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}

