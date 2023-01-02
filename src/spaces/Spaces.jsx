import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { getDocsSub } from './api';
import SpaceRow from './SpaceRow';

const Spaces = () => {
  const [spaces, setSpaces] = useState([]);
  useEffect(() => {
    return getDocsSub((docs) => {
      setSpaces(docs)
    })
  }, [])
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 350 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>name</TableCell>
            <TableCell>type</TableCell>
            <TableCell>address</TableCell>
            <TableCell align="right">rating</TableCell>
            <TableCell>neutral bath?</TableCell>
            <TableCell >safe bath?</TableCell>
            <TableCell align="right">actions</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {spaces && spaces.map((space, i) => <SpaceRow key={i} space={space} />)}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default Spaces