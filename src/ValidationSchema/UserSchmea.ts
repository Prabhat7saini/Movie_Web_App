import * as yup from 'yup';

export const RegisterSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  name: yup.string()
    .required('Name is required')
    .matches(/^[A-Za-z\s]+$/, 'Name can only contain alphabetic characters and spaces'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character'),
  fav: yup.array().of(yup.string()), // Validation for fav field as a string array
});


export const LoginSchema = yup.object({
  username: yup.string().required('Username is required'),
  email: yup.string().email('Enter a valid email').required('Email is required'),
  password: yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character'),
  // name: yup.string()
  //   .required('Name is required')
  //   .matches(/^[A-Za-z\s]+$/, 'Name can only contain alphabetic characters and spaces'),
  fav: yup.array().of(yup.string()),
});
