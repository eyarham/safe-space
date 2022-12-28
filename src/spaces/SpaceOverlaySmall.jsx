import StarIcon from '@mui/icons-material/Star';
import React from 'react';

const SpaceOverlaySmall = ({ marker }) => {
  const { name, rating } = marker.data();
  const getRatingData = value => {
    switch (value) {
      case 1:
        return { text: "Hostile", icon: "red" }
      case 2:
        return { text: "Caution", icon: "orange" }
      case 3:
        return { text: "LGB Friendly", icon: "yellow" }
      case 4:
        return { text: "LGBT+ Friendly", icon: "green" }
      case 5:
        return { text: "LGBT+ Safe Space", icon: "blue" }
      default:
        break;
    }
  }
  const href = `/space/${marker.id}`;
  if (!rating) return
  return (
    <a className='space-overlay-small' href={href}>
      <span>
        <StarIcon className={`overlay-star star-${getRatingData(rating).icon}`} sx={{ color: rating.icon }}></StarIcon>
      </span>
      <span className="space-overlay-small-text">{name}</span>
    </a>
  )
}

export default SpaceOverlaySmall