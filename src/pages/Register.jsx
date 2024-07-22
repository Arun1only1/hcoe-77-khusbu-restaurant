import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { Formik, yupToFormErrors } from 'formik';
import React from 'react';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';

const Register = () => {
  return (
    <Box>
      <Formik
        initialValues={{
          email: '',
          password: '',
          firstName: '',
          lastName: '',
        }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email('Must be a valid email.')
            .required('Email is required.')
            .trim()
            .lowercase()
            .max(50, 'Email must be at most 50 characters.'),
          password: Yup.string().trim().required('Password is required.'),
          firstName: Yup.string().trim().max(30).required(),
          lastName: Yup.string().trim().max(30).required(),
        })}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {(formik) => {
          return (
            <form
              onSubmit={formik.handleSubmit}
              style={{
                minWidth: '300px',
                boxShadow:
                  'rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px',
                display: 'flex',
                flexDirection: 'column',
                padding: '1rem',
                gap: '2rem',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Typography variant='h5'>Sign Up</Typography>

              <FormControl fullWidth>
                <TextField label='Email' {...formik.getFieldProps('email')} />

                {formik.touched.email && formik.errors.email ? (
                  <FormHelperText error>{formik.errors.email}</FormHelperText>
                ) : null}
              </FormControl>

              <FormControl fullWidth>
                <TextField
                  label='Password'
                  {...formik.getFieldProps('password')}
                />

                {formik.touched.password && formik.errors.password ? (
                  <FormHelperText error>
                    {formik.errors.password}
                  </FormHelperText>
                ) : null}
              </FormControl>

              <FormControl fullWidth>
                <TextField
                  label='First name'
                  {...formik.getFieldProps('firstName')}
                />

                {formik.touched.firstName && formik.errors.firstName ? (
                  <FormHelperText error>
                    {formik.errors.firstName}
                  </FormHelperText>
                ) : null}
              </FormControl>

              <FormControl fullWidth>
                <TextField
                  label='Last name'
                  {...formik.getFieldProps('lastName')}
                />

                {formik.touched.lastName && formik.errors.lastName ? (
                  <FormHelperText error>
                    {formik.errors.lastName}
                  </FormHelperText>
                ) : null}
              </FormControl>

              <Stack sx={{ width: '100%' }}>
                <Button
                  fullWidth
                  variant='contained'
                  color='success'
                  type='submit'
                >
                  register
                </Button>

                <Link to='/login' style={{ textDecoration: 'underline' }}>
                  <Typography>Already registered? Login</Typography>
                </Link>
              </Stack>
            </form>
          );
        }}
      </Formik>
    </Box>
  );
};

export default Register;
