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
import styles from './GuideDashboardTours.module.css';
import Checkbox from '@mui/material/Checkbox';

// Data from provided input
export const eventRows = [
  { id: '#123456789', name: 'High School A', guide: 'Jane Doe', date: 'Oct 23, 2024', time: '11:00-13:00', city: 'Ankara', phone: '531-142-1241', email: 'janedoe@gmail.com' , numberOfGuidesNeeded: 2, numberOfGuidesAssigned: 1},
  { id: '#123456791', name: 'High School C', guide: 'Emily Davis', date: 'Oct 25, 2024', time: '09:00-11:00', city: 'Izmir', phone: '533-144-3243', email: 'emilydavis@gmail.com', numberOfGuidesNeeded: 2, numberOfGuidesAssigned: 1},
  { id: '#123456792', name: 'High School D', guide: 'Michael Brown', date: 'Oct 26, 2024', time: '13:30-15:30', city: 'Ankara', phone: '534-145-4244', email: 'michaelbrown@gmail.com', numberOfGuidesNeeded: 2, numberOfGuidesAssigned: 2},
  { id: '#123456794', name: 'High School F', guide: 'Robert Johnson', date: 'Oct 28, 2024', time: '10:30-12:30', city: 'Izmir', phone: '536-147-6246', email: 'robertjohnson@gmail.com' , numberOfGuidesNeeded: 2, numberOfGuidesAssigned: 1},
  { id: '#123456796', name: 'High School H', guide: 'James Lee', date: 'Oct 30, 2024', time: '09:00-11:00', city: 'Istanbul', phone: '538-149-8248', email: 'jameslee@gmail.com', numberOfGuidesNeeded: 2, numberOfGuidesAssigned: 2 },
  { id: '#123456798', name: 'High School J', guide: 'Patricia Taylor', date: 'Nov 2, 2024', time: '14:30-16:30', city: 'Ankara', phone: '540-151-0250', email: 'patriciataylor@gmail.com', numberOfGuidesNeeded: 2, numberOfGuidesAssigned: 1 },
  { id: '#123456799', name: 'High School K', guide: 'David White', date: 'Nov 3, 2024', time: '11:00-13:00', city: 'Istanbul', phone: '541-152-1251', email: 'davidwhite@gmail.com', numberOfGuidesNeeded: 2, numberOfGuidesAssigned: 1 },
  { id: '#123456801', name: 'High School M', guide: 'Daniel Harris', date: 'Nov 5, 2024', time: '09:30-11:30', city: 'Ankara', phone: '543-154-3253', email: 'danielharris@gmail.com' , numberOfGuidesNeeded: 2, numberOfGuidesAssigned: 2},
  { id: '#123456803', name: 'High School O', guide: 'Matthew Lewis', date: 'Nov 7, 2024', time: '10:00-12:00', city: 'Izmir', phone: '545-156-5255', email: 'matthewlewis@gmail.com', numberOfGuidesNeeded: 2, numberOfGuidesAssigned: 1 },
];

const ToursTable = ({ rows }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogContent, setDialogContent] = useState('');
  const [data, setData] = useState(rows); // Local state for dynamic updates

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

  const handleClaimChange = (rowId, checked) => {
    setData((prevData) =>
      prevData.map((row) =>
        row.id === rowId && row.numberOfGuidesAssigned < row.numberOfGuidesNeeded
          ? { ...row, numberOfGuidesAssigned: row.numberOfGuidesAssigned + (checked ? 1 : -1) }
          : row
      )
    );
  };
  
  const columns = [
    { field: 'name', headerName: 'High School Name', width: 150 },
    { field: 'numberOfGuidesAssigned', headerName: 'Guides Assigned', width: 130 },
    { field: 'numberOfGuidesNeeded', headerName: 'Guides Needed', width: 130 },
    { field: 'date', headerName: 'Event Date', width: 120 },
    { field: 'time', headerName: 'Event Time', width: 100 },
    { field: 'city', headerName: 'City', width: 90 },
    {
      field: 'contact',
      headerName: 'Contact',
      width: 100,
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
      field: 'claim',
      headerName: 'Claim Tour',
      width: 90,
      renderCell: (params) => {
        const isDisabled = params.row.numberOfGuidesAssigned >= params.row.numberOfGuidesNeeded;

        return (
          <Checkbox
            disabled={isDisabled}
            checked={params.row.numberOfGuidesAssigned >= params.row.numberOfGuidesNeeded}
            onChange={(event) => handleClaimChange(params.row.id, event.target.checked)}
            sx={{
              color: isDisabled ? '#ccc' : '#8a0303',
            }}
          />
        );
      },
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

export default ToursTable;