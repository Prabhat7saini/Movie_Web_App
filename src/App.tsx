
import Navbar from "./component/Navbar"
import Login from "./pages/Login"
import Registraion from "./pages/Registraion"
// import MovieLisiting from "./pages/MovieLisiting"
import FavMovieList from "./component/FavMovieList"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import MovieLisiting from "./pages/MovieLisiting"
import PrivateRoute from "./Rotute/PrivateRoue"
import MovieDetailCard from "./pages/MovieDetailCard"
import { useSelector } from "react-redux"
import { UserState } from "./utils/UserInterface"

function App() {

const currentUser=useSelector((state:UserState)=>state.currentUser);
  return (
    <>
      {/* <Login></Login> */}
      <BrowserRouter>
      <Navbar></Navbar>
        <Routes>
        <Route path="/" element={<MovieLisiting />} />
        {
          currentUser?(<> <Route path="/login" element={<Navigate to="/favmovie" />} />
              <Route path="/favmovie" element={<FavMovieList />} /></>):(<></>)
        }
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registraion/>}/>
         

          <Route path="/favmovie" element={
             <PrivateRoute>
            <FavMovieList/>
          </PrivateRoute>
          }
            />
            <Route  path="/MovieDetils/:Title" element={<MovieDetailCard/>}/>
        </Routes>

      </BrowserRouter>
    </>
  )
}

export default App

