
import { useSelector } from 'react-redux'
import data from '../../data.json'
import MovieCard from './MovieList';
import {   Movie, UserState } from '../utils/UserInterface';
import { Grid } from '@mui/material';
const FavMovieList = () => {
    const  currentUser = useSelector((state: UserState) => state.currentUser);
    const favarry=currentUser?.fav;
    let ansarry:any=[];
            for(let i=0;i<data.length;i++){
                 favarry?.forEach((ele)=>{
                    if(ele===data[i].Title){
                         ansarry.push(data[i]);
                    }
                 })
            }
           
            if(ansarry.length===0){
               return(<h1 style={{margin:'10rem'}}>You Don't Have Any Fav Movie</h1>)
            }
             
    return (
        <Grid container spacing={2} sx={{marginTop:'5px'}}>
        {/* <Grid container spacing={2}> */}
      {ansarry.map((ele:Movie,index:number) => (
        //   
        // console.log()
        <Grid key={index} item xs={12}>
        <MovieCard Title={ele.Title}   Poster={ele.Poster} Ratings={ele.Ratings.find(rating => rating.Source === 'Rotten Tomatoes')?.Value || ''} // Example of extracting a specific rating value
   Plot={ele.Plot} Year={ele.Year}/>
        
        </Grid>
      ))}
    </Grid>
    // </Grid>
    )
}

export default FavMovieList
