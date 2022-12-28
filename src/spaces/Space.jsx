import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Spinner from '../_common/Spinner'
// import AddressTextBox from '../map/AddressTextBox';
import { getByIdSub } from './api';
import RatingDisplay from './RatingDisplay'
const Space = () => {
  const [existingData, setExistingData] = useState();

  const { id } = useParams();

  useEffect(() => {
    return getByIdSub(id, d => {
      setExistingData(d);
    });
  }, [id])
  if(!existingData) return <Spinner />
  const { name, address, rating } = existingData.data()
  return (
    <div>
      <div>{name}</div>
      <div>
        {address.addressString}
      </div>
      <RatingDisplay value={rating} />
    </div>
  )
}

export default Space