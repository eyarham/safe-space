import { Radio } from '@mui/material';
import React, { useState } from 'react';

const CheckboxPair = ({ onChange, checked, disabled }) => {
  const [selectedValue, setSelectedValue] = useState(checked);

  const handleChange = (event) => {
    const bool = event.target.value === "true";
    setSelectedValue(bool);
    onChange(bool);
  };
  return (
    <div>
      <Radio
        checked={selectedValue === true}
        onChange={handleChange}
        value={true}
        name="radio-buttons"
        inputProps={{ 'aria-label': 'true' }}
        disabled={disabled}
      />
      <Radio
        checked={selectedValue === false}
        onChange={handleChange}
        value={false}
        name="radio-buttons"
        inputProps={{ 'aria-label': 'false' }}
        disabled={disabled}
      />
    </div>
  )
}

export default CheckboxPair