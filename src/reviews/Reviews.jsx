import React, { useEffect, useState } from 'react';
import { getDocsSub } from './api';
import ReviewsGrid from './ReviewsGrid';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  useEffect(() => getDocsSub(setReviews), [])
  return (
    <ReviewsGrid reviews={reviews} isModeration />
  )
}

export default Reviews