package com.adrian.film_review_site.repository;

import com.adrian.film_review_site.model.PopularMetadata;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PopularMetadataRepository extends JpaRepository<PopularMetadata, Long>{}
