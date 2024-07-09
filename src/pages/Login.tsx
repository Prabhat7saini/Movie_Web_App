import { Container, Button, TextField, Typography } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { LoginSchema } from '../ValidationSchema/UserSchmea'; // Corrected import path
import Box from '@mui/material/Box';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setLoadingFalse, setLoadingTrue, setCurrentUser } from '../redux/slices/userSlice'; // Ensure correct import of actions
import localforage from 'localforage';
import { User, UserState } from '../utils/UserInterface';

const Login = () => {
  const dispatch = useDispatch(); // Use useDispatch at the top level of the component
  const navigate = useNavigate();
  const { control, handleSubmit, formState: { errors } } = useForm<User>({
    resolver: yupResolver(LoginSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      name: '',
      fav: []
    },
  });
  // const navigate=useNavigate();
  const currentUser = useSelector((state: UserState) => state.currentUser);
  if (currentUser) {
    console.log(`user not return`)
    navigate('/favmovie');
    return;
  }

  const onSubmit: SubmitHandler<User> = async (data) => {
    // console.log('login', data);
    try {
    dispatch ( setLoadingTrue(true));
      const savedUsers = (await localforage.getItem<User[]>('User')) || [];
      const existingUser = savedUsers.find((user) => user.email === data.email);

      if (existingUser) {
        localStorage.setItem('currentUser', JSON.stringify(existingUser));
        dispatch(setCurrentUser(existingUser));
        navigate('/'); // Navigate on successful login
      } else {
        console.log('User not found');
        throw new Error(`User not found `)
      }
      dispatch(setLoadingFalse(false));
    } catch (error) {
      console.error('Error during login:', error);
      dispatch(setLoadingFalse(false));
    }
  };

  return (
    <Container maxWidth="sm" sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', mt: '2rem' }}>
      <Typography variant="h2" component="h2">
        Login
      </Typography>

      <Box
        sx={{
          width: '80%',
          maxWidth: '400px',
          padding: '2rem',
          border: '1px solid #ccc',
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
          borderRadius: '8px',
          backgroundColor: 'white',
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <Controller
              name="username"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  type="text"
                  label="Username"
                  variant="outlined"
                  fullWidth
                  error={!!errors.username}
                  helperText={errors.username ? errors.username.message : ''}
                />
              )}
            />
            <Controller
              name="email"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  type="email"
                  label="Email"
                  variant="outlined"
                  fullWidth
                  error={!!errors.email}
                  helperText={errors.email ? errors.email.message : ''}
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  type="password"
                  label="Password"
                  variant="outlined"
                  fullWidth
                  error={!!errors.password}
                  helperText={errors.password ? errors.password.message : ''}
                />
              )}
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Login
            </Button>
            <NavLink to='/register'>Register</NavLink>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default Login;
