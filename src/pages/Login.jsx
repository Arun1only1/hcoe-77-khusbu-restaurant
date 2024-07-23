import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  LinearProgress,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { Formik } from 'formik';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import axiosInstance from '../lib/axios.instance';

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const loginUser = async (values) => {
    try {
      setLoading(true);
      const res = await axiosInstance.post('/admin/login', values);
      const accessToken = res?.data?.accessToken;
      const firstName = res?.data?.adminDetails?.firstName;

      localStorage.setItem('token', accessToken);
      localStorage.setItem('firstName', firstName);

      setLoading(false);
      navigate('/');
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  return (
    <Box>
      {loading && <LinearProgress color='secondary' />}
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email('Must be a valid email.')
            .required('Email is required.')
            .trim()
            .lowercase()
            .max(50, 'Email must be at most 50 characters.'),
          password: Yup.string().trim().required('Password is required.'),
        })}
        onSubmit={(values) => {
          loginUser(values);
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
              <Typography variant='h5'>Sign in</Typography>

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

              <Stack sx={{ width: '100%' }}>
                <Button
                  fullWidth
                  variant='contained'
                  color='success'
                  type='submit'
                >
                  login
                </Button>

                <Link to='/register' style={{ textDecoration: 'underline' }}>
                  <Typography>New here? Register</Typography>
                </Link>
              </Stack>
            </form>
          );
        }}
      </Formik>
    </Box>
  );
};

export default Login;
