package com.kitm.ems_backend.service.impl;

import com.kitm.ems_backend.dto.MovieDto;
import com.kitm.ems_backend.entity.Movie;
import com.kitm.ems_backend.exception.DuplicateEmailException;
import com.kitm.ems_backend.exception.ResourceNotFoundException;
import com.kitm.ems_backend.mapper.MovieMapper;
import com.kitm.ems_backend.repository.MovieRepository;
import com.kitm.ems_backend.service.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class MovieServiceImpl implements MovieService {

    private MovieRepository movieRepository;

    @Autowired
    public MovieServiceImpl(MovieRepository movieRepository)
    {
        this.movieRepository = movieRepository;
    }

    @Override
    public MovieDto createMovie(MovieDto movieDto) {

        Optional<Movie> existingMovie = movieRepository.findByImdbRating(movieDto.getImdbRating());

        if (existingMovie.isPresent())
        {
            throw new DuplicateEmailException("Email already exists: " + movieDto.getImdbRating());
        }

        Movie movie = MovieMapper.mapToMovie(movieDto);

        Movie savedMovie = movieRepository.save(movie);

        return MovieMapper.mapToMovieDto(savedMovie);
    }

    @Override
    public MovieDto getMovieById(Long movieId) {

        Movie movie = movieRepository.findById(movieId)
                .orElseThrow(() -> new ResourceNotFoundException("Movie does not exist with given id: " + movieId));

        return MovieMapper.mapToMovieDto(movie);
    }

    @Override
    public List<MovieDto> getAllMovies() {

        List<Movie> movies = movieRepository.findAll();

        return movies.stream().map((movie) -> MovieMapper.mapToMovieDto(movie)).collect(Collectors.toList());
    }

    @Override
    public MovieDto updateMovie(Long movieId, MovieDto updatedMovie) {

        Movie movie = movieRepository.findById(movieId).orElseThrow(() -> new ResourceNotFoundException("Movie does not exist with given id: " + movieId));

        movie.setMovieName(updatedMovie.getMovieName());
        movie.setDescription(updatedMovie.getDescription());
        movie.setImdbRating(updatedMovie.getImdbRating());

        Movie updatedMovieObj = movieRepository.save(movie);

        return MovieMapper.mapToMovieDto(updatedMovieObj);
    }

    @Override
    public void deleteMovie(Long movieId) {
        Movie movie = movieRepository.findById(movieId).orElseThrow(
                () -> new ResourceNotFoundException("Movie does not exist with given id: " + movieId));

        movieRepository.deleteById(movieId);
    }
}
