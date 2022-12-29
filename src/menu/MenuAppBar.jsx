import { Button, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { Link } from 'react-router-dom';
import UserMenu from '../user/UserMenu';
import './menu.css';

const MenuAppBar = () => {

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Link to={"/"}><Typography>Safe Spaces</Typography></Link>
          </Grid>
          <Grid item xs={7}>
            <Link to={"/space"}> <Button variant="outlined">Add New</Button></Link>
          </Grid>
          <Grid item xs={2}>
            <UserMenu />
          </Grid>
        </Grid>
      </Box>
      <hr />
    </div>
  )
}

export default MenuAppBar