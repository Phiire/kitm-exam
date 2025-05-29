import API from "./API";


const EMPLOYEE_API = '/movies';

export const listMovies = () => API.get(EMPLOYEE_API);

export const createMovie = (movie) => API.post(EMPLOYEE_API, movie);

export const getMovie = (movieId) =>  API.get(`${EMPLOYEE_API}/${movieId}`);

export const updateMovie = (movieId, movie) => API.put(`${EMPLOYEE_API}/${movieId}`, movie);

export const deleteMovie = (movieId) => API.delete(`${EMPLOYEE_API}/${movieId}`);