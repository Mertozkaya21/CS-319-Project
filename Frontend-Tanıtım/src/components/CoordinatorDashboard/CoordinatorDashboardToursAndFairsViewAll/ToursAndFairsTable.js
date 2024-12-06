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
import styles from './CoordinatorDashboardToursAndFairsViewAll.module.css';

// Data from provided input
export const eventRows = [
  { id: '#123456789', event: 'Tour', name: 'High School A', guide: 'Jane Doe', date: 'Oct 23, 2024', time: '11:00-13:00', city: 'Ankara', phone: '531-142-1241', email: 'janedoe@gmail.com' },
  { id: '#123456790', event: 'Fair', name: 'Organisation B', guide: 'John Smith', date: 'Oct 24, 2024', time: '10:00-12:00', city: 'Istanbul', phone: '532-143-2242', email: 'johnsmith@gmail.com' },
  { id: '#123456791', event: 'Tour', name: 'High School C', guide: 'Emily Davis', date: 'Oct 25, 2024', time: '09:00-11:00', city: 'Izmir', phone: '533-144-3243', email: 'emilydavis@gmail.com' },
  { id: '#123456792', event: 'Tour', name: 'High School D', guide: 'Michael Brown', date: 'Oct 26, 2024', time: '13:30-15:30', city: 'Ankara', phone: '534-145-4244', email: 'michaelbrown@gmail.com' },
  { id: '#123456793', event: 'Fair', name: 'Organisation E', guide: 'Sarah Wilson', date: 'Oct 27, 2024', time: '14:00-16:00', city: 'Istanbul', phone: '535-146-5245', email: 'sarahwilson@gmail.com' },
  { id: '#123456794', event: 'Tour', name: 'High School F', guide: 'Robert Johnson', date: 'Oct 28, 2024', time: '10:30-12:30', city: 'Izmir', phone: '536-147-6246', email: 'robertjohnson@gmail.com' },
  { id: '#123456795', event: 'Fair', name: 'Organisation G', guide: 'Laura Martinez', date: 'Oct 29, 2024', time: '11:00-13:00', city: 'Ankara', phone: '537-148-7247', email: 'lauramartinez@gmail.com' },
  { id: '#123456796', event: 'Tour', name: 'High School H', guide: 'James Lee', date: 'Oct 30, 2024', time: '09:00-11:00', city: 'Istanbul', phone: '538-149-8248', email: 'jameslee@gmail.com' },
  { id: '#123456797', event: 'Fair', name: 'Organisation I', guide: 'Karen Thomas', date: 'Nov 1, 2024', time: '13:00-15:00', city: 'Izmir', phone: '539-150-9249', email: 'karenthomas@gmail.com' },
  { id: '#123456798', event: 'Tour', name: 'High School J', guide: 'Patricia Taylor', date: 'Nov 2, 2024', time: '14:30-16:30', city: 'Ankara', phone: '540-151-0250', email: 'patriciataylor@gmail.com' },
  { id: '#123456799', event: 'Tour', name: 'High School K', guide: 'David White', date: 'Nov 3, 2024', time: '11:00-13:00', city: 'Istanbul', phone: '541-152-1251', email: 'davidwhite@gmail.com' },
  { id: '#123456800', event: 'Fair', name: 'Organisation L', guide: 'Susan Moore', date: 'Nov 4, 2024', time: '10:00-12:00', city: 'Izmir', phone: '542-153-2252', email: 'susanmoore@gmail.com' },
  { id: '#123456801', event: 'Tour', name: 'High School M', guide: 'Daniel Harris', date: 'Nov 5, 2024', time: '09:30-11:30', city: 'Ankara', phone: '543-154-3253', email: 'danielharris@gmail.com' },
  { id: '#123456802', event: 'Fair', name: 'Organisation N', guide: 'Jessica Clark', date: 'Nov 6, 2024', time: '12:30-14:30', city: 'Istanbul', phone: '544-155-4254', email: 'jessicaclark@gmail.com' },
  { id: '#123456803', event: 'Tour', name: 'High School O', guide: 'Matthew Lewis', date: 'Nov 7, 2024', time: '10:00-12:00', city: 'Izmir', phone: '545-156-5255', email: 'matthewlewis@gmail.com' },
];

const ToursAndFairsTable = ({ rows }) => {
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

  // Columns definition
  const columns = [
    { field: 'event', headerName: 'Event', width: 100 },
    { field: 'name', headerName: 'Institute Name', width: 180 },
    { field: 'guide', headerName: 'Guide', width: 150 },
    { field: 'date', headerName: 'Event Date', width: 120 },
    { field: 'time', headerName: 'Event Time', width: 120 },
    { field: 'city', headerName: 'City', width: 100 },
    {
      field: 'contact',
      headerName: 'Contact',
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
          rows={rows} // Use the dynamically passed rows
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

export default ToursAndFairsTable;