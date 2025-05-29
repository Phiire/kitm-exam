import React, { useEffect, useState } from 'react'
import { createMovie, getMovie, updateMovie } from '../services/EmployeeService'; //sensitive code
import { useNavigate, useParams } from 'react-router-dom';

const MovieComponent = () => {
  
    const [movieName, setMovieName] = useState('');
    const [description, setDescription] = useState('');
    const [imdbRating, setImdbRating] = useState('');
    
    const {id} = useParams();

    const [errors, setErrors] = useState({
        movieName: '',
        description: '',
        imdbRating: ''
    });

    const navigator = useNavigate();

    useEffect(() => {

        const token = localStorage.getItem("token");
        if (!token) {
            navigator('/login');
            return;
        }

        if (id){
            getMovie(id).then((response) => {
                setMovieName(response.data.movieName);
                setDescription(response.data.description);
                setImdbRating(response.data.imdbRating);}).catch(() => {
                    navigator('/movies');
                })
        }
    }, [id, navigator])

    function saveOrUpdateMovie(e)
    {
        e.preventDefault();

        if (validateForm())
        {

            const movie = {movieName, description, imdbRating}

            console.log(movie);

            if (id){
                updateMovie(id, movie).then((response) => {
                    console.log(response.data);
                    navigator('/movies');
                }).catch(error => {console.log(error);});
            }
            else
            {
                createMovie(movie).then((response) => {console.log(response.data); navigator("/movies")}).catch(
                    error => {console.log(error);}
                );
            }

        }

    }

    function validateForm()
    {
        let valid = true;

        const errorsCopy = {... errors};

        if (movieName.trim())
        {
            errorsCopy.movieName = '';
        }
        else 
        {
            errorsCopy.movieName = 'Movie name is required';
            valid = false;
        }

        if (description.trim())
        {
            errorsCopy.description = '';
        }
        else
        {
            errorsCopy.description = 'Description is required';
            valid = false;
        }

        if (imdbRating.trim())
        {
            errorsCopy.imdbRating = '';
        }
        else
        {
            errorsCopy.imdbRating = 'IMDB rating is required';
            valid = false;
        }

        setErrors(errorsCopy);

        return valid;
    }

    function pageTitle()
    {
        if (id)
        {
            return <h2 className='text-center'>Update Movie</h2>;
        }
        else
        {
            return <h2 className='text-center'>Add Movie</h2>;
        }
    }

    return (
        <div className='container mt-4'>
            <div className='row'>
                <div className='card col-md-6 offset-md-3 offset-md-3'>
                    {pageTitle()}
                    <div className='card-body'>
                        <form>
                            <div className='form-group mb-2'>
                                <label className={`form-control ${errors.movieName ? 'is-invalid': ''}`}>Movie Name:</label>
                                <input type='text' placeholder='Enter Movie Name' name='movieName' value={movieName} className='form-control' onChange={(e) => setMovieName(e.target.value)}></input>
                                {errors.movieName && <div className='invalid-feedback'>{errors.movieName}</div>}
                            </div>
                            <div className='form-group mb-2'>
                                <label className={`form-control ${errors.description ? 'is-invalid': ''}`}>Description:</label>
                                <input type='text' placeholder='Enter Movie Description' name='movieName' value={description} className='form-control' onChange={(e) => setDescription(e.target.value)}></input>
                                {errors.description && <div className='invalid-feedback'>{errors.description}</div>}
                            </div>
                            <div className='form-group mb-2'>
                                <label className={`form-control ${errors.imdbRating ? 'is-invalid': ''}`}>IMDB rating:</label>
                                <input type='text' placeholder='Enter IMDB rating' name='movieName' value={imdbRating} className='form-control' onChange={(e) => setImdbRating(e.target.value)}></input>
                                {errors.imdbRating && <div className='invalid-feedback'>{errors.imdbRating}</div>}
                            </div>

                            <button className='btn btn-success' onClick={saveOrUpdateMovie}>Submit</button>
                        </form>

                    </div>
                </div>
            </div>
        </div>
  )
}

export default MovieComponent
