import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

const FoodCard = () => {
  const navigate = useNavigate();
  return (
    <Card sx={{ width: '350px' }}>
      <CardMedia
        onClick={() => {
          navigate('/product-detail/123');
        }}
        sx={{ height: 200, cursor: 'pointer' }}
        image='https://imgs.search.brave.com/v1X0H6myR_gy1fQXl81Nke3Y9ECyF3NahDtoxdDgZeE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/aGFyaWdob3RyYS5j/by51ay9pbWFnZXMv/cmVjaXBlcy9oZXJv/L21vbW9faGVyby5w/bmc'
        title='chicken momo'
      />
      <CardContent>
        <Typography gutterBottom variant='h5' component='div'>
          Chicken Momo
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Velit
          molestiae similique voluptate obcaecati qui enim aliquam laboriosam
          veniam ipsum magnam.
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          fullWidth
          variant='contained'
          color='success'
          onClick={() => {
            navigate('/product-detail/123');
          }}
        >
          Explore
        </Button>
      </CardActions>
    </Card>
  );
};

export default FoodCard;
