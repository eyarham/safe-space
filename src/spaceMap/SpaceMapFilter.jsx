import { Checkbox } from '@mui/material';
import React, { useState } from 'react';

const SpaceMapFilter = ({ onChange }) => {
  const [filter, setFilter] = useState([]);
  const onCheckChange = e => {
    const { value, checked } = e.target;
    const ratingValue = Number(value);
    var newFilter = filter;
    if (checked) {
      newFilter = [...filter, ratingValue]
    }
    else {
      newFilter = filter.filter(f => f !== ratingValue);
    }
    setFilter(newFilter);
    onChange(newFilter);
  }
  return (
    <div>
      <Checkbox value={1} onChange={onCheckChange} />1
      <Checkbox value={2} onChange={onCheckChange} />2
      <Checkbox value={3} onChange={onCheckChange} />3
      <Checkbox value={4} onChange={onCheckChange} />4
      <Checkbox value={5} onChange={onCheckChange} />5
    </div>
  )
}

export default SpaceMapFilter