import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Spinner from '../_common/Spinner';
// import AddressTextBox from '../map/AddressTextBox';
import { getByIdSub } from './api';
import RatingDisplay from './RatingDisplay';
const Space = () => {
  const [existingData, setExistingData] = useState();

  const { id } = useParams();

  useEffect(() => {
    return getByIdSub(id, d => {
      setExistingData(d);
    });
  }, [id])
  if (!existingData) return <Spinner />
  const { name, type, address, rating, neutralRestroom, safeRestroom } = existingData.data()
  return (
    <div>
      <div>{name}</div>
      <div>{type}</div>
      <RatingDisplay value={rating} />
      <div>
        {address.addressString}
      </div>
      <div>Safe restroom availability? {(neutralRestroom && "yes") || "no"}</div>
      <div>Gender neutral restroom(s)?: {(safeRestroom && "yes") || "no"}</div>
    </div>
  )
}

export default Space