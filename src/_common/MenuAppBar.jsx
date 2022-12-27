import { Button } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import UserMenu from '../user/UserMenu';

const MenuAppBar = () => {

  return (
    <div>
      <Link to={"/"}><h2>Safe Spaces</h2></Link>
      <Link to={"/space"}> <Button variant="outlined">Add New</Button></Link>
      <UserMenu />
      <hr />
    </div>
  )
}

export default MenuAppBar