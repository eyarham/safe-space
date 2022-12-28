import { Button, Checkbox, FormControlLabel, FormGroup, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import AddressTextBox from '../map/AddressTextBox';
// import AddressTextBox from '../map/AddressTextBox';
import { create } from './api';
import RatingSlider from './RatingSlider';
const NewSpace = () => {
  const [address, setAddress] = useState();
  const [name, setName] = useState();
  const [rating, setRating] = useState();
  const [safeRestroom, setSafeRestroom] = useState(false);
  const [neutralRestroom, setNeutralRestroom] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [type, setType] = useState();
  const navigate = useNavigate();

  const onAddressChange = (addressString, coords, shortAddressString) => {
    setAddress({ addressString, coords, shortAddressString });
    validate();
  }

  const onNameChange = e => {
    setName(e.target.value);
    validate();
  }
  const onTypeChange = e => {
    setType(e.target.value);
    validate();
  }

  const onRatingChange = r => {
    setRating(r);
    validate();
  }
  const validate = () => {

    if (name && address && rating) setIsValid(true);
    else setIsValid(false);
  }

  const onSubmitClick = async () => {
    if (isValid) {
      await create({ name, type, address, rating, isApproved: false, safeRestroom, neutralRestroom });
      alert("space was created successfully and submitted for review")
      navigate('/')
    }
  }
  const onSafeRestroomChange = e => {
    setSafeRestroom(e.target.checked);
  }
  const onNeutralRestroomChange = e => {
    setNeutralRestroom(e.target.checked);
  }

  return (
    <div>
      <div>Add New Space</div>
      <div>
        <Button disabled={!isValid} variant="contained" onClick={onSubmitClick}>Submit</Button>
      </div>
      <div>
        <TextField label="space name" onChange={onNameChange} />
      </div>
      <div>
        <TextField label="space type" onChange={onTypeChange} />
      </div>
      <FormGroup>
        <FormControlLabel control={<Checkbox onChange={onSafeRestroomChange} />} label="Safe restroom availability?" />
      </FormGroup>
      <FormGroup>
        <FormControlLabel control={<Checkbox onChange={onNeutralRestroomChange} />} label="Gender neutral restroom(s)?" />
      </FormGroup>
      <RatingSlider onChange={onRatingChange} />
      <div>
        <AddressTextBox onChange={onAddressChange} />
      </div>
    </div>
  )
}

export default NewSpace