import { Button, TextField } from '@mui/material';
import { Container } from '@mui/system';
import React, { useEffect, useState } from 'react';
import AddressTextBox from '../spaceMap/AddressTextBox';
const SpaceForm = ({ onSubmit, space }) => {
  const [address, setAddress] = useState('');
  const [name, setName] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [type, setType] = useState('');
  const [isDirty, setIsDirty] = useState(false)
  useEffect(() => {
    if (!space) return
    const { name, type, address } = space;
    const { addressString, coords, shortAddressString } = address
    address && setAddress({ addressString, coords, shortAddressString })
    setName(name);
    setType(type);
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
  useEffect(() => {
    if (name && type && address ) setIsValid(true);
    else setIsValid(false);
  }, [name, address,  type])

  const onSubmitClick = async () => {
    if (isValid) {
      const editedValue = { name, type, address,  isApproved: false }
      onSubmit(editedValue);
    }
  }
  return (
    <Container sx={{ maxWidth: { sm: '50%', xs: '90%' } }}>
      <Button disabled={!isDirty || !isValid} variant="contained" onClick={onSubmitClick} sx={{ margin: 1 }}>Submit</Button>
      <TextField fullWidth label="space name" value={name} onChange={onNameChange} sx={{ margin: 1 }} />
      <TextField label="space type" value={type} onChange={onTypeChange} sx={{ margin: 1 }} />
      <AddressTextBox defaultValue={address} onChange={onAddressChange} />
    </Container>
  )
}

export default SpaceForm