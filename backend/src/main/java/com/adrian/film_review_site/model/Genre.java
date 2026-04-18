package com.adrian.film_review_site.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;


@Entity(name = "genres")
public class Genre {
    @Id
    private Long id;
    private String name;

    protected Genre() {
    }

    public Genre(Long id, String name) {
        this.id = id;
        this.name = name;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }
}
