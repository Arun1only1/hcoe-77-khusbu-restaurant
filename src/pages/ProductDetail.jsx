import EditIcon from '@mui/icons-material/Edit';
import { Box, Button, Stack, Typography } from '@mui/material';
import React from 'react';
import { useParams } from 'react-router-dom';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const ProductDetail = () => {
  const params = useParams();
  console.log(params);

  return (
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
          src='https://imgs.search.brave.com/BMdtJX_vykHh3jStjH4lS28vWzL5tXKAT0aZ7fcWAp0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9ncmVh/dGN1cnJ5cmVjaXBl/cy5uZXQvd3AtY29u/dGVudC91cGxvYWRz/LzIwMjMvMTEvY2hp/Y2tlbm1vbW9zNC5q/cGcud2VicA'
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
          // alignItems: 'space-between',
          // height: '100%',
        }}
      >
        <Typography variant='h5'>Nepali Authentic Chicken Momo</Typography>

        <Typography>Rs.250</Typography>
        <Typography>Serving size: 1 plate/10 momos</Typography>
        <Typography sx={{ textAlign: 'justify' }}>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sunt nisi
          aspernatur vitae nulla commodi voluptatibus placeat quia! Omnis error,
          voluptates consequuntur, placeat veritatis voluptatibus accusantium
          ratione esse architecto hic nisi libero ea, quas soluta! Ab, rem!
          Soluta magni distinctio, repudiandae libero, dicta iusto quis odio
          velit enim nisi, modi quae.
        </Typography>

        <Stack direction='row' spacing={2}>
          <Button
            variant='contained'
            color='success'
            fullWidth
            startIcon={<EditIcon />}
          >
            Edit
          </Button>
          <Button
            variant='contained'
            color='error'
            fullWidth
            startIcon={<DeleteOutlineIcon />}
          >
            Delete
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default ProductDetail;
