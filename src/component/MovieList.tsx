import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Grid from '@mui/material/Grid';
import { styled, Theme } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { addFavMov, removeFavMov } from '../redux/slices/userSlice';
import { useNavigate } from "react-router-dom";
import { UserState } from '../utils/UserInterface'; 
// import MovieDetailCard from '../pages/MovieDetailCard';

const StyledCard = styled(Card)(({  }: { theme: Theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    height: '100%', // Adjusted to make card fill its container
}));

const StyledCardMedia = styled(CardMedia)({
    width: 200,
    height: 300,
    objectFit: 'cover',
});
interface MovieProps{
    Title:string,
    Poster:string;
    Ratings:string;
    Plot:string;
    Year:string

}
const MovieCard: React.FC<MovieProps> = ({ Title, Poster, Ratings, Plot, Year }) => {
    const [isFavorite, setIsFavorite] = useState(false);
    const dispatch = useDispatch();
    const currentUser = useSelector((state: UserState) => state.currentUser);
    const navigate = useNavigate();

    // useEffect to initialize isFavorite based on currentUser's fav array
    useEffect(() => {
        // Check if title is in the currentUser's fav array
        if (currentUser?.fav && currentUser.fav.includes(Title)) {
            setIsFavorite(true);
        } else {
            setIsFavorite(false);
        }
    }, [currentUser, Title]);

    const toggleFavorite = () => {
        // If currentUser is not logged in, navigate to login page
        if (!currentUser) {
            navigate('/login');
            return;
        }

        // Toggle isFavorite state and dispatch appropriate action
        if (!isFavorite) {
            dispatch(addFavMov(Title)); 
        } else {
            dispatch(removeFavMov(Title));         }
        setIsFavorite((prev) => !prev);     };
const handleshowMovieDetailCard=()=>{
   navigate(`/MovieDetils/${Title}`)
}
    return (
        <StyledCard >
            <StyledCardMedia
                image={Poster}
                title={Title}
            />
            <CardContent>
                <Typography variant="h6" component="h2" gutterBottom  onClick={handleshowMovieDetailCard}>
                    {Title}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    {Plot?.length > 150 ? `${Plot.substring(0, 150)}...` : Plot}
                </Typography>
                <Grid container justifyContent="space-between" alignItems="center">
                    <Grid item>
                        <Typography variant="body2" color="textSecondary">
                            Year: {Year}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="body2" color="textSecondary">
                            Rating: {Ratings}
                        </Typography>
                    </Grid>
                </Grid>
                <IconButton onClick={toggleFavorite} aria-label="add to favorites">
                    <FavoriteIcon color={isFavorite ? 'primary' : 'action'} />
                </IconButton>
            </CardContent>
        </StyledCard>
    );
};

export default MovieCard;

