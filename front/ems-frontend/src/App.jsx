import './App.css'
import MovieComponent from './componenets/MovieComponent.jsx' //sensitive code
import FooterComponenet from './componenets/FooterComponent.jsx'
import HeaderComponent from './componenets/HeaderComponent.jsx'
import ListMovieComponenet from './componenets/ListMovieComponent.jsx' //sensitive code
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import SignUpComponenet from './componenets/SignUpComponent.jsx'
import LogInComponenet from './componenets/LogInComponent.jsx'


function App() {

  return (
    <>
    <BrowserRouter>
      <HeaderComponent/>
      <Routes>
        {/* //http://localhost:3000 */}
        <Route path='/' element = {<ListMovieComponenet/>}></Route>

        {/* //http://localhost:3000/movies */}
        <Route path='/movies' element = {<ListMovieComponenet/>}></Route>

        {/* //http://localhost:3000/add-movie */}
        <Route path='/add-movie' element={<MovieComponent/>}></Route> {/* sensitive code */}
        
        {/* //http://localhost:3000/edit-movie/1 */}
        <Route path='/edit-movie/:id' element={<MovieComponent/>}></Route> {/* sensitive code */}

        {/* //http://localhost:3000/signup */}
        <Route path='/signup' element = {<SignUpComponenet/>}></Route>

        {/* //http://localhost:3000/login */}
        <Route path='/login' element={<LogInComponenet/>}></Route>
      </Routes>
      <FooterComponenet/>
    </BrowserRouter>
    </>
  )
}

export default App
