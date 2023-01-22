import StarIcon from '@mui/icons-material/Star';
import React from 'react';
import { getRatingData } from '../spaces/api';

const SpaceOverlaySmall = ({ space }) => {
  const { name, rating } = space.data();

  const href = space.id ? `/space/${space.id}` : "#";
  if (!rating) return
  const ratingData = getRatingData(rating);
  return (
    <a className='space-overlay-small' href={href}>
      <span>
        <StarIcon className={`overlay-star star-${ratingData.icon}`} sx={{ color: ratingData.icon }}></StarIcon>
      </span>
      <span className="space-overlay-small-text" sx={{ maxWidth: 200 }}>{name}</span>
    </a>
  )
}

export default SpaceOverlaySmall