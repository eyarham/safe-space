import React, { useEffect, useState } from 'react';
import StarIcon from '@mui/icons-material/Star';
const RatingDisplay = ({ value }) => {
  const [rating, setRating] = useState();  

  const getRatingData =value=>{    
    switch (value) {
      case 1:
        return {text:"Hostile", icon: "red"}        
      case 2:
        return {text:"Caution", icon: "orange"}
      case 3:
        return {text:"LGB Friendly", icon: "yellow"}
      case 4:
        return {text:"LGBT+ Friendly", icon: "green"}
      case 5:
        return {text:"LGBT+ Safe Space", icon: "blue"}
      default:
        break;
    }
  }

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

export default RatingDisplay