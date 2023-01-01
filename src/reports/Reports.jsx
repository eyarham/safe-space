import React, { useEffect, useState } from 'react'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

import { getDocsSub } from './api';
import ReportRow from './ReportRow';
const Reports = () => {
  const [reports, setReports] = useState([]);
  useEffect(() => {
    return getDocsSub((docs) => {
      setReports(docs)
    })
  }, [])
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 350 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>space name</TableCell>
            <TableCell>text</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reports && reports.map((report, i) => <ReportRow key={i} report={report} />)}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default Reports