import { Grid } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { create } from './api';
import SpaceForm from './SpaceForm';

const NewNewSpace = () => {
  const navigate = useNavigate();

  const onCreateSubmit = async newData => {
    await create({ ...newData, isApproved: false });
    alert("space was created successfully and submitted for review")
    navigate('/')
  }
  return (
    <Grid>
      New Space
      <SpaceForm onSubmit={onCreateSubmit} />
    </Grid>
  )
}

export default NewNewSpace