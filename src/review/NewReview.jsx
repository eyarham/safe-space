import { Button, Container, TextField } from '@mui/material';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getByIdSub } from '../spaces/api';
import RatingSlider from '../spaces/RatingSlider';
import { getRandomWord } from '../utils/api';
import CheckboxHeader from '../utils/CheckboxHeader';
import CheckboxWithHelp from '../utils/CheckboxWithHelp';
import Spinner from '../utils/Spinner';
import { createDoc } from './api';
const NewReview = () => {
  const auth = getAuth();
  const { spaceId } = useParams();
  const navigate = useNavigate();
  const [rating, setRating] = useState(null);
  const [safeRestroom, setSafeRestroom] = useState(null);
  const [neutralRestroom, setNeutralRestroom] = useState(null);
  const [claimCode, setClaimCode] = useState(null);
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [loggedInUser, setLoggedInUser] = useState();
  const [space, setSpace] = useState();
  const [text, setText] = useState();
  const [isValid, setIsValid] = useState(false);
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  useEffect(() => {
    const eff = async () => {
      const word1 = await getRandomWord('adjective');
      const word2 = await getRandomWord('noun');
      const word = `${capitalizeFirstLetter(word1)}${capitalizeFirstLetter(word2)}`;
      setClaimCode(word);
    }
    eff();
  }, [])
  useEffect(() => {
    getByIdSub(spaceId, setSpace)
  }, [spaceId])

  useEffect(() => {
    if (safeRestroom !== null && neutralRestroom !== null && rating !== null) { setIsValid(true) }
    else { setIsValid(false) }
  }, [safeRestroom, neutralRestroom, rating])

  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        //const uid = user.uid;
        setLoggedInUser(user);
        // ...
      } else {
        // User is signed out
        // ...
        setLoggedInUser(null);
      }
    });

  }, [auth])

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

  const copyClaimCode = async () => {
    await navigator.clipboard.writeText(claimCode);
  }

  const onTextChange = e => {
    setText(e.target.value);
  }

  const onSubmitClick = async () => {
    if (!isValid) return;
    const { name } = space.data();
    const review = {
      spaceName: name,
      rating, isApproved: false, safeRestroom,
      neutralRestroom, spaceId,
      isAnonymous, text
    }
    if (isAnonymous && !loggedInUser) {
      review.claimCode = claimCode
    }
    await createDoc(review);

    alert("review submitted successfully");
    navigate('/');
  }
  if (!space) return <Spinner />
  const { name } = space.data();

  return (
    <Container sx={{ maxWidth: { sm: '50%', xs: '90%' } }}>
      <h4>Reviewing experience at {name}</h4>
      <CheckboxHeader />
      <CheckboxWithHelp checked={isAnonymous} disabled={!loggedInUser} onChange={onAnonymousChange}
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
      <div>      <TextField placeholder={"any other thoughts?"} onChange={onTextChange}></TextField>
      </div>
      {isAnonymous && !loggedInUser &&
        <div>{`Review Claim Code: ${claimCode}`}
          <Button onClick={copyClaimCode}>copy</Button></div>
      }

      <Button disabled={!isValid} variant="contained" onClick={onSubmitClick} sx={{ margin: 1 }}>Submit</Button>
    </Container>
  )
}

export default NewReview