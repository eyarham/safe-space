import React, { useEffect, useState } from 'react';
import SpaceMap from '../map/SpaceMap';
import { getApprovedDocsSub } from './api';
import RatingGuide from './RatingGuide';
const Spaces = () => {
  const [markers, setMarkers] = useState([]);
  useEffect(() => {
    return getApprovedDocsSub((docs) => {
      setMarkers(docs)
    })

  }, [])
  return (
    <div>
      <RatingGuide />
      <SpaceMap markers={markers} />
    </div>
  )
}

export default Spaces