import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormHelperText,
  TextField,
  Typography,
} from '@mui/material';
import { Formik } from 'formik';
import React, { useState } from 'react';
import * as Yup from 'yup';
import axiosInstance from '../lib/axios.instance';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddFood = () => {
  const [foodImage, setFoodImage] = useState(null);
  const [localUrl, setLocalUrl] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);
  const [addFoodLoading, setAddFoodLoading] = useState(false);

  const navigate = useNavigate();

  const addFood = async (values) => {
    try {
      setAddFoodLoading(true);
      const res = await axiosInstance.post('/food/add', values);
      setAddFoodLoading(false);

      navigate('/');
    } catch (error) {
      setAddFoodLoading(false);

      console.log(error);
    }
  };

  if (imageLoading || addFoodLoading) {
    return <CircularProgress />;
  }
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
            .max(50, 'Name must be at mosfoodImaget 50 characters.'),
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
            .min(200, 'Description must be at least 200 characters.')
            .max(1000, 'Description must be at max 1000 characters.'),
        })}
        onSubmit={async (values) => {
          if (foodImage) {
            const cloudName = 'dlkcko4n6';

            const uploadPreset = 'hcoe-restaurant';

            const formData = new FormData();

            formData.append('cloud_name', cloudName);
            formData.append('upload_preset', uploadPreset);
            formData.append('file', foodImage);

            try {
              setImageLoading(true);
              const res = await axios.post(
                `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
                formData
              );
              setImageLoading(false);
              values.image = res?.data?.secure_url;
            } catch (error) {
              setImageLoading(false);
              console.log(error);
            }
          }
          addFood(values);
        }}
      >
        {(formik) => {
          return (
            <form
              onSubmit={formik.handleSubmit}
              style={{
                minWidth: '400px',
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

              {localUrl && (
                <img
                  src={localUrl}
                  style={{ height: '250px', width: '100%' }}
                />
              )}
              <FormControl>
                <input
                  type='file'
                  onChange={(event) => {
                    const image = event.target.files[0];
                    setFoodImage(image);
                    setLocalUrl(URL.createObjectURL(image));
                  }}
                />
              </FormControl>

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
                  maxRows={10}
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
