import React, { useEffect, useState } from 'react';
import SpaceMap from '../map/SpaceMap';
import { getApprovedDocsSub, getDocsSub } from './api';
const Spaces = () => {
  const [markers, setMarkers] = useState([]);
  useEffect(() => {
    return getApprovedDocsSub((docs) => {
      setMarkers(docs)
    })

  }, [])
  return (
    <div>
      <SpaceMap markers={markers} />
    </div>
  )
}

export default Spaces