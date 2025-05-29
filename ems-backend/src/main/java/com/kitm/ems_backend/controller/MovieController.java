package com.kitm.ems_backend.controller;

import com.kitm.ems_backend.dto.MovieDto;
import com.kitm.ems_backend.service.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/movies")
public class MovieController {

    private MovieService movieService;

    @Autowired
    public MovieController(MovieService movieService)
    {
        this.movieService = movieService;
    }

    // Build add movie Rest API

    @PostMapping
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<MovieDto> createMovie(@RequestBody MovieDto movieDto)
    {
        MovieDto savedMovie = movieService.createMovie(movieDto);

        return new ResponseEntity<>(savedMovie, HttpStatus.CREATED);
    }

    // build get movie Rest api

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<MovieDto> getMovieById(@PathVariable("id") Long movieId)
    {
        MovieDto movieDto = movieService.getMovieById(movieId);

        return ResponseEntity.ok(movieDto);
    }

    @GetMapping
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<List<MovieDto>> getAllMovies()
    {
        List<MovieDto> movieDtos = movieService.getAllMovies();

        return ResponseEntity.ok(movieDtos);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<MovieDto> updateMovie(@PathVariable("id") Long movieId, @RequestBody MovieDto updatedMovie)
    {
        MovieDto movieDto = movieService.updateMovie(movieId, updatedMovie);

        return ResponseEntity.ok(movieDto);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<String> deleteMovie(@PathVariable("id") Long movieId)
    {
        movieService.deleteMovie(movieId);
        return ResponseEntity.ok("Movie deleted successfully");
    }
}
