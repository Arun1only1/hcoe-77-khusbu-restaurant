import EditIcon from '@mui/icons-material/Edit';
import {
  Box,
  Button,
  CircularProgress,
  Stack,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../lib/axios.instance';
import DeleteProductDialog from '../components/DeleteProductDialog';
import Header from '../components/Header';

const ProductDetail = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [foodDetail, setFoodDetail] = useState({});
  useEffect(() => {
    const getProductDetails = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get(`/food/detail/${params.id}`);
        setLoading(false);
        setFoodDetail(res?.data?.foodDetail);
        console.log(res);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };

    getProductDetails();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }
  return (
    <>
      <Header />
      <Box
        sx={{
          padding: '1rem',
          display: 'flex',
          gap: '2rem',
          boxShadow:
            'rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px',
          width: '70vw',
          // justifyContent: 'center',
          // alignItems: 'center',
        }}
      >
        <Box sx={{ width: '50%' }}>
          <img
            src={
              foodDetail?.image ||
              'https://imgs.search.brave.com/6iInfQJbL7Mu73vJg5kN520wjLKO3kBUbZh_sn17d5A/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA3Lzg1LzUzLzI3/LzM2MF9GXzc4NTUz/Mjc4MV9DRjdKNUd3/Njd5SWd2QjBNRmJX/NVFPeXplanNMVjZm/eC5qcGc'
            }
            alt=''
            height='500px'
            width='100%'
          />
        </Box>

        <Box
          sx={{
            width: '50%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            // gap: '1rem',
            // alignItems: 'space-between',
            // height: '100%',
          }}
        >
          <Typography variant='h5'>{foodDetail?.name}</Typography>

          <Typography>Rs.{foodDetail?.price}</Typography>
          <Typography>Serving size: {foodDetail?.servingSize}</Typography>
          <Typography sx={{ textAlign: 'justify' }}>
            {foodDetail?.description}
          </Typography>

          <Stack direction='row' spacing={2}>
            <Button
              variant='contained'
              color='success'
              fullWidth
              startIcon={<EditIcon />}
              onClick={() => {
                navigate(`/edit-food/${params.id}`);
              }}
            >
              Edit
            </Button>
            <DeleteProductDialog />
          </Stack>
        </Box>
      </Box>
    </>
  );
};

export default ProductDetail;
