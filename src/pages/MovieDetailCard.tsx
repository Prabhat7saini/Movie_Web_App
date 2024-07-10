// import React, { useEffect, useState } from 'react';
// import { Card, CardContent, Typography, Grid, Chip, Avatar, TextField, Button } from '@mui/material';
// import { useParams } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import data from '../../data.json';
// import { useForm, SubmitHandler } from 'react-hook-form';
// import { addComment } from '../hooks/useAuth';
// import { Comments, Movie, UserState } from '../utils/UserInterface';
// import { fetchComments } from '../utils/fetchCommentFromLocal';

// interface CommentFormInput {
//     comment: string;
// }

// const MovieDetailCard: React.FC = () => {
//     const currentUser = useSelector((state: UserState) => state.currentUser);
//     const { Title } = useParams<{ Title: string }>();
//     const [comment, setComment] = useState<string>('');
//     const [cc,setCC]=useState<Comments[]|[]>([]);

//     const { register, handleSubmit, reset } = useForm<CommentFormInput>();

//     const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         setComment(event.target.value);
//     };

//     // const Comments = useSelector((state: UserState) => state.Comments);
//     // let fetchcomment:Comments[]=[];


//     const handleCommentSubmit: SubmitHandler<CommentFormInput> = async (formData) => {
//         // console.log(formData.comment); // Logging form data
//         reset();

//         try {
//             if (!Title) {
//                 console.error('Movie Title is undefined');
//                 return;
//             }

//             const newcomment = {
//                 Title: Title,
//                 comment: formData.comment,
//                 name: currentUser?.name
//             };

//             await addComment(newcomment);
//            const res= await fetchComments()
//             setCC(res);
//         } catch (error) {
//             console.error('Error while adding comment:', error);
//             // Handle error as needed (e.g., show error message to user)
//         }
//     };
//     useEffect(() => {
//         const fetchCommentsData = async () => {
//             try {
//                 const res = await fetchComments(); // Assuming fetchComments is an async function
//                 setCC(res);
//             } catch (error) {
//                 console.error('Error fetching comments:', error);
//                 // Handle error as needed
//             }
//         };

//         fetchCommentsData();
//     }, []);
//     // console.log(cc,"check check \n")
//     const commentArray = cc?.filter((comment: Comments) => comment.Title === Title);
//     // console.log(commentArray,"check dbcall")


//     // Fetch movie details from data.json based on Title parameter
//     const movie: Movie | undefined = data.find((dataItem: Movie) => dataItem.Title === Title);

//     if (!movie) {
//         return <Typography variant="h6">Movie not found</Typography>;
//     }

//     return (
//         <Card>
//             <CardContent>
//                 <Grid container spacing={2}>
//                     {/* Left Column */}
//                     <Grid item xs={12} md={4}>
//                         <img src={movie.Poster} alt={movie.Title} style={{ maxWidth: '100%' }} />
//                     </Grid>

//                     {/* Right Column */}
//                     <Grid item xs={12} md={8}>
//                         <Typography variant="h5" gutterBottom>
//                             {movie.Title} ({movie.Year})
//                         </Typography>
//                         <Typography variant="body1" component="div" gutterBottom>
//                             <strong>Rated:</strong> {movie.Rated}
//                         </Typography>
//                         <Typography variant="body1" component="div" gutterBottom>
//                             <strong>Released:</strong> {movie.Released}
//                         </Typography>
//                         <Typography variant="body1" component="div" gutterBottom>
//                             <strong>Runtime:</strong> {movie.Runtime}
//                         </Typography>
//                         <Typography variant="body1" component="div" gutterBottom>
//                             <strong>Genre:</strong> {movie.Genre}
//                         </Typography>
//                         <Typography variant="body1" component="div" gutterBottom>
//                             <strong>Director:</strong> {movie.Director}
//                         </Typography>
//                         <Typography variant="body1" component="div" gutterBottom>
//                             <strong>Writer:</strong> {movie.Writer}
//                         </Typography>
//                         <Typography variant="body1" component="div" gutterBottom>
//                             <strong>Actors:</strong> {movie.Actors}
//                         </Typography>
//                         <Typography variant="body1" component="div" gutterBottom>
//                             <strong>Plot:</strong> {movie.Plot}
//                         </Typography>
//                         <Typography variant="body1" component="div" gutterBottom>
//                             <strong>Language:</strong> {movie.Language}
//                         </Typography>
//                         <Typography variant="body1" component="div" gutterBottom>
//                             <strong>Country:</strong> {movie.Country}
//                         </Typography>
//                         <Typography variant="body1" component="div" gutterBottom>
//                             <strong>Awards:</strong> {movie.Awards}
//                         </Typography>

//                         {/* Ratings Chips */}
//                         <Typography variant="body1" component="div" gutterBottom>
//                             <strong>Ratings:</strong>{' '}
//                             {movie.Ratings.map((rating, index) => (
//                                 <Chip
//                                     key={index}
//                                     avatar={<Avatar>{rating.Source.charAt(0)}</Avatar>}
//                                     label={`${rating.Source}: ${rating.Value}`}
//                                     style={{ marginRight: '5px', marginBottom: '5px' }}
//                                 />
//                             ))}
//                         </Typography>

//                         {/* Response */}
//                         <Typography variant="body1" component="div" gutterBottom>
//                             <strong>Response:</strong> {movie.Response}
//                         </Typography>

//                         {/* Comments Section */}
//                         <Typography variant="h6" gutterBottom style={{ marginTop: '1rem' }}>
//                             Comments:
//                         </Typography>

//                         {/* Form for Adding Comments */}
//                         {currentUser && (
//                             <form onSubmit={handleSubmit(handleCommentSubmit)} style={{ marginTop: '1rem' }}>
//                                 <TextField
//                                     {...register('comment', { required: true })}
//                                     label="Add a comment"
//                                     variant="outlined"
//                                     fullWidth
//                                     value={comment}
//                                     onChange={handleCommentChange}
//                                 />
//                                 <Button
//                                     type="submit"
//                                     variant="contained"
//                                     color="primary"
//                                     style={{ marginTop: '1rem' }}
//                                 >
//                                     Submit Comment
//                                 </Button>
//                             </form>
//                         )}

//                         {/* Display existing comments */}
//                         {commentArray && commentArray.map((comment, index) => (
//                             <div key={index}>
//                                 <Typography variant="body1" gutterBottom>
//                                     <strong>{comment.name}:</strong> {comment.comment}
//                                 </Typography>
//                             </div>
//                         ))}

//                     </Grid>
//                 </Grid>
//             </CardContent>
//         </Card>
//     );
// };

// export default MovieDetailCard;


// MovieDetailCard.tsx

import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Grid, Chip, Avatar, TextField, Button } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import data from '../../data.json';
import { useForm, SubmitHandler } from 'react-hook-form';
import { addComment } from '../hooks/useAuth';
import { Comments, Movie, UserState } from '../utils/UserInterface';
import { fetchComments } from '../utils/fetchCommentFromLocal';
import Rating from '../component/Rating'; // Import Rating component

interface CommentFormInput {
    comment: string;
    rating: number; // Include rating in the form data
}

const MovieDetailCard: React.FC = () => {
    const currentUser = useSelector((state: UserState) => state.currentUser);
    const { Title } = useParams<{ Title: string }>();
    const [comment, setComment] = useState<string>('');
    const [cc, setCC] = useState<Comments[] | []>([]);
    const [userRating, setUserRating] = useState<number | null>(null); // State to hold user-entered rating

    const { register, handleSubmit, reset, setValue } = useForm<CommentFormInput>();

    const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setComment(event.target.value);
    };

    const handleRatingChange = (newValue: number) => {
        setUserRating(newValue);
        setValue('rating', newValue);
    };

    const handleCommentSubmit: SubmitHandler<CommentFormInput> = async (formData) => {
        reset();
           
        console.log(userRating)
        try {
            if (!Title) {
                console.error('Movie Title is undefined');
                return;
            }

            const newcomment = {
                Title: Title,
                comment: formData.comment,
                name: currentUser?.name,
                rating: userRating !== null ? userRating.toString() : "" // Ensure rating is converted to string or matches expected type
            };
            await addComment(newcomment);
            const res = await fetchComments();
            setCC(res);
        } catch (error) {
            console.error('Error while adding comment:', error);
        }
    };

    useEffect(() => {
        const fetchCommentsData = async () => {
            try {
                const res = await fetchComments();
                setCC(res);
            } catch (error) {
                console.error('Error fetching comments:', error);
            }
        };

        fetchCommentsData();
    }, []);

    const commentArray = cc?.filter((comment: Comments) => comment.Title === Title);

    const movie: Movie | undefined = data.find((dataItem: Movie) => dataItem.Title === Title);

    if (!movie) {
        return <Typography variant="h6">Movie not found</Typography>;
    }

    return (
        <Card>
            <CardContent>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={4}>
                        <img src={movie.Poster} alt={movie.Title} style={{ maxWidth: '100%' }} />
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <Typography variant="h5" gutterBottom>
                            {movie.Title} ({movie.Year})
                        </Typography>
                        <Typography variant="body1" component="div" gutterBottom>
                            <strong>Rated:</strong> {movie.Rated}
                        </Typography>
                        <Typography variant="body1" component="div" gutterBottom>
                            <strong>Released:</strong> {movie.Released}
                        </Typography>
                        <Typography variant="body1" component="div" gutterBottom>
                            <strong>Runtime:</strong> {movie.Runtime}
                        </Typography>
                        <Typography variant="body1" component="div" gutterBottom>
                            <strong>Genre:</strong> {movie.Genre}
                        </Typography>
                        <Typography variant="body1" component="div" gutterBottom>
                            <strong>Director:</strong> {movie.Director}
                        </Typography>
                        <Typography variant="body1" component="div" gutterBottom>
                            <strong>Writer:</strong> {movie.Writer}
                        </Typography>
                        <Typography variant="body1" component="div" gutterBottom>
                            <strong>Actors:</strong> {movie.Actors}
                        </Typography>
                        <Typography variant="body1" component="div" gutterBottom>
                            <strong>Plot:</strong> {movie.Plot}
                        </Typography>
                        <Typography variant="body1" component="div" gutterBottom>
                            <strong>Language:</strong> {movie.Language}
                        </Typography>
                        <Typography variant="body1" component="div" gutterBottom>
                            <strong>Country:</strong> {movie.Country}
                        </Typography>
                        <Typography variant="body1" component="div" gutterBottom>
                            <strong>Awards:</strong> {movie.Awards}
                        </Typography>



                        {/* Response */}
                        <Typography variant="body1" component="div" gutterBottom>
                            <strong>Response:</strong> {movie.Response}
                        </Typography>
                        <Typography variant="body1" component="div" gutterBottom>
                            <strong>Ratings:</strong>{' '}
                            {movie.Ratings.map((rating, index) => (
                                <Chip
                                    key={index}
                                    avatar={<Avatar>{rating.Source.charAt(0)}</Avatar>}
                                    label={`${rating.Source}: ${rating.Value}`}
                                    style={{ marginRight: '5px', marginBottom: '5px' }}
                                />
                            ))}
                        </Typography>
                        {/* Comments Section */}
                        <Typography variant="h6" gutterBottom style={{ marginTop: '1rem' }}>
                            Comments:
                        </Typography>
                        {/* Display Rating */}
                        <Typography variant="body1" component="div" gutterBottom>
                            <strong>Your Rating:</strong> {userRating !== null ? userRating : 'Not rated yet by Default 1'}
                            <Rating defaultValue={userRating || 1} onClick={handleRatingChange} />
                        </Typography>

                        {/* Ratings Chips */}
                       
                        {/* Form for Adding Comments */}
                        {currentUser && (
                            <form onSubmit={handleSubmit(handleCommentSubmit)} style={{ marginTop: '1rem' }}>
                                <TextField
                                    {...register('comment', { required: true })}
                                    label="Add a comment"
                                    variant="outlined"
                                    fullWidth
                                    value={comment}
                                    onChange={handleCommentChange}
                                />
                                {/* <Rating defaultValue={0} onClick={handleRatingChange} /> */}
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    style={{ marginTop: '1rem' }}
                                >
                                    Submit Comment
                                </Button>
                            </form>
                        )}

                        {/* Display existing comments */}
                        {commentArray && commentArray.map((comment, index) => (
                            <div key={index}>
                                <h2 style={{margin:'2rem'}}>Comment & Rating by</h2>
                                <Typography variant="body1"  style={{margin:'2rem'}} gutterBottom>
                                    <strong>{comment.name}:</strong> {`${comment.comment}  and Rating ${comment.rating}`}
                                </Typography>
                                
                            </div>
                        ))}

                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default MovieDetailCard;
