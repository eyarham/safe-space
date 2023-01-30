import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React from 'react';

import ReviewRow from './ReviewRow';
const ReviewsGrid = ({ reviews, isModeration, isMyReviews }) => {
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
          {reviews && reviews.map((review, i) => <ReviewRow key={i} review={review} isModeration={isModeration} isMyReviews={isMyReviews} />)}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default ReviewsGrid