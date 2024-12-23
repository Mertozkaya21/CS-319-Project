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
import { NavLink } from 'react-router-dom'; // Added for navigation
import styles from './CoordinatorDashboardProfileManageCoordinators.module.css';
 
// Data: Adapted from CoordinatorTable dummy data
export const coordinatorRows = [
  { id: 1, name: 'Samanta William', dateAdded: 'Oct 25, 2023', phoneNo: '555-123-4561', email: 'samanta.william@example.com', profilePic: 'https://via.placeholder.com/40' },
  { id: 2, name: 'Tony Soap', dateAdded: 'Oct 25, 2023', phoneNo: '555-123-4562', email: 'tony.soap@example.com', profilePic: 'https://via.placeholder.com/40'  },
  { id: 3, name: 'Karen Hope', dateAdded: 'Oct 25, 2023', phoneNo: '555-123-4563', email: 'karen.hope@example.com', profilePic: 'https://via.placeholder.com/40'  },
  { id: 4, name: 'Jordan Nico', dateAdded: 'Oct 26, 2023',  phoneNo: '555-987-6541', email: 'jordan.nico@example.com', profilePic: 'https://via.placeholder.com/40'  },
  { id: 5, name: 'Nadila Adja', dateAdded: 'Oct 26, 2023',  phoneNo: '555-987-6542', email: 'nadila.adja@example.com', profilePic: 'https://via.placeholder.com/40'  },
  { id: 6, name: 'Johnny Ahmad', dateAdded: 'Oct 27, 2023', phoneNo: '555-654-3211', email: 'johnny.ahmad@example.com', profilePic: 'https://via.placeholder.com/40'  },
];

// Table Columns
const columns = [
  { field: 'name', headerName: 'Coordinator Name', width: 200 },
  { field: 'id', headerName: 'Coordinator ID', width: 200 },
  { field: 'dateAdded', headerName: 'Date Added', width: 200 },
  {
    field: 'contact',
    headerName: 'Contact',
    width: 100,
    renderCell: (params) => (
      <div className={styles.contactButtons}>
        <IconButton onClick={() => params.row.handleContactClick('phoneNo', params.row)}>
          <FaPhoneAlt className={styles.contactIcon} />
        </IconButton>
        <IconButton onClick={() => params.row.handleContactClick('email', params.row)}>
          <FaEnvelope className={styles.contactIcon} />
        </IconButton>
      </div>
    ),
  },
];

const CoordinatorsTable = ({ rows ,setSelectedRows }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogContent, setDialogContent] = useState('');

  // Handle contact click (phone/email)
  const handleContactClick = (type, row) => {
    const content =
      type === 'phoneNo'
        ? `Phone: ${row.phoneNo}`
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
          onRowSelectionModelChange={(newSelectionModel) => {
            console.log("Row Selection Changed:", newSelectionModel);
            setSelectedRows(newSelectionModel);
          }}
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

export default CoordinatorsTable;