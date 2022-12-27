import React from 'react'
import './spaces.css'
const SpaceOverlay = ({marker}) => {
  
  const { address, name } = marker.data();
  const href = `/space/${marker.id}`;
  return (
    <div className='space-overlay'>
      <div>{name}</div>
      <div>{address.addressString}</div>
      <a href={href}>see more</a>
    </div>
  )
}

export default SpaceOverlay