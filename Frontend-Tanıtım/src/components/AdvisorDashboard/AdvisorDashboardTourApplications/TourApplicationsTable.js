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
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import EditIcon from '@mui/icons-material/Edit';
import { NavLink } from 'react-router-dom';
import styles from './AdvisorDashboardTourApplications.module.css';  // Correct path for the Advisor Dashboard CSS


// Example of data, use the actual data from backend in your case
export const tourApplicationsRows = [
  { 
    id: 1, 
    name: 'High School A', 
    priority: 1, 
    date: 'Dec 20, 2023', 
    time: '11:00 - 13:00', 
    city: 'Ankara', 
    phone: '555-123-4561', 
    email: 'jane.doe1@example.com', 
    distance: '5 km', 
    lgsPercentile: 85, 
    numberOfAttendees: 100,
    comments: 'Looking forward to the tour and meeting the students.'
  },
  { 
    id: 2, 
    name: 'High School B', 
    priority: 2, 
    date: 'Dec 21, 2023', 
    time: '09:00 - 11:00', 
    city: 'Ankara', 
    phone: '555-123-4562', 
    email: 'jane.doe2@example.com', 
    distance: '8 km', 
    lgsPercentile: 88, 
    numberOfAttendees: 100,
    comments: 'Please share parking instructions.'
  },
  { 
    id: 3, 
    name: 'High School C', 
    priority: 3, 
    date: 'Dec 22, 2023', 
    time: '11:00 - 13:00', 
    city: 'Istanbul', 
    phone: '555-123-4563', 
    email: 'jane.doe3@example.com', 
    distance: '15 km', 
    lgsPercentile: 90, 
    numberOfAttendees: 100,
    comments: 'We have some questions about campus facilities.'
  },
  { 
    id: 4, 
    name: 'High School D', 
    priority: 4, 
    date: 'Dec 23, 2023', 
    time: '11:00 - 13:00', 
    city: 'Izmir', 
    phone: '555-987-6541', 
    email: 'john.doe1@example.com', 
    distance: '20 km', 
    lgsPercentile: 92, 
    numberOfAttendees: 100,
    comments: 'Are refreshments provided during the tour?'
  },
];

const TourApplicationsTable = ({ rows, setSelectedRows, fetchTourRows }) => {
  const [formData, setFormData] = useState({ newParameter: "" });
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogContent, setDialogContent] = useState('');
  const [decisions, setDecisions] = useState({}); // Store decisions for each row
  const [selectedColumn, setSelectedColumn] = useState(); // State for dropdown selection

  const handleColumnChange = async (event) => {
    const newValue = event.target.value;
    setFormData((prevData) => ({ ...prevData, newParameter: newValue })); // Update selected column type
    setSelectedColumn(newValue); 
    console.log(formData);

    try {
      const response = await fetch(`http://localhost:8080/v1/groupform/changeparameter/${selectedColumn}`, {
        method: 'POST',
      });

      if (response.ok) {
        console.log('Backend updated successfully:', response.data);
        alert('Applications are sorted by new parameter!');
        fetchTourRows();
      } else {
        console.error('Unexpected response status:', response.status);
        alert('Unexpected error while updating column.');
      }
    } catch (error) {
      console.error('Error updating column:', error);
      alert('Failed to update column. Please try again later.');
    }
  };

  const handleContactClick = (type, row) => {
    const content =
      type === 'phoneNumber'
        ? `Phone: ${row.phoneNumber}`
        : `Email: ${row.email}`;
    setDialogContent(content);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleDecisionChange = (decision, id) => {
    if (decision) { // Prevents deselecting both options
      setDecisions((prevDecisions) => ({
        ...prevDecisions,
        [id]: decision,
      }));
    }
  };

  const handleResetDecision = (id) => {
    setDecisions((prevDecisions) => ({
      ...prevDecisions,
      [id]: null, // Reset the decision for the specified row
    }));
  };

  // Columns
  const columns = [
    { field: 'name', headerName: 'High School Name', width: 150 },
    {
      field: 'newParameter',
      headerName: (
        <div>
          <Select
            value={selectedColumn}
            onChange={handleColumnChange}
            displayEmpty
            sx={{
              fontSize: '14px',
              color: '#8a0303',
              fontWeight: 'bold',
            }}
          >
            <MenuItem value="byPriorityScore">By Priority Score</MenuItem>
            <MenuItem value="byDistance">By Distance</MenuItem>
            <MenuItem value="byLgsPercentile">By LGS Percentile</MenuItem>
            <MenuItem value="bySubmitTime">By Submit Time</MenuItem>
          </Select>
        </div>
      ),
      width: selectedColumn === 'byPriorityScore' ? 185 : selectedColumn === 'byDistance' ? 195 : 235, // Dynamic width for different columns
      renderCell: (params) => <div>{params.row.newParameter}</div>,
    },
    { field: 'eventDate', headerName: 'Tour Date', width: 110 },
    { field: 'tourHour', headerName: 'Tour Time', width: 100 },
    { field: 'city', headerName: 'City', width: 70 },
    { field: 'numberOfAttendees', headerName: 'Count', width: 60 },
    {
      field: 'contact',
      headerName: 'Contact',
      width: 80,
      renderCell: (params) => (
        <div className={styles.contactButtons}>
          <IconButton onClick={() => params.row.handleContactClick('phoneNumber', params.row)}>
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
            value="BTO_APPROVED"
            sx={{
              color: params.row.decision === 'BTO_APPROVED' ? '#fff' : 'grey', // White when selected
              backgroundColor: params.row.decision === 'BTO_APPROVED' ? 'green' : '#e0e0e0', // Green when selected
              '&:hover': {
                backgroundColor: params.row.decision === 'BTO_APPROVED' ? 'rgba(0, 128, 0, 0.8)' : '#d5d5d5',
                color: params.row.decision === 'BTO_APPROVED' ? '#fff' : 'grey',
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
            value="BTO_DENIED"
            sx={{
              color: params.row.decision === 'BTO_DENIED' ? '#fff' : 'grey', // White when selected
              backgroundColor: params.row.decision === 'BTO_DENIED' ? 'red' : '#e0e0e0', // Red when selected
              '&:hover': {
                backgroundColor: params.row.decision === 'BTO_DENIED' ? 'rgba(255, 0, 0, 0.8)' : '#d5d5d5',
                color: params.row.decision === 'BTO_DENIED' ? '#fff' : 'grey',
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
      width: 55,
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
    {
      field: 'action',
      headerName: 'Edit',
      width: 40,
      renderCell: (params) => {
        return (
          <NavLink
            to={`/coordinatordashboardedithighschoolapplication/${params.row.id}`} // Dynamically pass ID
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
    },
  ];

  // Add handlers to rows
  const rowsWithHandlers = rows.map((row) => ({
    ...row,
    handleContactClick,
    handleDecisionChange,
    handleResetDecision,
    decision: decisions[row.id] || null,
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
          getRowId={(row) => row.id} // Use the unique id from data
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

export default TourApplicationsTable;
