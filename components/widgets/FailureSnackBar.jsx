import { Alert, Snackbar, Stack } from '@mui/material';
import React from 'react'

export default function FailureSnackBar({open,setOpen}) {
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpen(false);
      };   
  return (
        <Snackbar open={open} autoHideDuration={10000} onClose={handleClose}
        anchorOrigin={{vertical: "top", horizontal: "center" }}
        >
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          failed to save saved data!
        </Alert>
      </Snackbar>
  )
}
