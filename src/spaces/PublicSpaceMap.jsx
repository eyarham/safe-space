import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { getApprovedDocsSub } from './api';
import RatingGuide from './RatingGuide';
import SpaceMap from './SpaceMap';

const PublicSpaceMap = () => {
  const [spaces, setSpaces] = useState();
  useEffect(() => {
    return getApprovedDocsSub((docs) => {
      setSpaces(docs)
    })
  }, [])
  return (
    <Box>
      <RatingGuide />
      <SpaceMap spaces={spaces} />
    </Box>
  )
}

export default PublicSpaceMap