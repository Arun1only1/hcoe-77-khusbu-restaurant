import { Box, Button, CircularProgress, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import FoodCard from '../components/FoodCard';
import Header from '../components/Header';
import axiosInstance from '../lib/axios.instance';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [foodList, setFoodList] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const getFoodList = async () => {
      try {
        setIsLoading(true);
        const res = await axiosInstance.get('/food/list');
        setIsLoading(false);
        const foods = res?.data?.foodList;
        setFoodList(foods);
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    };

    getFoodList();
  }, []);

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <>
      <Header />

      <Box sx={{ display: 'flex', gap: '2rem', margin: '5rem 0 2rem' }}>
        <Button
          variant='contained'
          color='success'
          onClick={() => {
            navigate('/add-food');
          }}
        >
          add food
        </Button>
        <Typography variant='h6'>
          Welcome , {localStorage.getItem('firstName')}
        </Typography>
      </Box>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '2rem',
          flexWrap: 'wrap',
          marginBottom: '4rem',
        }}
      >
        {foodList.map((item, index, self) => {
          return (
            <FoodCard
              key={item._id}
              _id={item._id}
              imageUrl={item?.image}
              name={item.name}
              price={item.price}
              description={item.description}
            />
          );
        })}
      </Box>
    </>
  );
};

export default Home;
