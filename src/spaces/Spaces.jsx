import React, { useEffect, useState } from 'react';
import SpaceMap from '../map/SpaceMap';
import { getDocsSub } from './api';
const Spaces = () => {
  const [markers, setMarkers] = useState([]);
  useEffect(() => {
    return getDocsSub((docs) => {
      setMarkers(docs.map(d=>d.data().address.coords))
    })

  }, [])
  return (
    <div>
      <SpaceMap markers={markers}/>
    </div>
  )
}

export default Spaces