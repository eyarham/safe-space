import { Button } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { UserContext } from '../user/UserContextProvider';
import Spinner from '../_common/Spinner';
// import AddressTextBox from '../map/AddressTextBox';
import { getByIdSub } from './api';
import RatingDisplay from './RatingDisplay';
import SpaceMap from '../spaceMap/SpaceMap';
const Space = () => {
  const navigate = useNavigate();
  const [existingSpace, setExistingSpace] = useState();
  const [showEdit, setShowEdit] = useState();
  const [spaceMarker, setSpaceMarker] = useState();
  const { user } = useContext(UserContext)
  useEffect(() => {
    if (user && user.data().isModerator) { setShowEdit(true) }
  }, [user])
  const { id } = useParams();

  useEffect(() => {
    return getByIdSub(id, d => {
      setExistingSpace(d);
    });
  }, [id]);

  useEffect(() => {
    if (!existingSpace) return;
    const { address } = existingSpace.data();
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
  }, [existingSpace]);

  const onReportClick = e => {
    navigate(`/report/${existingSpace.id}`)
  }
  const onAddReviewClick = e => {
    navigate(`/newreview/${existingSpace.id}`)
  }
  const onEditClick = e => {
    navigate('./edit')
  }
  if (!existingSpace) return <Spinner />
  const { name, type, address, rating, neutralRestroom, safeRestroom } = existingSpace.data()
  return (
    <div>
      {showEdit && <Button onClick={onEditClick}>edit</Button>}
      <Button onClick={onAddReviewClick}>add a review</Button>
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