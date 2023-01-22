import React, { useEffect, useState } from 'react';
import StarIcon from '@mui/icons-material/Star';
import { getRatingData } from './api';
const RatingDisplay = ({ value }) => {
  const [rating, setRating] = useState();  


  useEffect(() => {
    setRating(getRatingData(value));
  }, [value])
  if(!rating)return 
  return (
    <span>
      <span>{rating.text}</span>
      <span><StarIcon sx={{color: rating.icon}}></StarIcon></span>
    </span>
  )
}

export default RatingDisplay;