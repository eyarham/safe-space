import { Button, TableCell, TableRow } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { setIsApproved } from './api'
import RatingDisplay from './RatingDisplay'

const SpaceRow = ({ space }) => {
  const navigate = useNavigate();
  const { name, type, address, rating, neutralRestroom, safeRestroom, isApproved } = space.data()

  const approve = async () => {
    await setIsApproved(space.id, true);
  }
  const remove = async () => {
    await setIsApproved(space.id, false);
  }
  const onRowClick = e => {
    navigate(`/space/${space.id}/edit`)
  }
  return (
    <TableRow
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <TableCell component="th" scope="row" onClick={onRowClick}>
        {name}
      </TableCell>
      <TableCell component="th" scope="row">
        {type}
      </TableCell>
      <TableCell component="th" scope="row">
        {address.addressString}
      </TableCell>
      <TableCell align="right" component="th" scope="row">
        <RatingDisplay value={rating} />
      </TableCell>
      <TableCell component="th" scope="row">
        {neutralRestroom ? "yes" : "no"}
      </TableCell>
      <TableCell component="th" scope="row">
        {safeRestroom ? "yes" : "no"}
      </TableCell>
      {isApproved && <TableCell align="right"><Button onClick={remove}>remove</Button></TableCell>}
      {!isApproved && <TableCell align="right"><Button onClick={approve}>approve</Button></TableCell>}
    </TableRow>
  )
}

export default SpaceRow