import { FormControlLabel, FormGroup, Popover, Typography } from '@mui/material';
import React, { useState } from 'react';
import CheckboxPair from './CheckboxPair';

const CheckboxWithHelp = ({ checked, onChange, label, helpText, disabled }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  return (
    <FormGroup>
      <FormControlLabel
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
        control={<CheckboxPair checked={checked} onChange={onChange} disabled={disabled} />} label={label} />
      <Popover
        id="mouse-over-popover"
        sx={{
          pointerEvents: 'none',
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Typography sx={{ p: 1 }}>{helpText}</Typography>
      </Popover>
    </FormGroup>)
}

export default CheckboxWithHelp