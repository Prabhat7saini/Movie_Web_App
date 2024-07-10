import  { useState } from 'react';
import { AppBar, Box, Button, TextField, InputAdornment, Grid, IconButton, Drawer, List, ListItem, ListItemText, useMediaQuery, useTheme } from '@mui/material';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Movie, UserState } from '../utils/UserInterface';
import { setMovie, logoutCurrentUser, setIsSearch } from "../redux/slices/userSlice"; // Import actions from userSlice
import wholedata from '../../data.json';


interface FormValues {
    searchTerm: string;
}

const Navbar = () => {
    const navigate = useNavigate();
    const { control, handleSubmit } = useForm<FormValues>(); 
    const dispatch = useDispatch();
    const currentUser = useSelector((state: UserState) => state.currentUser); 
    //

    const [isDrawerOpen, setIsDrawerOpen] = useState(false); // State for drawer

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('md')); // Use 'md' for iPad Air size

    function searchMovies(query: string): Movie[] {
        if (!query) return []; // Return an empty array if query is falsy

        const lowerCaseQuery = query.toLowerCase();

        const filteredMovies = wholedata.filter(movie => {
            const title = movie.Title.toLowerCase();
            const plot = movie.Plot.toLowerCase();

            return title.includes(lowerCaseQuery) || plot.includes(lowerCaseQuery);
        });

        return filteredMovies;
    }

    const onSubmit: SubmitHandler<FormValues> = ({ searchTerm }) => {
        console.log('Form submitted with data:', searchTerm);
        if (searchTerm.length > 0) {
            dispatch(setIsSearch(true));
        } else {
            dispatch(setIsSearch(false));
        }
        const result = searchMovies(searchTerm);
        console.log(result);

        dispatch(setMovie(result));
    };

    const handleLogout = () => {
        if (currentUser) {
            localStorage.removeItem('currentUser');
            dispatch(logoutCurrentUser(null)); 
            navigate(`/`);
        } else {
            // window.location.href = 'http://localhost:5173/Login';
            navigate(`/login`)
        }
    };

    const toggleDrawer = (open: boolean) => () => {
        setIsDrawerOpen(open);
    };

    return (
        <AppBar position="static" color="primary">
            <Grid container justifyContent="space-between" alignItems="center" padding="1rem">
                {/* Hamburger Icon */}
                <Grid item xs={6} sm={3}>
                    <Box display="flex" alignItems="center">
                        <IconButton
                            onClick={toggleDrawer(true)}
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2, display: { md: 'none' } }} // Hide on larger screens
                        >
                            <MenuIcon />
                        </IconButton>
                        <NavLink to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                            <h1 style={{ margin: 0 }}>Fmovies</h1>
                        </NavLink>
                    </Box>
                </Grid>

                {/* Search Form */}
                <Grid item xs={12} sm={6} md={4}>
                    <Box display="flex" justifyContent={isSmallScreen ? 'center' : 'flex-start'}>
                        <form onChange={handleSubmit(onSubmit)} style={{ display: 'flex', alignItems: 'center', width: isSmallScreen ? '100%' : '20rem' }}>
                            <Controller
                                name="searchTerm"
                                control={control}
                                defaultValue=""
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        type="text"
                                        label="Search"
                                        variant="outlined"
                                        fullWidth
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <SearchOutlinedIcon />
                                                </InputAdornment>
                                            ),
                                            sx: {
                                                '& input:focus': {
                                                    backgroundColor: 'white', // Change background color on focus
                                                }
                                            }
                                        }}
                                        sx={{
                                            '& input': {
                                                py: '10px',
                                            },
                                        }}
                                    />
                                )}
                            />
                        </form>
                    </Box>
                </Grid>

                {/* Drawer for smaller screens */}
                <Drawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer(false)}>
                    <Box
                        sx={{ width: 250 }}
                        role="presentation"
                        onClick={toggleDrawer(false)}
                        onKeyDown={toggleDrawer(false)}
                    >
                        <List>
                            <ListItem button component={NavLink} to="/" onClick={toggleDrawer(false)}>
                                <ListItemText primary="Home" />
                            </ListItem>
                            <ListItem button component={NavLink} to="/favmovie" onClick={toggleDrawer(false)}>
                                <ListItemText primary="Favorite Movies" />
                            </ListItem>
                            <ListItem button onClick={handleLogout}>
                                <ListItemText primary={currentUser ? "Logout" : "Login"} />
                            </ListItem>
                        </List>
                    </Box>
                </Drawer>

                {/* Favorite Button */}
                {!isSmallScreen && (
                    <Grid item xs={6} sm={3} md={2}>
                        <Box display="flex" justifyContent="flex-end">
                            <NavLink to="/favmovie" style={{ textDecoration: 'none' }}>
                                <Button sx={{ color: 'white' }}>Favorite</Button>
                            </NavLink>
                        </Box>
                    </Grid>
                )}

                {/* Login/Logout Button */}
                {!isSmallScreen && (
                    <Grid item xs={6} sm={3} md={3}>
                        <Box display="flex" justifyContent="flex-end">
                            <Button onClick={handleLogout} sx={{ color: 'white' }}>{currentUser ? "Logout" : "Login"}</Button>
                        </Box>
                    </Grid>
                )}
            </Grid>
        </AppBar>
    );
};

export default Navbar;
