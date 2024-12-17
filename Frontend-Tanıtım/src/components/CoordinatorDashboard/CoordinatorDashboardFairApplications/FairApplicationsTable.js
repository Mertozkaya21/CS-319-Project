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
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Tooltip from '@mui/material/Tooltip';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';

// Data
export const fairApplicationsRows = [
  { id: 1, name: 'Organization A', date: 'Oct 30, 2024', time: '09:00-11:00', city: 'Ankara', phone: '555-123-4561', email: 'jane.doe1@example.com', comments: 'Looking forward to the fair and meeting you.' },
  { id: 2, name: 'Organization B', date: 'Oct 30, 2024', time: '09:00-11:00', city: 'Antalya', phone: '555-123-4562', email: 'jane.doe2@example.com', comments: 'Looking forward to the fair and meeting you.' },
  { id: 3, name: 'Organization C', date: 'Oct 30, 2024', time: '09:00-11:00', city: 'Konya', phone: '555-123-4562', email: 'jane.doe2@example.com' , comments: 'Looking forward to the fair and meeting you.' },
  { id: 4, name: 'Organization D', date: 'Oct 30, 2024', time: '09:00-11:00', city: 'Istanbul', phone: '555-123-4562', email: 'jane.doe2@example.com', comments: 'Looking forward to the fair and meeting you.'  },
  { id: 5, name: 'Organization E', date: 'Oct 30, 2024', time: '09:00-11:00', city: 'Konya', phone: '555-123-4562', email: 'jane.doe2@example.com', comments: 'Looking forward to the fair and meeting you.'  },
  { id: 6, name: 'Organization F', date: 'Oct 30, 2024', time: '09:00-11:00', city: 'Ankara', phone: '555-123-4562', email: 'jane.doe2@example.com', comments: 'Looking forward to the fair and meeting you.'  },
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
    field: 'comments',
    headerName: 'Comments',
    width: 90,
    renderCell: (params) => (
      params.row.comments && (
        <Tooltip title={params.row.comments} arrow>
          <ChatBubbleOutlineIcon sx={{ color: '#8a0303' }} />
        </Tooltip>
      )
    ),
  },
  {
    field: 'decision',
    headerName: 'Decision',
    width: 130,
    renderCell: (params) => (
      <ToggleButtonGroup
        value={params.row.decision}
        exclusive
        onChange={(e, value) => handleDecisionChange(value, params.row.id)}
        size="small"
        sx={{
          '& .MuiToggleButton-root': {
            padding: '2px 6px', // Smaller padding
            fontSize: '12px',   // Smaller font size
            minHeight: '28px',  // Reduce the minimum height
            minWidth: '60px',   // Reduce the minimum width
          },
        }}
      >
        <ToggleButton
          value="accept"
          sx={{
            color: params.row.decision === 'accept' ? '#fff' : 'grey', // White when selected
            backgroundColor: params.row.decision === 'accept' ? 'green' : '#e0e0e0', // Green when selected
            '&:hover': {
              backgroundColor: params.row.decision === 'accept' ? 'rgba(0, 128, 0, 0.8)' : '#d5d5d5',
              color: params.row.decision === 'accept' ? '#fff' : 'grey',
            },
            '&.Mui-selected': {
              backgroundColor: 'green', // Force green when clicked
              color: '#fff',
              '&:hover': {
                backgroundColor: 'rgba(0, 128, 0, 0.8)',
              },
            },
            fontWeight: 'bold',
            borderRadius: '8px',
          }}
        >
          Accept
        </ToggleButton>
        <ToggleButton
        value="reject"
        sx={{
          color: params.row.decision === 'reject' ? '#fff' : 'grey', // White when selected
          backgroundColor: params.row.decision === 'reject' ? 'red' : '#e0e0e0', // Red when selected
          '&:hover': {
            backgroundColor: params.row.decision === 'reject' ? 'rgba(255, 0, 0, 0.8)' : '#d5d5d5',
            color: params.row.decision === 'reject' ? '#fff' : 'grey',
          },
          '&.Mui-selected': {
            backgroundColor: 'red', // Force red when clicked
            color: '#fff',
            '&:hover': {
              backgroundColor: 'rgba(255, 0, 0, 0.8)',
            },
          },
          fontWeight: 'bold',
          borderRadius: '8px',
        }}
      >
        Reject
      </ToggleButton>
      </ToggleButtonGroup>
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