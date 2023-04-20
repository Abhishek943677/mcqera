import { Alert, Snackbar } from '@mui/material'
import React from 'react'

export default function SuccessSnackBar({open,setOpen}) {
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpen(false);
      };    
  return (
    <div>
      <Snackbar open={open} autoHideDuration={5000} onClose={handleClose} anchorOrigin={{vertical: "top", horizontal: "center" }}
>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          successfully saved data!
        </Alert>
      </Snackbar>
    </div>
  )
}


