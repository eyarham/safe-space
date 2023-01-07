import Box from '@mui/material/Box';
import React from 'react';
import PublicSpaceMap from '../spaceMap/PublicSpaceMap';
const Home = () => {

  return (
    <Box sx={{ width: '100%', height: 400 }}>
      <PublicSpaceMap />
    </Box>
  )
}

export default Home