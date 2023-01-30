import { Button, TableCell, TableRow } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import UserName from '../user/UserName';
import { setIsApproved } from './api';

const ReviewRow = ({ review, isModeration, isMyReviews }) => {
  const { text, spaceName, isApproved, rating, safeRestroom, neutralRestroom, isAnonymous, createdBy, createdDate, spaceId } = review.data();
const navigate = useNavigate();

  const approve = async () => {
    await setIsApproved(review.id, true, spaceId);
  }
  const remove = async () => {
    await setIsApproved(review.id, false, spaceId);
  }
  const edit = async () => {
    return navigate(`/review/${review.id}/edit`)
  }
  return (
    <TableRow
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <TableCell component="th" scope="row">
        {spaceName}
      </TableCell>
      <TableCell component="th" scope="row">
        {isAnonymous ? "anon" : <UserName id={createdBy} />}
      </TableCell>
      <TableCell component="th" scope="row">
        {Date(createdDate)}
      </TableCell>
      <TableCell component="th" scope="row" >
        {rating}
      </TableCell>
      <TableCell component="th" scope="row" >
        {safeRestroom ? "yes" : "no"}
      </TableCell>
      <TableCell component="th" scope="row" >
        {neutralRestroom ? "yes" : "no"}
      </TableCell>
      <TableCell component="th" scope="row" >
        {text}
      </TableCell>
      {isModeration &&
        <TableCell>
          {isApproved && <Button onClick={remove}>remove</Button>}
          {!isApproved && <Button onClick={approve}>approve</Button>}
        </TableCell>
      }
      {isMyReviews &&
        <TableCell>
           <Button onClick={edit}>edit</Button>          
        </TableCell>
      }
    </TableRow>
  )
}

export default ReviewRow