
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
import styles from './GuideDashboardFairs.module.css';
import Checkbox from '@mui/material/Checkbox';

// Data from provided input
export const eventRows = [
  { id: '#123456793', name: 'Organisation E', guide: 'Sarah Wilson', date: 'Oct 27, 2024', time: '14:00-16:00', city: 'Istanbul', phone: '535-146-5245', email: 'sarahwilson@gmail.com', numberOfGuidesNeeded: 2, numberOfGuidesAssigned: 1 },
  { id: '#123456795', name: 'Organisation G', guide: 'Laura Martinez', date: 'Oct 29, 2024', time: '11:00-13:00', city: 'Ankara', phone: '537-148-7247', email: 'lauramartinez@gmail.com', numberOfGuidesNeeded: 2, numberOfGuidesAssigned: 2 },
  { id: '#123456797', name: 'Organisation I', guide: 'Karen Thomas', date: 'Nov 1, 2024', time: '13:00-15:00', city: 'Izmir', phone: '539-150-9249', email: 'karenthomas@gmail.com', numberOfGuidesNeeded: 2, numberOfGuidesAssigned: 1 },
  { id: '#123456800', name: 'Organisation L', guide: 'Susan Moore', date: 'Nov 4, 2024', time: '10:00-12:00', city: 'Izmir', phone: '542-153-2252', email: 'susanmoore@gmail.com', numberOfGuidesNeeded: 2, numberOfGuidesAssigned: 1 },
  { id: '#123456802', name: 'Organisation N', guide: 'Jessica Clark', date: 'Nov 6, 2024', time: '12:30-14:30', city: 'Istanbul', phone: '544-155-4254', email: 'jessicaclark@gmail.com', numberOfGuidesNeeded: 2, numberOfGuidesAssigned: 1 },
  { id: '#123456801', name: 'Organisation M', guide: 'Daniel Harris', date: 'Nov 5, 2024', time: '09:30-11:30', city: 'Ankara', phone: '543-154-3253', email: 'danielharris@gmail.com', numberOfGuidesNeeded: 2, numberOfGuidesAssigned: 2 },
  { id: '#123456803', name: 'Organisation O', guide: 'Matthew Lewis', date: 'Nov 7, 2024', time: '10:00-12:00', city: 'Izmir', phone: '545-156-5255', email: 'matthewlewis@gmail.com', numberOfGuidesNeeded: 2, numberOfGuidesAssigned: 1 },
];

const FairsTable = ({ rows }) => {
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

  // Toggle Apply state
  const handleApplyChange = (rowId) => {
    setData((prevData) =>
      prevData.map((row) =>
        row.id === rowId
          ? { ...row, numberOfGuidesAssigned: row.numberOfGuidesAssigned + (row.applied ? -1 : 1), applied: !row.applied }
          : row
      )
    );
  };
  
  // Columns definition
  const columns = [
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
    {
      field: 'apply',
      headerName: 'Apply',
      width: 100,
      renderCell: (params) => {
        const isFull = params.row.numberOfGuidesAssigned >= params.row.numberOfGuidesNeeded;

        return (
          <Checkbox
            disabled={isFull}
            checked={!!params.row.applied || isFull} // Marked as applied or greyed out
            onChange={() => handleApplyChange(params.row.id)}
            sx={{
              color: isFull ? '#ccc' : '#8a0303',
              '&.Mui-checked': {
                color: isFull ? '#ccc' : '#8a0303',
              },
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
          rows={data} // Use the updated local state
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

export default FairsTable;