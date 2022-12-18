import { Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import AddressTextBox from '../map/AddressTextBox';
// import AddressTextBox from '../map/AddressTextBox';
import { create } from './api';
const Space = () => {
  const [address, setAddress] = useState();
  const [name, setName] = useState();
  const [isValid, setIsValid] = useState(false);



  const onAddressChange = ( addressString, coords ) => {
    setAddress({ addressString, coords });
    validate();
  }

  const onNameChange = e => {
    setName(e.target.value);
    validate();
  }
  const validate = ()=>{

    if (name && address) setIsValid(true);
    else  setIsValid(false);
  }

  const onSubmitClick = async () => {
    if (isValid) {
      await create({ name, address })
    }
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
        <AddressTextBox onChange={onAddressChange} />
      </div>
    </div>
  )
}

export default Space