import { Box, Button, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';

import { confirmAddress } from './api';
import SpaceMap from './SpaceMap';

const AddressTextBox = ({ onChange = () => { }, defaultValue, defaultCoords }) => {
  const [inputValue, setInputValue] = useState('');
  const [address, setAddress] = useState('');
  const [mapCenter, setMapCenter] = useState(defaultCoords);
  const [mapZoom, setMapZoom] = useState(16);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  useEffect(() => {
    if (!defaultValue || !defaultValue.addressString) return;
    setInputValue(defaultValue.addressString)
    setAddress(defaultValue.addressString)
  }
    , [defaultValue])

  const setError = (message) => {
    setErrorMessage(message);
    setShowError(true);
  }
  const clearError = () => {

    setErrorMessage("");
    setShowError(false);
  }

  const checkAddress = async () => {
    clearError();
    if (!inputValue || inputValue.length < 1) {
      return setError("query too short");
    }

    const address = await confirmAddress(inputValue);
    if (!address) {
      return setError("no results found");
    }
    const addressString = getAddressString(address.address);
    const shortAddressString = getShortAddressString(address.address);
    setAddress(addressString);
    const coords = [address.lon, address.lat];
    onChange(addressString, coords, shortAddressString);
    setMapCenter(coords);
    setMapZoom(16);
  }
  const getAddressString = add => {
    const addressString = `${add.house_number} ${add.road} ${add.town}, ${add.state} ${add.postcode}`;
    return addressString;
  }

  const getShortAddressString = add => {
    const addressString = `${add.house_number} ${add.road}`;
    return addressString;
  }
  const onInputChange = async e => {
    const value = e.target.value;
    setInputValue(value);
  }
  const onFormSubmit = e => {
    e.preventDefault();
    checkAddress();
  }
  return (
    <div>
      <Box component="form" onSubmit={onFormSubmit}>
        <div>
          <TextField label="address" error={showError} helperText={errorMessage} onChange={onInputChange} value={inputValue} />
        </div>
        <div>
          <Button onClick={checkAddress} >Check Address</Button>
        </div>
      </Box>
      {address &&
        <div >
          <div >
            confirmed address: {address}
          </div>
          <Box sx={{ width: 300, height: 300 }}>
            <SpaceMap center={mapCenter} zoom={mapZoom} />
          </Box>
        </div>
      }
    </div>
  )
}

export default AddressTextBox