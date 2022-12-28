import React from 'react';
import RatingDisplay from './RatingDisplay';
import './spaces.css';
const SpaceOverlay = ({ marker }) => {

  const { address, name, rating } = marker.data();
  const href = `/space/${marker.id}`;
  return (
    <div className='space-overlay'>
      <div>{name}</div>
      <div>{address.shortAddressString}</div>
      <RatingDisplay value={rating} />
      <a href={href}>see more</a>
    </div>
  )
}

export default SpaceOverlay