import React from 'react'
import StarIcon from '@mui/icons-material/Star';
import './spaces.css';
const RatingGuide = () => {
  return (
    <div>
        <StarIcon className={`overlay-star star-blue`} ></StarIcon>LGBT+ Safe Space
        <StarIcon className={`overlay-star star-green`} ></StarIcon>LGBT+ Friendly
        <StarIcon className={`overlay-star star-yellow`} ></StarIcon>LGB Friendly
        <StarIcon className={`overlay-star star-orange`} ></StarIcon>Caution
        <StarIcon className={`overlay-star star-red`} ></StarIcon>Hostile
    </div>
  )
}

export default RatingGuide