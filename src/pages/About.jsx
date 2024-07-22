import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const About = () => {
  const navigate = useNavigate();
  return (
    <Box>
      <Typography variant='h4'>About page</Typography>

      <Button
        variant='contained'
        color='success'
        onClick={() => {
          navigate('/');
        }}
      >
        back to home
      </Button>
    </Box>
  );
};

export default About;
