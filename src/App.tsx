import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import localforage from "localforage";

import Navbar from "./component/Navbar";
import Login from "./pages/Login";
import Registration from "./pages/Registraion";
import MovieListing from "./pages/MovieLisiting";
import FavMovieList from "./component/FavMovieList";
import PrivateRoute from "./Rotute/PrivateRoue";
import MovieDetailCard from "./pages/MovieDetailCard";
import { UserState } from "./utils/UserInterface";
// import {setaddComment} from './redux/slices/userSlice'

const App: React.FC = () => {
  

  const currentUser = useSelector((state: UserState) => state.currentUser);

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<MovieListing />} />
          {currentUser ? (
            <>
              <Route path="/login" element={<Navigate to="/favmovie" />} />
              <Route path="/favmovie" element={<FavMovieList />} />
            </>
          ) : (
            <></>
          )}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          <Route
            path="/favmovie"
            element={
              <PrivateRoute>
                <FavMovieList />
              </PrivateRoute>
            }
          />
          <Route path="/MovieDetails/:Title" element={<MovieDetailCard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
