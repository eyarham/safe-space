import { Slider } from '@mui/material'
import React, { useState } from 'react'

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
    <div><Slider
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
  {selectedRating}</div>
  )
}

export default RatingSlider