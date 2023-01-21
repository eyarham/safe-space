import { Button, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getByIdSub } from '../spaces/api';
import Spinner from '../utils/Spinner';
import { createDoc } from './api';

const Report = () => {
  const navigate = useNavigate();
  const { spaceId } = useParams();
  const [space, setSpace] = useState();
  const [text, setText] = useState();

  useEffect(() => {
    getByIdSub(spaceId, setSpace);

  }, [spaceId])

  const onSubmitClick = async () => {
    const { name} = space.data();
    const newReport = {spaceName: name, text}
    await createDoc(newReport);
    alert("report created successfully. thank you.")
    navigate("/");
  }

  const onTextChange = e=>{
    setText(e.target.value);
  }

  if (!space) return <Spinner />
  const { name } = space.data();
  return (
    <div>
      <div>{`Reporting ${name}`}</div>
      <div><TextField onChange={onTextChange}></TextField></div>
      <div><Button onClick={onSubmitClick}>submit</Button></div>
    </div>
  )
}

export default Report