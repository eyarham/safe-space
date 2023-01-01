import { TableCell, TableRow } from '@mui/material';
import React from 'react';

const ReportRow = ({ report }) => {
  const { text, spaceName } = report.data();
  return (
    <TableRow
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <TableCell component="th" scope="row">
        {spaceName}
      </TableCell>
      <TableCell component="th" scope="row" >
        {text}
      </TableCell>
    </TableRow>
  )
}

export default ReportRow