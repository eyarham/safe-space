import React, { useEffect, useState } from 'react'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { getDocsSub } from './api';
import ReviewRow from './ReviewRow';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    return getDocsSub((docs) => {
      setReviews(docs)
    })
  }, [])
  return (
    
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 350 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>space name</TableCell>
            <TableCell>user</TableCell>
            <TableCell>datetime</TableCell>
            <TableCell>rating</TableCell>
            <TableCell>safeRestroom</TableCell>
            <TableCell>genderneutralrestroom</TableCell>
            <TableCell>text</TableCell>
            <TableCell>actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reviews && reviews.map((review, i) => <ReviewRow key={i} review={review} />)}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default Reviews