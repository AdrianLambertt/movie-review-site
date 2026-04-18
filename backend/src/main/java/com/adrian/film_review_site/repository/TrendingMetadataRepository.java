package com.adrian.film_review_site.repository;

import com.adrian.film_review_site.model.TrendingMetadata;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TrendingMetadataRepository extends JpaRepository<TrendingMetadata, Long> {}

