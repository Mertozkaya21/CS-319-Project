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
/*export const highSchoolRows = [
  { id: 1, name: 'High School A', city: 'Ankara', counselorName: 'Jane Doe', dateUpdated: 'Oct 25, 2023', priority: 1, phone: '555-123-4561', email: 'jane.doe1@example.com' },
  { id: 2, name: 'High School B', city: 'Ankara', counselorName: 'Jane Doe', dateUpdated: 'Oct 25, 2023',  priority: 2, phone: '555-123-4562', email: 'jane.doe2@example.com' },
  { id: 3, name: 'High School C', city: 'Ankara', counselorName: 'Jane Doe', dateUpdated: 'Oct 25, 2023', priority: 3, phone: '555-123-4563', email: 'jane.doe3@example.com' },
  { id: 4, name: 'High School D', city: 'Istanbul', counselorName: 'John Doe', dateUpdated: 'Oct 26, 2023',  priority: 4, phone: '555-987-6541', email: 'john.doe1@example.com' },
  { id: 5, name: 'High School E', city: 'Istanbul', counselorName: 'John Doe', dateUpdated: 'Oct 26, 2023',  priority: 5, phone: '555-987-6542', email: 'john.doe2@example.com' },
  { id: 6, name: 'High School F', city: 'Izmir', counselorName: 'Jane Doe', dateUpdated: 'Oct 27, 2023',  priority: 6, phone: '555-654-3211', email: 'jane.doe4@example.com' },
  { id: 7, name: 'High School G', city: 'Ankara', counselorName: 'Jane Doe', dateUpdated: 'Oct 25, 2023', priority: 7, phone: '555-123-4567', email: 'jane.doe5@example.com' },
  { id: 8, name: 'High School H', city: 'Ankara', counselorName: 'Jane Doe', dateUpdated: 'Oct 25, 2023', priority: 8, phone: '555-123-4568', email: 'jane.doe6@example.com' },
  { id: 9, name: 'High School I', city: 'Ankara', counselorName: 'Jane Doe', dateUpdated: 'Oct 25, 2023', priority: 9, phone: '555-123-4569', email: 'jane.doe7@example.com' },
  { id: 10, name: 'High School J', city: 'Istanbul', counselorName: 'John Doe', dateUpdated: 'Oct 26, 2023',  priority: 10, phone: '555-987-6543', email: 'john.doe3@example.com' },
  { id: 11, name: 'High School K', city: 'Istanbul', counselorName: 'John Doe', dateUpdated: 'Oct 26, 2023', priority: 11, phone: '555-987-6544', email: 'john.doe4@example.com' },
  { id: 12, name: 'High School L', city: 'Izmir', counselorName: 'Jane Doe', dateUpdated: 'Oct 27, 2023',  priority: 12, phone: '555-654-3212', email: 'jane.doe8@example.com' },
];*/

const HighSchoolTable = ({ rows, setSelectedRows }) => {
  //const [highSchoolRows, setHighSchoolRows] = useState([]);
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

  const handleSelectionModelChange = (newSelectionModel) => {
    setSelectedRows(newSelectionModel);
    console.log("Selected Row IDs:", newSelectionModel); // Seçilen satır ID'lerini log'la
  };

  const columns = [
    { field: 'name', headerName: 'High School Name', width: 200 },
    { field: 'id', headerName: 'School ID', width: 80 },
    { field: 'dateUpDated', headerName: 'Date Updated', width: 110 },
    { field: 'city', headerName: 'City', width: 80 },
    { field: 'counselorName', headerName: 'Counselor Name', width: 130},
    {
      field: 'counselorContact',
      headerName: 'Counselor Contact',
      width: 140,
      renderCell: (params) => {
        const counselor = params.row.counselor || {};
        return (
          <div className={styles.contactButtons}>
            <IconButton onClick={() => handleContactClick('phone', counselor)}>
              <FaPhoneAlt className={styles.contactIcon} />
            </IconButton>
            <IconButton onClick={() => handleContactClick('email', counselor)}>
              <FaEnvelope className={styles.contactIcon} />
            </IconButton>
          </div>
        );
      },
    },
    {
      field: 'action',
      headerName: 'Edit',
      width: 60,
      renderCell: (params) => {
        return (
          <NavLink
            to={`/coordinatordashboardedithighschool/${params.row.id}`} // Dynamically pass ID
            className={({ isActive }) =>
              `${styles.navItem} ${isActive ? styles.active : ''}`
            }
          >
            <IconButton aria-label="edit">
              <EditIcon />
            </IconButton>
          </NavLink>
        );
      },
    }
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
          onRowSelectionModelChange={(newSelectionModel) => {
            console.log("Row Selection Changed:", newSelectionModel);
            setSelectedRows(newSelectionModel);
          }} 
          sx={{
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: '#f7f7f7',
              fontWeight: 'bold',
              color: '#8a0303',
            },
            '& .MuiDataGrid-columnHeaderTitle': {
              textAlign: 'center', // Centers text within column headers
              width: '100%',       // Ensures full width for alignment
            },
            '& .MuiDataGrid-columnHeader': {
              display: 'flex',
              justifyContent: 'center', // Centers content horizontally
              alignItems: 'center',     // Centers content vertically
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