package com.kitm.ems_backend.mapper;

import com.kitm.ems_backend.dto.MovieDto;
import com.kitm.ems_backend.entity.Movie;

public class MovieMapper {

    public static MovieDto mapToMovieDto(Movie movie)
    {
        return new MovieDto(movie.getId(), movie.getMovieName(), movie.getDescription(), movie.getImdbRating());
    }

    public static Movie mapToMovie(MovieDto movieDto)
    {
        return new Movie(movieDto.getId(), movieDto.getMovieName(), movieDto.getDescription(), movieDto.getImdbRating());
    }
}
