import { Button, Checkbox, FormControlLabel, FormGroup, TextField } from '@mui/material';
import { Container } from '@mui/system';
import React, { useEffect, useState } from 'react';
import AddressTextBox from '../spaceMap/AddressTextBox';
// import AddressTextBox from '../map/AddressTextBox';
import RatingSlider from './RatingSlider';
const SpaceForm = ({ onSubmit, space }) => {
  const [address, setAddress] = useState('');
  const [name, setName] = useState('');
  const [rating, setRating] = useState();
  const [safeRestroom, setSafeRestroom] = useState(false);
  const [neutralRestroom, setNeutralRestroom] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [type, setType] = useState('');
  const [isDirty, setIsDirty] = useState(false)
  useEffect(() => {
    if (!space) return
    const { name, type, address, rating, safeRestroom, neutralRestroom } = space;
    const { addressString, coords, shortAddressString } = address
    address && setAddress({ addressString, coords, shortAddressString })
    setName(name);
    setType(type);
    setRating(rating);
    setSafeRestroom(safeRestroom);
    setNeutralRestroom(neutralRestroom);
  }, [space])

  const onAddressChange = (addressString, coords, shortAddressString) => {
    setAddress({ addressString, coords, shortAddressString });
    setIsDirty(true);
  }

  const onNameChange = e => {
    setName(e.target.value);
    setIsDirty(true);
  }
  const onTypeChange = e => {
    setType(e.target.value);
    setIsDirty(true);
  }

  const onRatingChange = r => {
    setRating(r);
    setIsDirty(true);
  }
  const onSafeRestroomChange = e => {
    setSafeRestroom(e.target.checked);
    setIsDirty(true);
  }
  const onNeutralRestroomChange = e => {
    setNeutralRestroom(e.target.checked);
    setIsDirty(true);
  }
  useEffect(()=>{
    if (name && type && address && rating) setIsValid(true);
    else setIsValid(false);
  },[name, address, rating, type])

  const onSubmitClick = async () => {
    if (isValid) {
      const editedValue = { name, type, address, rating, isApproved: false, safeRestroom, neutralRestroom }
      onSubmit(editedValue);
    }
  }

  return (
    <Container sx={{ maxWidth: { sm: '50%', xs: '90%' } }}>
      <Button disabled={!isDirty || !isValid} variant="contained" onClick={onSubmitClick} sx={{ margin: 1 }}>Submit</Button>
      <TextField fullWidth label="space name" value={name} onChange={onNameChange} sx={{ margin: 1 }} />
      <TextField label="space type" value={type} onChange={onTypeChange} sx={{ margin: 1 }} />
      <FormGroup>
        <FormControlLabel control={<Checkbox checked={safeRestroom} onChange={onSafeRestroomChange} />} label="Safe restroom availability?" />
      </FormGroup>
      <FormGroup>
        <FormControlLabel control={<Checkbox checked={neutralRestroom} onChange={onNeutralRestroomChange} />} label="Gender neutral restroom(s)?" />
      </FormGroup>
      <RatingSlider value={rating} onChange={onRatingChange} sx={{ margin: 1 }} />
      <AddressTextBox defaultValue={address} onChange={onAddressChange} />
    </Container>
  )
}

export default SpaceForm