import { Button } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { UserContext } from '../user/UserContextProvider';
import Spinner from '../_common/Spinner';
// import AddressTextBox from '../map/AddressTextBox';
import { getByIdSub } from './api';
import RatingDisplay from './RatingDisplay';
import SpaceMap from './SpaceMap';
const Space = () => {
  const navigate = useNavigate();
  const [existingData, setExistingData] = useState();
  const [showEdit, setShowEdit] = useState();
  const [spaceMarker, setSpaceMarker] = useState();
  const { user } = useContext(UserContext)
  useEffect(() => {
    if (user && user.data().isModerator) { setShowEdit(true) }
  }, [user])
  const { id } = useParams();

  useEffect(() => {
    return getByIdSub(id, d => {
      setExistingData(d);
    });
  }, [id]);

  useEffect(() => {
    if (!existingData) return;
    const { address } = existingData.data();
    const { addressString, coords } = address;
    setSpaceMarker([{
      data: () => {
        return {
          name: addressString,
          rating: 5,
          address: { coords: coords }
        }
      }
    }]);
  }, [existingData]);

  const onReportClick = e => {
    navigate(`/report/${existingData.id}`)
  }
  const onEditClick = e => {
    navigate('./edit')
  }
  if (!existingData) return <Spinner />
  const { name, type, address, rating, neutralRestroom, safeRestroom } = existingData.data()
  return (
    <div>
      {showEdit && <Button onClick={onEditClick}>edit</Button>}
      <Button onClick={onReportClick}>report</Button>
      <div>{name}</div>
      <div>{type}</div>
      <RatingDisplay value={rating} />
      <div>
        {address.addressString}
      </div>
      <div>Safe restroom availability? {(neutralRestroom && "yes") || "no"}</div>
      <div>Gender neutral restroom(s)?: {(safeRestroom && "yes") || "no"}</div>
      <SpaceMap spaces={spaceMarker} />
    </div>
  )
}

export default Space