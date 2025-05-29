import React, {useEffect, useState} from "react"
import { deleteMovie, listMovies } from "../services/EmployeeService.js"; //sensitive code
import { useNavigate } from 'react-router-dom';

function ListMovieComponenet() {

    const [movies, setMovies] = useState([]);

    const navigator = useNavigate();

    const roles = localStorage.getItem("roles");

    useEffect(() => {

        const token = localStorage.getItem("token");
        if (!token) {
            navigator('/login');
            return;
        }

        console.log(localStorage.getItem("roles"));

        getAllMovies();
    }, [navigator]);

    function getAllMovies()
    {
        listMovies().then((response) => {setMovies(response.data)}).catch(error => {
            console.error(error);
        });
    }

    function addNewMovie(){
        navigator('/add-movie');
    }

    function updateMovie(id){
        navigator(`/edit-movie/${id}`);
    }

    function removeMovie(id){
        console.log(id);

        deleteMovie(id).then((response) => {
            console.log(response);
            getAllMovies();
        }).catch(error => {
            console.log(error);
        });
    }

    return (
        <div className="container">
            <h2 className="text-center">List of Movies</h2>
            {roles && roles.includes("ROLE_ADMIN") && (<button className="btn btn-primary mb-2" onClick={addNewMovie}>Add Movie</button>)}
            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>Movie Id</th>
                        <th>Movie Name</th>
                        <th>Movie Description</th>
                        <th>IMDB Rating</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        movies.map(movie => 
                        <tr key={movie.id}>
                            <td>{movie.id}</td>
                            <td>{movie.movieName}</td>
                            <td>{movie.description}</td>
                            <td>{movie.imdbRating}</td>
                            <td>
                                {roles && roles.includes("ROLE_ADMIN") && (<button className="btn btn-info" onClick={() => updateMovie(movie.id)}>Update</button>)}
                                {roles && roles.includes("ROLE_ADMIN") && (<button className="btn btn-danger" style={{marginLeft: '10px'}} onClick={() => removeMovie(movie.id)}>Delete</button>)}
                            </td>
                        </tr>)
                    }
                </tbody>
            </table>
        </div>
    )
}

export default ListMovieComponenet
