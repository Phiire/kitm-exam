package com.kitm.ems_backend.dto;


public class MovieDto {
    private Long id;
    private String movieName;
    private String description;
    private String imdbRating;

    public MovieDto(Long id, String movieName, String description, String imdbRating) {
        this.id = id;
        this.movieName = movieName;
        this.description = description;
        this.imdbRating = imdbRating;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMovieName() {
        return movieName;
    }

    public void setMovieName(String movieName) {
        this.movieName = movieName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getImdbRating() {
        return imdbRating;
    }

    public void setImdbRating(String imdbRating) {
        this.imdbRating = imdbRating;
    }
}
