import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import IconButton from '@mui/material/IconButton';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import styles from './AdvisorDashboardTrainees.module.css';
import EditIcon from '@mui/icons-material/Edit';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { NavLink } from 'react-router-dom';

// Dummy Data
export const traineesRows = [
  { 
    id: 1, 
    name: 'Samanta William', 
    dateAdded: 'Oct 25, 2023', 
    status: 'On Trial', 
    phone: '555-123-4561', 
    email: 'samanta.william@example.com',
    schedulePic: 'https://via.placeholder.com/150'
  },
  { id: 2, name: 'Tony Soap', dateAdded: 'Oct 25, 2023', status: 'Practicing', phone: '555-123-4562', email: 'tony.soap@example.com', schedulePic: 'https://via.placeholder.com/150' },
  { id: 3, name: 'Karen Hope', dateAdded: 'Oct 25, 2023', status: 'Observing', phone: '555-123-4563', email: 'karen.hope@example.com', schedulePic: 'https://via.placeholder.com/150' },
  // Add more dummy data as needed
];

const columns = [
  { field: 'name', headerName: 'Trainee Name', width: 160 },
  { field: 'id', headerName: 'Trainee ID', width: 120 },
  { field: 'dateAdded', headerName: 'Date Added', width: 120 },
  { field: 'status', headerName: 'Status', width: 130 },
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
  {
    field: 'action',
    headerName: 'Edit',
    width: 50,
    renderCell: (params) => (
      <NavLink
        to={`/advisordashboardedittrainee/${params.row.id}`}
        className={({ isActive }) =>
          `${styles.navItem} ${isActive ? styles.active : ''}`
        }
      >
        <IconButton aria-label="edit">
          <EditIcon />
        </IconButton>
      </NavLink>
    ),
  },
];

const TraineesTable = ({ rows, setSelectedRows }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogContent, setDialogContent] = useState('');
  const [dialogTitle, setDialogTitle] = useState('');

  const handleContactClick = (type, row) => {
    const content = type === 'phone' 
      ? `Phone: ${row.phone}`
      : `Email: ${row.email}`;
    setDialogTitle(`${row.name}'s Contact Information`);
    setDialogContent(content);
    setOpenDialog(true);
  };

  const handleViewScheduleClick = (row) => {
    setDialogContent(
      <img
        src={row.schedulePic || 'https://via.placeholder.com/150'}
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
      <Paper sx={{ height: '500px', width: '100%', boxShadow: '0 3px 5px rgba(0, 0, 0, 0.1)', borderRadius: '10px', overflow: 'hidden' }}>
        <DataGrid
          rows={rowsWithHandlers}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10, 20, 50]}
          checkboxSelection
          disableSelectionOnClick
          onRowSelectionModelChange={(newSelectionModel) => {
            setSelectedRows(newSelectionModel);
          }}
          sx={{ 
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: '#f7f7f7',
              fontWeight: 'bold',
              color: '#8a0303',
              textAlign: 'center',
            },
            '& .MuiDataGrid-columnHeader': {
              justifyContent: 'center',
            },
            '& .MuiDataGrid-columnHeaderTitle': {
              textAlign: 'center',
              display: 'block',
              width: '100%',
            },
            '& .MuiDataGrid-row:nth-of-type(odd)': {
              backgroundColor: '#fce4e4',
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

export default TraineesTable;