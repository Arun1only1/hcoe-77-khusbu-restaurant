import { DeleteOutlined } from '@mui/icons-material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import * as React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../lib/axios.instance';
const DeleteProductDialog = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteProduct = async () => {
    try {
      await axiosInstance.delete(`/food/delete/${params.id}`);
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <React.Fragment>
      <Button
        onClick={handleClickOpen}
        fullWidth
        variant='contained'
        color='error'
        startIcon={<DeleteOutlined />}
      >
        delete
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>
          Are you sure you want to delete this food item?
        </DialogTitle>

        <DialogActions>
          <Button onClick={handleClose} variant='contained' color='success'>
            Cancel
          </Button>
          <Button
            onClick={() => {
              deleteProduct();
              handleClose();
            }}
            autoFocus
            variant='contained'
            color='error'
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default DeleteProductDialog;
