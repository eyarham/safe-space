import { Button, TableCell, TableRow } from '@mui/material';
import React from 'react';
import UserName from '../user/UserName';
import { setIsApproved } from './api';

const ReviewRow = ({ review }) => {
  const { text, spaceName, isApproved, rating, safeRestroom, neutralRestroom, isAnonymous, createdBy, createdDate } = review.data();


  const approve = async () => {
    await setIsApproved(review.id, true);
  }
  const remove = async () => {
    await setIsApproved(review.id, false);
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
      <TableCell>
        {isApproved && <Button onClick={remove}>remove</Button>}
        {!isApproved && <Button onClick={approve}>approve</Button>}
      </TableCell>
    </TableRow>
  )
}

export default ReviewRow