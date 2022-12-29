import { Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Spinner from '../_common/Spinner';
import { getByIdSub, updateDoc } from './api';
import SpaceForm from './SpaceForm';

const EditSpace = () => {
  const { id } = useParams();
  const [existingData, setExistingData] = useState();

  useEffect(() => {
    return getByIdSub(id, d => {
      setExistingData(d);
    });
  }, [id]);

  const onEditSubmit = async editedData => {
    const isApproved = existingData.data().isApproved;
    await updateDoc(id, {...editedData, isApproved});
    alert("edited successfully");
  }
  if (!existingData) return <Spinner />
  return (
    <Grid>
      Edit Space
      <SpaceForm onSubmit={onEditSubmit} space={existingData.data()} />
    </Grid>
  )
}

export default EditSpace