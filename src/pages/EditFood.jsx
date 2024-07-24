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
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import axiosInstance from '../lib/axios.instance';
import { useNavigate, useParams } from 'react-router-dom';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import Loader from '../components/Loader';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});
const EditFood = () => {
  const params = useParams();
  const [foodDetail, setFoodDetail] = useState({});
  const [pending, setPending] = useState(false);
  const [editPending, setEditPending] = useState(false);
  const [foodImage, setFoodImage] = useState(null);
  const [localUrl, setLocalUrl] = useState(null);
  const [imagePending, setImagePending] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getFoodDetails = async () => {
      try {
        setPending(true);
        const res = await axiosInstance.get(`/food/detail/${params.id}`);
        setPending(false);

        setFoodDetail(res?.data?.foodDetail);
      } catch (error) {
        setPending(false);

        console.log(error);
      }
    };
    getFoodDetails();
  }, []);

  const editProduct = async (values) => {
    try {
      setEditPending(true);
      await axiosInstance.put(`/food/edit/${params.id}`, values);
      setEditPending(false);
      navigate('/');
    } catch (error) {
      setEditPending(false);
      console.log(error);
    }
  };

  if (pending || editPending || imagePending) {
    return <Loader />;
  }
  return (
    <Box>
      <Formik
        enableReinitialize
        initialValues={{
          name: foodDetail?.name || '',
          price: foodDetail?.price || 0,
          servingSize: foodDetail?.servingSize || '',
          description: foodDetail?.description || '',
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
            .min(200, 'Description must be at least 200 characters.')

            .max(1000, 'Description must be at max 1000 characters.'),
        })}
        onSubmit={async (values) => {
          if (foodImage) {
            const cloudName = 'dlkcko4n6';

            const uploadPreset = 'hcoe-restaurant';

            const formData = new FormData();

            formData.append('file', foodImage);
            formData.append('cloud_name', cloudName);
            formData.append('upload_preset', uploadPreset);

            try {
              setImagePending(true);
              const res = await axios.post(
                `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
                formData
              );

              setImagePending(false);
              values.image = res?.data?.secure_url;
            } catch (error) {
              setImagePending(false);
              console.log(error);
            }
          }
          editProduct(values);
        }}
      >
        {(formik) => {
          return (
            <form
              onSubmit={formik.handleSubmit}
              style={{
                width: '350px',
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
              <Typography variant='h5'>Edit Food</Typography>

              <FormControl>
                <img
                  src={
                    localUrl ||
                    foodDetail?.image ||
                    'https://imgs.search.brave.com/6iInfQJbL7Mu73vJg5kN520wjLKO3kBUbZh_sn17d5A/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA3Lzg1LzUzLzI3/LzM2MF9GXzc4NTUz/Mjc4MV9DRjdKNUd3/Njd5SWd2QjBNRmJX/NVFPeXplanNMVjZm/eC5qcGc'
                  }
                  alt=''
                  height='250px'
                  width='100%'
                />
              </FormControl>

              <FormControl>
                <Button
                  component='label'
                  role={undefined}
                  variant='contained'
                  tabIndex={-1}
                  startIcon={<CloudUploadIcon />}
                >
                  Upload file
                  <VisuallyHiddenInput
                    type='file'
                    onChange={(event) => {
                      const image = event.target.files[0];

                      setFoodImage(image);
                      setLocalUrl(URL.createObjectURL(image));
                    }}
                  />
                </Button>
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

export default EditFood;
