import React from 'react'
import './spaces.css'
const SpaceOverlay = ({marker}) => {
  
  const { address, name } = marker.data();
  return (
    <div className='space-overlay'>
      <div>{name}</div>
      <div>{address.addressString}</div>
    </div>
  )
}

export default SpaceOverlay