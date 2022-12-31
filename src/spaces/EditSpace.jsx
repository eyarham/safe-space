import { Grid } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { UserContext } from '../user/UserContextProvider';
import Spinner from '../_common/Spinner';
import { getByIdSub, updateDoc } from './api';
import SpaceForm from './SpaceForm';

const EditSpace = () => {
  const { id } = useParams();
  const [existingData, setExistingData] = useState();
  const [isModerator, setIsModerator] = useState();
  const { user } = useContext(UserContext)
  useEffect(() => {
    if (user && user.data().isModerator) { setIsModerator(true) }
  }, [user]);
  useEffect(() => {
    return getByIdSub(id, d => {
      setExistingData(d);
    });
  }, [id]);

  const onEditSubmit = async editedData => {
    const isApproved = existingData.data().isApproved;
    await updateDoc(id, { ...editedData, isApproved });
    alert("edited successfully");
  }
  if (!existingData) return <Spinner />
  if (!isModerator) return (<div>you are not authorized to view this page.</div>)
  return (
    <Grid>
      Edit Space
      <SpaceForm onSubmit={onEditSubmit} space={existingData.data()} />
    </Grid>
  )
}

export default EditSpace