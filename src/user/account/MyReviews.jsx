import React, { useContext, useEffect, useState } from 'react';
import { getUserReviewsSub } from '../../reviews/api';
import ReviewsGrid from '../../reviews/ReviewsGrid';
import { UserContext } from '../UserContextProvider';

const MyReviews = () => {
  const [reviews, setReviews] = useState([]);
  const { user } = useContext(UserContext);
  useEffect(() => getUserReviewsSub(user.id, setReviews), [user.id])
  return (
    <ReviewsGrid reviews={reviews} isMyReviews />
  )
}

export default MyReviews