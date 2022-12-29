import { Slider } from '@mui/material';
import React, { useEffect, useState } from 'react';
import RatingDisplay from './RatingDisplay';

const RatingSlider = ({ onChange, value }) => {
  const [selectedRating, setSelectedRating] = useState(0);
  useEffect(() => { if (value) setSelectedRating(value) }, [value]);

  const onRatingChange = e => {
    setSelectedRating(e.target.value);
    onChange(e.target.value);
  }
  return (
    <div>Rating:
      <Slider
        aria-label="Temperature"
        valueLabelDisplay="auto"
        step={1}
        marks
        min={1}
        max={5}
        onChange={onRatingChange}
        value={selectedRating}
      />
      <RatingDisplay value={selectedRating} /></div>
  )
}

export default RatingSlider