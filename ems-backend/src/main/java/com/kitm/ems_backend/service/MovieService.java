package com.kitm.ems_backend.service;

import com.kitm.ems_backend.dto.MovieDto;

import java.util.List;

public interface MovieService {

    MovieDto createMovie(MovieDto movieDto);

    MovieDto getMovieById(Long movieId);

    List<MovieDto> getAllMovies();

    MovieDto updateMovie(Long movieId, MovieDto updatedMovie);

    void deleteMovie(Long movieId);
}
