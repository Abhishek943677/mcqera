import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';

function SimpleDialog(props) {
  const { onClose,open ,details} = props;

  const handleClose = (value) => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
        <div dangerouslySetInnerHTML={{__html:details}} className='p-3 text-lg' />
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default function SimpleDialogDemo({details}) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
  };

  return (
    <div className='w-full'>
        <div className='mx-auto px-2'>
      <Button variant="outlined" onClick={handleClickOpen} color="success" >
        details
      </Button>
        </div>
      <SimpleDialog
      details={details}
        open={open}
        onClose={handleClose}
      />
    </div>
  );
}