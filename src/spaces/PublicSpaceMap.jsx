import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { getApprovedDocsSub } from './api';
import RatingGuide from './RatingGuide';
import SpaceMap from './SpaceMap';
import SpaceMapFilter from './SpaceMapFilter';

const PublicSpaceMap = () => {
  const [spaces, setSpaces] = useState();
  const [filter, setFilter] = useState();
  useEffect(() => {
    return getApprovedDocsSub((docs) => {
      if (filter && filter.length > 0) {
        const filteredDocs = docs.filter(d =>
          (filter.indexOf(d.data().rating) > -1));
        setSpaces(filteredDocs)
      }
      else {
        setSpaces(docs);
      }
    })
  }, [filter])
  const onFilterChange = filter => {
    setFilter(filter)
  }
  return (
    <Box>
      <RatingGuide />
      <SpaceMapFilter onChange={onFilterChange} />
      <SpaceMap spaces={spaces} />
    </Box>
  )
}

export default PublicSpaceMap