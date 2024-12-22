import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import styles from './GuideDashboard.module.css';
import axios from 'axios';

export default function CustomTable({ guideId }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [tours, setTours] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await axios.get('http://localhost:8080/v1/events');
        // Filter only tour events assigned to this guide and format them
        const tourEvents = response.data
          .filter(event => event.tourType && event.guideIds?.includes(Number(guideId)))
          .map(tour => ({
            id: tour.id,
            school: tour.visitorSchool?.name || 'N/A',
            timeSlot: tour.tourHours || 'N/A',
            date: new Date(tour.date).toLocaleDateString(),
            numberOfAttendees: tour.noOfGuests || 0
          }));

        setTours(tourEvents);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchTours();
  }, [guideId]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className={styles.tableContainer}>
      <h3 className={styles.tableTitle}>My Upcoming Tours</h3>
      <Paper sx={{ borderRadius: '10px', boxShadow: '0 3px 5px rgba(0, 0, 0, 0.1)' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table sx={{ minWidth: 650 }} stickyHeader aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">ID</TableCell>
                <TableCell align="left">High School</TableCell>
                <TableCell align="left">Time Slot</TableCell>
                <TableCell align="left">Date</TableCell>
                <TableCell align="left">Number of Attendees</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tours
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{
                      '&:nth-of-type(odd)': { backgroundColor: '#f9f9f9' },
                      '&:hover': { backgroundColor: '#f1f1f1' },
                    }}
                  >
                    <TableCell align="center">{row.id}</TableCell>
                    <TableCell align="left">{row.school}</TableCell>
                    <TableCell align="left">{row.timeSlot}</TableCell>
                    <TableCell align="left">{row.date}</TableCell>
                    <TableCell align="left">{row.numberOfAttendees}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={tours.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}