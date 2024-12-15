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
import styles from './CoordinatorDashboardFairApplications.module.css';

// Data
export const fairApplicationsRows = [
  { id: 1, name: 'Organization A', date: 'Oct 30, 2024', time: '09:00-11:00', city: 'Ankara', phone: '555-123-4561', email: 'jane.doe1@example.com' },
  { id: 2, name: 'Organization B', date: 'Oct 30, 2024', time: '09:00-11:00', city: 'Antalya', phone: '555-123-4562', email: 'jane.doe2@example.com' },
  { id: 3, name: 'Organization C', date: 'Oct 30, 2024', time: '09:00-11:00', city: 'Konya', phone: '555-123-4562', email: 'jane.doe2@example.com' },
  { id: 4, name: 'Organization D', date: 'Oct 30, 2024', time: '09:00-11:00', city: 'Istanbul', phone: '555-123-4562', email: 'jane.doe2@example.com' },
  { id: 5, name: 'Organization E', date: 'Oct 30, 2024', time: '09:00-11:00', city: 'Konya', phone: '555-123-4562', email: 'jane.doe2@example.com' },
  { id: 6, name: 'Organization F', date: 'Oct 30, 2024', time: '09:00-11:00', city: 'Ankara', phone: '555-123-4562', email: 'jane.doe2@example.com' },
];

// Columns
const columns = [
  { field: 'name', headerName: 'Organisation Name', width: 150 },
  { field: 'date', headerName: 'Fair Date', width: 100 },
  { field: 'time', headerName: 'Fair Time', width: 100 },
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
    width: 120,
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
    width: 60,
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

const FairApplicationsTable = ({ rows }) => {
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


export default FairApplicationsTable;