import { Grid, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import React, { useEffect, useState } from 'react';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const SuccessErrorSnackbar = ({ openSuccess, openError, successMessage, errorMessage, onClose }) => {
  const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState();
  const [openErrorSnackbar, setOpenErrorSnackbar] = useState();
  const handleClose = () => {
    setOpenSuccessSnackbar(false);
    setOpenErrorSnackbar(false);
    onClose && onClose();
  }
  useEffect(() => {
    setOpenSuccessSnackbar(openSuccess);
  }, [openSuccess])
  useEffect(() => {
    setOpenErrorSnackbar(openError);
  }, [openError])
  return (
    <Grid>
      <Snackbar open={openSuccessSnackbar} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          {successMessage}
        </Alert>
      </Snackbar>
      <Snackbar open={openErrorSnackbar} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </Grid>)
}

export default SuccessErrorSnackbar