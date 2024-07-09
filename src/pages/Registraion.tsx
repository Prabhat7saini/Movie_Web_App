import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { RegisterSchema } from '../ValidationSchema/UserSchmea'; // Assuming this defines RegisterSchema correctly
import { User } from '../utils/UserInterface';
import { Container, Button, TextField, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { setLoadingFalse, setLoadingTrue } from '../redux/slices/userSlice';
import { useDispatch } from 'react-redux';
import { Register } from '../hooks/useAuth';
import { NavLink, useNavigate } from 'react-router-dom';

const Registration = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { control, handleSubmit, formState: { errors } } = useForm<User>({
    resolver: yupResolver(RegisterSchema), // Ensure RegisterSchema matches User interface
    defaultValues: {
      username: '',
      email: '',
      password: '',
      name: '',
      fav: [], // Assuming fav is optional based on your interface
    },
  });

  const onSubmit: SubmitHandler<User> = async (data) => {
    try {
      console.log('register', data);
      dispatch(setLoadingTrue(true));
      const result = await Register(data);
      dispatch(setLoadingFalse(false));
      if (!result) {
        navigate(`/login`);
      }
    } catch (error) {
      console.log(`registration error`, error);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', mt: '2rem' }}>
      <Typography variant="h2" component="h2">
        Registration
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
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
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
              name="name"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  type="text"
                  label="Name"
                  variant="outlined"
                  fullWidth
                  error={!!errors.name}
                  helperText={errors.name ? errors.name.message : ''}
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
              Sign Up
            </Button>
        <NavLink to='/login'>Login</NavLink>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default Registration;
