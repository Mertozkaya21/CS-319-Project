import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { NavLink } from 'react-router-dom'; // Added for navigation
import styles from './CoordinatorDashboardAdvisors.module.css';

// Data: Adapted from AdvisorTable dummy data
export const advisorRows = [
  { id: 1, name: 'Samanta William', city: 'Ankara', dateAdded: 'Oct 25, 2023', advisorId: '#123456789', tours: 23, phone: '555-123-4561', email: 'samanta.william@example.com' },
  { id: 2, name: 'Tony Soap', city: 'Ankara', dateAdded: 'Oct 25, 2023', advisorId: '#123456789', tours: 23, phone: '555-123-4562', email: 'tony.soap@example.com' },
  { id: 3, name: 'Karen Hope', city: 'Ankara', dateAdded: 'Oct 25, 2023', advisorId: '#123456789', tours: 23, phone: '555-123-4563', email: 'karen.hope@example.com' },
  { id: 4, name: 'Jordan Nico', city: 'Ankara', dateAdded: 'Oct 26, 2023', advisorId: '#987654321', tours: 23, phone: '555-987-6541', email: 'jordan.nico@example.com' },
  { id: 5, name: 'Nadila Adja', city: 'Ankara', dateAdded: 'Oct 26, 2023', advisorId: '#987654321', tours: 23, phone: '555-987-6542', email: 'nadila.adja@example.com' },
  { id: 6, name: 'Johnny Ahmad', city: 'Ankara', dateAdded: 'Oct 27, 2023', advisorId: '#987654321', tours: 23, phone: '555-654-3211', email: 'johnny.ahmad@example.com' },
];

// Table Columns
const columns = [
  { field: 'name', headerName: 'Advisor Name', width: 160 },
  { field: 'advisorId', headerName: 'Advisor ID', width: 120 },
  { field: 'dateAdded', headerName: 'Date Added', width: 150 },
  { field: 'tours', headerName: 'Tours Conducted', width: 150 },
  { field: 'city', headerName: 'City', width: 100 },
  {
    field: 'contact',
    headerName: 'Contact',
    width: 160,
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
    field: 'action',
    headerName: 'Action',
    width: 100,
    renderCell: () => (
      <NavLink to="/coordinatordashboardeditadvisor">
        <IconButton aria-label="edit">
          <EditIcon />
        </IconButton>
      </NavLink>
    ),
  },
];

const AdvisorTable = ({ rows }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogContent, setDialogContent] = useState('');

  // Handle contact click (phone/email)
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

  // Add `handleContactClick` to each row
  const rowsWithHandlers = rows.map((row) => ({
    ...row,
    handleContactClick,
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
          rows={rowsWithHandlers} // Rows with handlers
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

      {/* Dialog for contact information */}
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

export default AdvisorTable;