import { Box, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import FoodCard from '../components/FoodCard';
import Header from '../components/Header';

const Home = () => {
  return (
    <>
      <Header />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '2rem',
          flexWrap: 'wrap',
          margin: '7rem 0 4rem',
        }}
      >
        <FoodCard />
        <FoodCard />
        <FoodCard />
        <FoodCard />
        <FoodCard />
        <FoodCard />
        <FoodCard />
        <FoodCard />
        <FoodCard />
        <FoodCard />
      </Box>
    </>
  );
};

export default Home;
