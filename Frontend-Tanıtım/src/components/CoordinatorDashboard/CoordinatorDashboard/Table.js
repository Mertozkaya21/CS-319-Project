import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import styles from './CoordinatorDashboard.module.css';

// Data
const rows = [
  { id: 1, school: 'High School A', timeSlot: '9:00 AM', guide: 'John Doe', date: '01-12-2024' },
  { id: 2, school: 'High School B', timeSlot: '10:00 AM', guide: 'Jane Smith', date: '05-12-2024' },
  { id: 3, school: 'High School C', timeSlot: '11:00 AM', guide: 'John Doe', date: '08-12-2024' },
  { id: 4, school: 'High School D', timeSlot: '12:00 PM', guide: 'Jane Smith', date: '09-12-2024' },
  { id: 5, school: 'High School E', timeSlot: '1:00 PM', guide: 'John Doe', date: '10-12-2024' },
  { id: 6, school: 'High School F', timeSlot: '2:00 PM', guide: 'Jane Smith', date: '11-12-2024' },
  { id: 7, school: 'High School G', timeSlot: '3:00 PM', guide: 'John Doe', date: '15-12-2024' },
  { id: 8, school: 'High School H', timeSlot: '4:00 PM', guide: 'Jane Smith', date: '20-12-2024' },
  { id: 9, school: 'High School I', timeSlot: '5:00 PM', guide: 'John Doe', date: '22-12-2024' },
  { id: 10, school: 'High School J', timeSlot: '6:00 PM', guide: 'Jane Smith', date: '27-12-2024' },
];

export default function CustomTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5); // Default to 5 rows per page

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to first page on rows per page change
  };

  return (
    <div className={styles.tableContainer}>
      <h3 className={styles.tableTitle}>Upcoming Tours</h3>
      <Paper sx={{ borderRadius: '10px', boxShadow: '0 3px 5px rgba(0, 0, 0, 0.1)' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table sx={{ minWidth: 650 }} stickyHeader aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">ID</TableCell>
                <TableCell align="left">High School</TableCell>
                <TableCell align="left">Time Slot</TableCell>
                <TableCell align="left">Guide</TableCell>
                <TableCell align="left">Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) // Apply pagination
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
                    <TableCell align="left">{row.guide}</TableCell>
                    <TableCell align="left">{row.date}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]} // Options for rows per page
          component="div"
          count={rows.length} // Total number of rows
          rowsPerPage={rowsPerPage} // Rows per page
          page={page} // Current page
          onPageChange={handleChangePage} // Handle page change
          onRowsPerPageChange={handleChangeRowsPerPage} // Handle rows per page change
        />
      </Paper>
    </div>
  );
}