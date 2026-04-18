package com.adrian.film_review_site.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class PopularMetadata {
    @Id
    private Long id = 1L;   // always 1

    @Column(nullable = false)
    private final LocalDateTime lastUpdated;

    public PopularMetadata() {
        this.lastUpdated = LocalDateTime.now();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDateTime getLastUpdated() {
        return lastUpdated;
    }
}
