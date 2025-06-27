import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';

const StatisticsTable = ({ urls }) => {
  if (urls.length === 0) {
    return <Typography>No URLs shortened yet</Typography>;
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Short URL</TableCell>
            <TableCell>Created</TableCell>
            <TableCell>Expires</TableCell>
            <TableCell>Clicks</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {urls.map((url) => {
            const expiryDate = new Date(url.created);
            expiryDate.setMinutes(expiryDate.getMinutes() + url.validity);
            
            return (
              <TableRow key={url.shortcode}>
                <TableCell>
                  <a href={`http://localhost:3000/${url.shortcode}`} target="_blank" rel="noreferrer">
                    {url.shortcode}
                  </a>
                </TableCell>
                <TableCell>{new Date(url.created).toLocaleString()}</TableCell>
                <TableCell>{expiryDate.toLocaleString()}</TableCell>
                <TableCell>{url.clickCount || 0}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default StatisticsTable;