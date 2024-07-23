import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

const FoodCard = (props) => {
  const navigate = useNavigate();
  return (
    <Card sx={{ width: '350px' }}>
      <CardMedia
        onClick={() => {
          navigate(`/product-detail/${props._id}`);
        }}
        sx={{ height: '250px', cursor: 'pointer', objectFit: 'cover' }}
        image={
          props.imageUrl ||
          'https://imgs.search.brave.com/6iInfQJbL7Mu73vJg5kN520wjLKO3kBUbZh_sn17d5A/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA3Lzg1LzUzLzI3/LzM2MF9GXzc4NTUz/Mjc4MV9DRjdKNUd3/Njd5SWd2QjBNRmJX/NVFPeXplanNMVjZm/eC5qcGc'
        }
        title={props.name}
      />
      <CardContent>
        <Typography gutterBottom variant='h5' component='div'>
          {props.name}
        </Typography>
        <Typography
          variant='body2'
          color='text.secondary'
          sx={{ textAlign: 'justify' }}
        >
          {props.description.substring(0, 200)}...
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          fullWidth
          variant='contained'
          color='success'
          onClick={() => {
            navigate(`/product-detail/${props?._id}`);
          }}
        >
          Explore
        </Button>
      </CardActions>
    </Card>
  );
};

export default FoodCard;
