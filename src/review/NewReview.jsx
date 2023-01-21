import { Button, Container } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getByIdSub } from '../spaces/api';
import RatingSlider from '../spaces/RatingSlider';
import CheckboxHeader from '../utils/CheckboxHeader';
import CheckboxWithHelp from '../utils/CheckboxWithHelp';
import Spinner from '../utils/Spinner';
import { createAnonDoc, createDoc } from './api';

const NewReview = () => {
  const { spaceId } = useParams();
  const navigate = useNavigate();
  const [rating, setRating] = useState(null);
  const [safeRestroom, setSafeRestroom] = useState(null);
  const [neutralRestroom, setNeutralRestroom] = useState(null);
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [space, setSpace] = useState();
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    getByIdSub(spaceId, setSpace)
  }, [spaceId])

  useEffect(() => {
    if (safeRestroom !== null && neutralRestroom !== null && rating !== null) { setIsValid(true) }
    else { setIsValid(false) }
  }, [safeRestroom, neutralRestroom, rating])

  const onSafeRestroomChange = e => {
    setSafeRestroom(e);
  }
  const onNeutralRestroomChange = e => {
    setNeutralRestroom(e);
  }
  const onAnonymousChange = e => {
    setIsAnonymous(e);
  }
  const onRatingChange = r => {
    setRating(r);
  }
  const onSubmitClick = async () => {
    if (!isValid) return;
    const { name } = space.data();
    const review = { spaceName: name, rating, isApproved: false, safeRestroom, neutralRestroom, spaceId, isAnonymous }
    if (isAnonymous) { await createAnonDoc(review) }
    else { await createDoc(review); }

    alert("review submitted successfully");
    navigate('/');
  }
  if (!space) return <Spinner />
  const { name } = space.data();

  return (
    <Container sx={{ maxWidth: { sm: '50%', xs: '90%' } }}>
      <h4>Reviewing experience at {name}</h4>
      <CheckboxHeader />
      <CheckboxWithHelp checked={isAnonymous} onChange={onAnonymousChange}
        label="Submit anonymously?"
        helpText="Select this if you would like your review to exclude your name."
      />
      <hr />
      <CheckboxWithHelp checked={safeRestroom} onChange={onSafeRestroomChange}
        label="Safe restroom availability?"
        helpText="Select this if you were able to find a restroom that you felt safe to use"
      />
      <CheckboxWithHelp checked={neutralRestroom} onChange={onNeutralRestroomChange}
        label="Gender neutral restroom(s)?"
        helpText="Select this if you had access to gender neutral restrooms"
      />
      <RatingSlider value={rating} onChange={onRatingChange} sx={{ margin: 1 }} />
      <Button disabled={!isValid} variant="contained" onClick={onSubmitClick} sx={{ margin: 1 }}>Submit</Button>
    </Container>
  )
}

export default NewReview