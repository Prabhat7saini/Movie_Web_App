// ValidationSchema/UserSchema.ts
import * as yup from 'yup';

export const RegisterSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required'),
  fav: yup.array().of(yup.string()), // Validation for fav field as a string array
});

export const LoginSchema = yup.object({
  username: yup.string().required('Username is required'),
  email: yup.string().email('Enter a valid email').required('Email is required'),
  password: yup.string().required('Password is required'),
  name: yup.string(),
  fav: yup.array().of(yup.string()),
});
