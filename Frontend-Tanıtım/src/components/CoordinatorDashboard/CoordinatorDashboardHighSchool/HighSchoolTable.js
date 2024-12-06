import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import { NavLink } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import styles from './CoordinatorDashboardHighSchool.module.css';

// Data
export const highSchoolRows = [
  { id: 1, name: 'High School A', city: 'Ankara', counselorName: 'Jane Doe', dateUpdated: 'Oct 25, 2023', highSchoolId: '#123456789', priority: 1, phone: '555-123-4561', email: 'jane.doe1@example.com' },
  { id: 2, name: 'High School B', city: 'Ankara', counselorName: 'Jane Doe', dateUpdated: 'Oct 25, 2023', highSchoolId: '#123456789', priority: 2, phone: '555-123-4562', email: 'jane.doe2@example.com' },
  { id: 3, name: 'High School C', city: 'Ankara', counselorName: 'Jane Doe', dateUpdated: 'Oct 25, 2023', highSchoolId: '#123456789', priority: 3, phone: '555-123-4563', email: 'jane.doe3@example.com' },
  { id: 4, name: 'High School D', city: 'Istanbul', counselorName: 'John Doe', dateUpdated: 'Oct 26, 2023', highSchoolId: '#987654321', priority: 4, phone: '555-987-6541', email: 'john.doe1@example.com' },
  { id: 5, name: 'High School E', city: 'Istanbul', counselorName: 'John Doe', dateUpdated: 'Oct 26, 2023', highSchoolId: '#987654321', priority: 5, phone: '555-987-6542', email: 'john.doe2@example.com' },
  { id: 6, name: 'High School F', city: 'Izmir', counselorName: 'Jane Doe', dateUpdated: 'Oct 27, 2023', highSchoolId: '#987654321', priority: 6, phone: '555-654-3211', email: 'jane.doe4@example.com' },
  { id: 7, name: 'High School G', city: 'Ankara', counselorName: 'Jane Doe', dateUpdated: 'Oct 25, 2023', highSchoolId: '#123456789', priority: 7, phone: '555-123-4567', email: 'jane.doe5@example.com' },
  { id: 8, name: 'High School H', city: 'Ankara', counselorName: 'Jane Doe', dateUpdated: 'Oct 25, 2023', highSchoolId: '#123456789', priority: 8, phone: '555-123-4568', email: 'jane.doe6@example.com' },
  { id: 9, name: 'High School I', city: 'Ankara', counselorName: 'Jane Doe', dateUpdated: 'Oct 25, 2023', highSchoolId: '#123456789', priority: 9, phone: '555-123-4569', email: 'jane.doe7@example.com' },
  { id: 10, name: 'High School J', city: 'Istanbul', counselorName: 'John Doe', dateUpdated: 'Oct 26, 2023', highSchoolId: '#987654321', priority: 10, phone: '555-987-6543', email: 'john.doe3@example.com' },
  { id: 11, name: 'High School K', city: 'Istanbul', counselorName: 'John Doe', dateUpdated: 'Oct 26, 2023', highSchoolId: '#987654321', priority: 11, phone: '555-987-6544', email: 'john.doe4@example.com' },
  { id: 12, name: 'High School L', city: 'Izmir', counselorName: 'Jane Doe', dateUpdated: 'Oct 27, 2023', highSchoolId: '#987654321', priority: 12, phone: '555-654-3212', email: 'jane.doe8@example.com' },
];
// Columns with Reduced Widths
const columns = [
  { field: 'name', headerName: 'High School Name', width: 140 }, // Reduced from 200
  { field: 'highSchoolId', headerName: 'School ID', width: 100 }, // Reduced from 150
  { field: 'dateUpdated', headerName: 'Date Updated', width: 120 }, // Reduced from 150
  { field: 'city', headerName: 'City', width: 80 }, // Reduced from 130
  { field: 'counselorName', headerName: 'Counselor Name', width: 150 }, // Reduced from 200
  {
    field: 'counselorContact',
    headerName: 'Counselor Contact',
    width: 150,
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
    field: 'priority',
    headerName: 'Priority Score',
    width: 110, // Reduced from 150
    renderCell: (params) => (
      <div className={styles.priorityScore}>
        {params.value}
      </div>
    ),
  },
  {
    field: 'action',
    headerName: 'Edit',
    width: 60,
    renderCell: () => (
      <NavLink
        to="/coordinatordashboardedithighschool/${params.highSchoolId}"
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

const HighSchoolTable = ({ rows }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogContent, setDialogContent] = useState('');

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

  const columns = [
    { field: 'name', headerName: 'High School Name', width: 140 },
    { field: 'highSchoolId', headerName: 'School ID', width: 100 },
    { field: 'dateUpdated', headerName: 'Date Updated', width: 120 },
    { field: 'city', headerName: 'City', width: 80 },
    { field: 'counselorName', headerName: 'Counselor Name', width: 150 },
    {
      field: 'counselorContact',
      headerName: 'Counselor Contact',
      width: 150,
      renderCell: (params) => (
        <div className={styles.contactButtons}>
          <IconButton onClick={() => handleContactClick('phone', params.row)}>
            <FaPhoneAlt className={styles.contactIcon} />
          </IconButton>
          <IconButton onClick={() => handleContactClick('email', params.row)}>
            <FaEnvelope className={styles.contactIcon} />
          </IconButton>
        </div>
      ),
    },
    {
      field: 'priority',
      headerName: 'Priority Score',
      width: 110,
      renderCell: (params) => (
        <div className={styles.priorityScore}>{params.value}</div>
      ),
    },
    {
      field: 'action',
      headerName: 'Edit',
      width: 60,
      renderCell: () => (
        <NavLink
          to="/coordinatordashboardedithighschool"
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
          rows={rows} // Dynamically filtered rows passed as props
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

export default HighSchoolTable;