import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { Formik } from 'formik';
import React from 'react';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';

const AddFood = () => {
  return (
    <Box>
      <Formik
        initialValues={{
          name: '',
          price: 0,
          servingSize: '',
          description: '',
        }}
        validationSchema={Yup.object({
          name: Yup.string()
            .required('Name is required.')
            .trim()
            .max(50, 'Name must be at most 50 characters.'),
          price: Yup.number()
            .required('Price is required.')
            .min(0, 'Price must be a positive number.'),
          servingSize: Yup.string()
            .required('Serving size is required.')
            .trim()
            .max(50, 'Serving size must be at most 50 characters.'),
          description: Yup.string()
            .required('Description is required.')
            .trim()
            .min(10, 'Description must be at least 10 characters.')
            .max(1000, 'Description must be at max 1000 characters.'),
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
              <Typography variant='h5'>Add Food</Typography>

              <FormControl fullWidth>
                <TextField label='Name' {...formik.getFieldProps('name')} />

                {formik.touched.name && formik.errors.name ? (
                  <FormHelperText error>{formik.errors.name}</FormHelperText>
                ) : null}
              </FormControl>

              <FormControl fullWidth>
                <TextField
                  type='number'
                  label='Price'
                  {...formik.getFieldProps('price')}
                />

                {formik.touched.price && formik.errors.price ? (
                  <FormHelperText error>{formik.errors.price}</FormHelperText>
                ) : null}
              </FormControl>

              <FormControl fullWidth>
                <TextField
                  label='Serving size'
                  {...formik.getFieldProps('servingSize')}
                />

                {formik.touched.servingSize && formik.errors.servingSize ? (
                  <FormHelperText error>
                    {formik.errors.servingSize}
                  </FormHelperText>
                ) : null}
              </FormControl>

              <FormControl fullWidth>
                <TextField
                  multiline
                  minRows={6}
                  label='Description'
                  {...formik.getFieldProps('description')}
                />

                {formik.touched.description && formik.errors.description ? (
                  <FormHelperText error>
                    {formik.errors.description}
                  </FormHelperText>
                ) : null}
              </FormControl>

              <Button
                fullWidth
                variant='contained'
                color='success'
                type='submit'
              >
                submit
              </Button>
            </form>
          );
        }}
      </Formik>
    </Box>
  );
};

export default AddFood;
