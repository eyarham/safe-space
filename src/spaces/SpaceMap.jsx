import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import MapPanel from '../map/MapPanel';
import SpaceMapFilter from './SpaceMapFilter';
import SpaceOverlaySmall from './SpaceOverlaySmall';

const SpaceMap = ({ spaces }) => {
  const [overlays, setOverlays] = useState();
  const [filter, setFilter] = useState();
  const [center, setCenter] = useState();
  useEffect(() => {
    const overlaysBuild = spaces && spaces.map((s, i) => {
      const { address, rating } = s.data();
      if (filter && filter.length > 0 && filter.indexOf(rating) < 0) return <></>
      return <SpaceOverlaySmall space={s} coor={address.coords} />
    })
    setOverlays(overlaysBuild)
    if (spaces && spaces.length === 1) {
      //set center to the space if there's only one
      const spaceLonLat = spaces[0].data().address.coords;
      setCenter(spaceLonLat);
    }
  }, [spaces, filter])
  const onFilterChange = filter => {
    setFilter(filter)
  }
  return (
    <Box>
      <SpaceMapFilter onChange={onFilterChange} />
      <MapPanel overlays={overlays} center={center} />
    </Box>
  )
}

export default SpaceMap