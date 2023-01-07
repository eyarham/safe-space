import React, { useEffect, useState } from 'react';
import MapPanel from '../map/MapPanel';
import SpaceOverlaySmall from './SpaceOverlaySmall';

const SpaceMap = ({ spaces }) => {
  const [overlays, setOverlays] = useState();
  const [center, setCenter] = useState();
  useEffect(() => {
    const overlaysBuild = spaces && spaces.map((s, i) => {
      const { address } = s.data();
      return <SpaceOverlaySmall space={s} coor={address.coords} />
    })
    setOverlays(overlaysBuild)
    if (spaces && spaces.length === 1) {
      //set center to the space if there's only one
      const spaceLonLat = spaces[0].data().address.coords;
      setCenter(spaceLonLat);
    }
  }, [spaces])
  return (
    <MapPanel overlays={overlays} center={center} />
  )
}

export default SpaceMap