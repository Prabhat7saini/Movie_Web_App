import React from 'react';
import data from '../../data.json';
import MovieCard from '../component/MovieList'; 
import { useSelector } from 'react-redux'; 

import Grid from '@mui/material/Grid'; 
import { UserState } from '../utils/UserInterface';
import { Box, Typography } from '@mui/material';

const MovieListing: React.FC = () => {
  const Movie = useSelector((state: UserState) => state.Movie);
  const isSearch=useSelector((state:UserState)=>state.isSearch) 
  // console.log(Movie, "inside selector");

  if(isSearch===true && Movie.length===0){
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <Typography variant="h1" align="center">
          Not Found
        </Typography>
      </Box>
    );
  }
                 
  return (
    <Grid container spacing={2} sx={{ marginTop: "5px" }}>
      {Movie?.length > 0 ? (
        Movie.map((ele, index) => (
          <Grid key={index} item xs={12}>
            <MovieCard
              Title={ele.Title}
              Poster={ele.Poster}
              Ratings={
                ele.Ratings.find((rating) => rating.Source === 'Rotten Tomatoes')
                  ?.Value || ''
              }
              Plot={ele.Plot}
              Year={ele.Year}
            />
          </Grid>
        ))
      ) : (
        data.map((ele, index) => (
          <Grid key={index} item xs={12}>
            <MovieCard
              Title={ele.Title}
              Poster={ele.Poster}
              Ratings={
                ele.Ratings.find((rating) => rating.Source === 'Rotten Tomatoes')
                  ?.Value || ''
              }
              Plot={ele.Plot}
              Year={ele.Year}
            />
          </Grid>
        ))
      )}
    </Grid>
  );
};

export default MovieListing;
