import { Slider } from '@mui/material'
import React, { useState } from 'react'
import RatingDisplay from './RatingDisplay';

const RatingSlider = ({onChange, staticValue}) => {
  const [selectedRating, setSelectedRating]=useState();
  function valuetext(value) {
    return `${value}°C`;
  }
const onRatingChange=e=>{
  setSelectedRating(e.target.value);
  onChange(e.target.value);
}
  return (
    <div>Rating:
      <Slider
    aria-label="Temperature"
    getAriaValueText={valuetext}
    valueLabelDisplay="auto"
    step={1}
    marks
    min={1}
    max={5}
    onChange={onRatingChange}
    value={staticValue}
  />
  <RatingDisplay value={selectedRating}/></div>
  )
}

export default RatingSlider