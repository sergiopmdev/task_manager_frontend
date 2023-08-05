import * as yup from 'yup';

export const registerSchema = yup.object().shape({
  name: yup
    .string()
    .required('Name is required')
    .min(2, 'Name must have at least 2 characters'),
  email: yup
    .string()
    .required('Email is required')
    .email('Email format is invalid'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must have at least 2 characters'),
});
