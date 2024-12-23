import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import IconButton from '@mui/material/IconButton';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'; // Import Schedule Icon
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import styles from './AdvisorDashboardGuides.module.css';
import { NavLink } from 'react-router-dom';

// Data: Adapted from GuidesTable dummy data
export const guidesRows = [
  {
    id: 1,
    name: 'Samanta William',
    dateAdded: 'Oct 25, 2023',
    tours: 23,
    phone: '555-123-4561',
    email: 'samanta.william@example.com',
    schedulePic: 'https://via.placeholder.com/150', // Dummy image URL
  },
  {
    id: 2,
    name: 'Tony Soap',
    dateAdded: 'Oct 25, 2023',
    tours: 23,
    phone: '555-123-4562',
    email: 'tony.soap@example.com',
    schedulePic: 'https://via.placeholder.com/150', // Dummy image URL
  },
  {
    id: 3,
    name: 'Karen Hope',
    dateAdded: 'Oct 25, 2023',
    tours: 23,
    phone: '555-123-4563',
    email: 'karen.hope@example.com',
    schedulePic: 'https://via.placeholder.com/150', // Dummy image URL
  },
  {
    id: 4,
    name: 'Jordan Nico',
    dateAdded: 'Oct 26, 2023',
    tours: 23,
    phone: '555-987-6541',
    email: 'jordan.nico@example.com',
    schedulePic: 'https://via.placeholder.com/150', // Dummy image URL
  },
  {
    id: 5,
    name: 'Nadila Adja',
    dateAdded: 'Oct 26, 2023',
    tours: 23,
    phone: '555-987-6542',
    email: 'nadila.adja@example.com',
    schedulePic: 'https://via.placeholder.com/150', // Dummy image URL
  },
  {
    id: 6,
    name: 'Johnny Ahmad',
    dateAdded: 'Oct 27, 2023',
    tours: 23,
    phone: '555-654-3211',
    email: 'johnny.ahmad@example.com',
    schedulePic: 'https://via.placeholder.com/150', // Dummy image URL
  },
];

// Table Columns
const columns = [
  { field: 'name', headerName: 'Guide Name', width: 160 },
  { field: 'id', headerName: 'Guide ID', width: 120 },
  { 
    field: 'dateCreated', 
    headerName: 'Date Added', 
    width: 120,
    valueGetter: (params) => new Date(params.row.dateCreated).toLocaleDateString()
  },
  { field: 'tourCount', headerName: 'Tours Conducted', width: 130 },
  {
    field: 'contact',
    headerName: 'Contact',
    width: 120,
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
    field: 'schedule',
    headerName: 'Schedule',
    width: 80,
    renderCell: (params) => (
      <IconButton onClick={() => params.row.handleViewScheduleClick(params.row)}>
        <CalendarMonthIcon className={styles.calendarIcon} />
      </IconButton>
    ),
  },
];

const GuidesTable = ({ rows }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogContent, setDialogContent] = useState('');
  const [dialogTitle, setDialogTitle] = useState('');

  const handleContactClick = (type, row) => {
    const content = type === 'phone' 
      ? `Phone: ${row.phoneNo}`
      : `Email: ${row.email}`;
    setDialogTitle(`${row.name}'s Contact Information`);
    setDialogContent(content);
    setOpenDialog(true);
  };

  const handleViewScheduleClick = (row) => {
    setDialogContent(
      <img
        src={row.imagePath || 'https://via.placeholder.com/150'}
        alt={`${row.name}'s Schedule`}
        style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
      />
    );
    setDialogTitle(`${row.name}'s Schedule`);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const rowsWithHandlers = rows.map((row) => ({
    ...row,
    handleContactClick,
    handleViewScheduleClick,
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
          rows={rowsWithHandlers}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10, 20, 50]}
          disableSelectionOnClick
          sx={{ 
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: '#f7f7f7',
              fontWeight: 'bold',
              color: '#8a0303',
              textAlign: 'center',
            },
            '& .MuiDataGrid-columnHeader': {
              justifyContent: 'center', // Center align content
            },
            '& .MuiDataGrid-columnHeaderTitle': {
              textAlign: 'center', // Center align text
              display: 'block',
              width: '100%',
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

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{dialogTitle}</DialogTitle>
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

export default GuidesTable;