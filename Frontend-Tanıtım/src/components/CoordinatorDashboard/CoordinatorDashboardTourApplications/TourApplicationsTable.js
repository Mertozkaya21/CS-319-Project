import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import IconButton from '@mui/material/IconButton';
import Radio from '@mui/material/Radio';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import RestartAltIcon from '@mui/icons-material/RestartAlt'; // Reset icon
import styles from './CoordinatorDashboardTourApplications.module.css';

// Data
export const tourApplicationsRows = [
  { id: 1, name: 'High School A', priority: 1, date: 'Dec 20, 2023', time: '10:00 AM', city: 'Ankara', phone: '555-123-4561', email: 'jane.doe1@example.com' },
  { id: 2, name: 'High School B', priority: 2, date: 'Dec 21, 2023', time: '11:00 AM', city: 'Ankara', phone: '555-123-4562', email: 'jane.doe2@example.com' },
  { id: 3, name: 'High School C', priority: 3, date: 'Dec 22, 2023', time: '12:00 PM', city: 'Istanbul', phone: '555-123-4563', email: 'jane.doe3@example.com' },
  { id: 4, name: 'High School D', priority: 4, date: 'Dec 23, 2023', time: '01:00 PM', city: 'Izmir', phone: '555-987-6541', email: 'john.doe1@example.com' },
];

// Columns
const columns = [
  { field: 'name', headerName: 'High School Name', width: 150 },
  { field: 'priority', headerName: 'Priority', width: 80 },
  { field: 'date', headerName: 'Tour Date', width: 100 },
  { field: 'time', headerName: 'Tour Time', width: 100 },
  { field: 'city', headerName: 'City', width: 100 },
  {
    field: 'contact',
    headerName: 'Contact',
    width: 100,
    renderCell: (params) => (
      <div className={styles.contactButtons}>
        <IconButton onClick={() => params.row.handleContactClick('phone', params.row)}>
          <FaPhoneAlt className={styles.contactIcon} />
        </IconButton>
        <IconButton onClick={() => params.row.handleContactClick('email', params.row)}>
          <FaEnvelope className={styles.contactIcon} />
        </IconButton>
      </div>
    ),
  },
  {
    field: 'decision',
    headerName: 'Accept / Reject',
    width: 160,
    renderCell: (params) => (
      <div>
        <Radio
          checked={params.row.decision === 'accept'}
          onChange={() => params.row.handleDecisionChange('accept', params.row.id)}
          value="accept"
          name={`decision-${params.row.id}`}
          inputProps={{ 'aria-label': 'Accept' }}
          sx={{
            color: '#8a0303',
            '&.Mui-checked': {
              color: '#6c0101',
            },
          }}
        />
        <Radio
          checked={params.row.decision === 'reject'}
          onChange={() => params.row.handleDecisionChange('reject', params.row.id)}
          value="reject"
          name={`decision-${params.row.id}`}
          inputProps={{ 'aria-label': 'Reject' }}
          sx={{
            color: '#8a0303',
            '&.Mui-checked': {
              color: '#6c0101',
            },
          }}
        />
      </div>
    ),
  },
  {
    field: 'reset',
    headerName: 'Reset',
    width: 100,
    renderCell: (params) => (
      <IconButton
        onClick={() => params.row.handleResetDecision(params.row.id)}
        sx={{
          color: '#8a0303',
          '&:hover': {
            color: '#6c0101',
          },
        }}
      >
        <RestartAltIcon />
      </IconButton>
    ),
  },
];

const TourApplicationsTable = ({ rows }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogContent, setDialogContent] = useState('');
  const [decisions, setDecisions] = useState({}); // Store decisions for each row

  const handleContactClick = (type, row) => {
    const content =
      type === 'phone'
        ? `Phone: ${row.phone}`
        : `Email: ${row.email}`;
    setDialogContent(content);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleDecisionChange = (decision, id) => {
    setDecisions((prevDecisions) => ({
      ...prevDecisions,
      [id]: decision,
    }));
  };

  const handleResetDecision = (id) => {
    setDecisions((prevDecisions) => ({
      ...prevDecisions,
      [id]: null, // Reset the decision for the specified row
    }));
  };

  // Map rows and add handlers to each row
  const rowsWithHandlers = rows.map((row) => ({
    ...row,
    handleContactClick, // Add the handler for contact
    handleDecisionChange, // Add the handler for decision change
    handleResetDecision, // Add the handler for reset
    decision: decisions[row.id] || null, // Attach decision state
  }));

  
  return (
    <div className={styles.tableContainer}>
      <Paper
        sx={{
          height: '500px',
          width: '100%',
          boxShadow: '0 3px 5px rgba(0, 0, 0, 0.1)',
          borderRadius: '10px',
          overflow: 'hidden',
        }}
      >
        <DataGrid
          rows={rowsWithHandlers} // Pass rows with handlers
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10]}
          checkboxSelection
          disableSelectionOnClick
          sx={{
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: '#f7f7f7',
              fontWeight: 'bold',
              color: '#8a0303',
              textAlign: 'center',
            },
            '& .MuiDataGrid-columnHeaderTitle': {
              textAlign: 'center',
              display: 'block',
            },
            '& .MuiDataGrid-row:nth-of-type(odd)': {
              backgroundColor: '#fce4e4', // Highlight every other row with light red
            },
            '& .MuiDataGrid-row:hover': {
              backgroundColor: '#f9d5d5',
            },
            '& .MuiDataGrid-cell': {
              textAlign: 'center',
              justifyContent: 'center',
              display: 'flex',
              alignItems: 'center',
            },
          }}
        />
      </Paper>

      {/* Popup Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Contact Information</DialogTitle>
        <DialogContent>{dialogContent}</DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default TourApplicationsTable;