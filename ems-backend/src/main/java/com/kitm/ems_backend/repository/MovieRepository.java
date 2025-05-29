package com.kitm.ems_backend.repository;

import com.kitm.ems_backend.entity.Movie;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MovieRepository extends JpaRepository<Movie, Long> {
    Optional<Movie> findByImdbRating(String imdbRating);
}
