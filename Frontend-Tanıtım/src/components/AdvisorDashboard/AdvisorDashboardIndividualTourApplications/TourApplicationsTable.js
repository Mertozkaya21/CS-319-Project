import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { FaPhoneAlt, FaEnvelope, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import IconButton from '@mui/material/IconButton';
import Radio from '@mui/material/Radio';
import RestartAltIcon from '@mui/icons-material/RestartAlt'; // Reset icon
import styles from './AdvisorDashboardTourApplications.module.css';
import Collapse from '@mui/material/Collapse';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';

// Dummy Data. replace with data from database
export const tourApplicationsRows = [
  {
    id: 1,
    name: 'John Smith',
    email: 'john.smith@example.com',
    phone: '555-123-4561',
    city: 'New York',
    date: '2024-01-15',
    timeSlot: '10:00 - 12:00',
    departmentOfInterest: 'Computer Science',
    numberOfAttendees: 3,
    comments: 'Looking forward to the tour.',
  },
  {
    id: 2,
    name: 'Emily Johnson',
    email: 'emily.johnson@example.com',
    phone: '555-123-4562',
    city: 'Los Angeles',
    date: '2024-01-20',
    timeSlot: '14:00 - 16:00',
    departmentOfInterest: 'Business Administration',
    numberOfAttendees: 2,
    comments: 'Please provide parking information.',
  },
  {
    id: 3,
    name: 'Michael Williams',
    email: 'michael.williams@example.com',
    phone: '555-123-4563',
    city: 'Chicago',
    date: '2024-01-25',
    timeSlot: '09:00 - 11:00',
    departmentOfInterest: 'Engineering',
    numberOfAttendees: 4,
    comments: 'Interested in meeting faculty.',
  },
  {
    id: 4,
    name: 'Sophia Brown',
    email: 'sophia.brown@example.com',
    phone: '555-123-4564',
    city: 'Houston',
    date: '2024-02-01',
    timeSlot: '11:00 - 13:00',
    departmentOfInterest: 'Architecture',
    numberOfAttendees: 1,
    comments: 'Please confirm availability.',
  },
  {
    id: 5,
    name: 'James Davis',
    email: 'james.davis@example.com',
    phone: '555-123-4565',
    city: 'Phoenix',
    date: '2024-02-05',
    timeSlot: '15:00 - 17:00',
    departmentOfInterest: 'Law',
    numberOfAttendees: 2,
    comments: 'Will the library be open?',
  },
  {
    id: 6,
    name: 'Olivia Miller',
    email: 'olivia.miller@example.com',
    phone: '555-123-4566',
    city: 'Philadelphia',
    date: '2024-02-10',
    timeSlot: '13:00 - 15:00',
    departmentOfInterest: 'Medicine',
    numberOfAttendees: 3,
    comments: 'Are refreshments provided?',
  },
  {
    id: 7,
    name: 'William Garcia',
    email: 'william.garcia@example.com',
    phone: '555-123-4567',
    city: 'San Antonio',
    date: '2024-02-15',
    timeSlot: '08:00 - 10:00',
    departmentOfInterest: 'Psychology',
    numberOfAttendees: 4,
    comments: 'Do we need prior registration?',
  },
  {
    id: 8,
    name: 'Mia Martinez',
    email: 'mia.martinez@example.com',
    phone: '555-123-4568',
    city: 'San Diego',
    date: '2024-02-20',
    timeSlot: '12:00 - 14:00',
    departmentOfInterest: 'Art and Design',
    numberOfAttendees: 1,
    comments: 'Excited to visit!',
  },
  {
    id: 9,
    name: 'Alexander Wilson',
    email: 'alexander.wilson@example.com',
    phone: '555-123-4569',
    city: 'Dallas',
    date: '2024-02-25',
    timeSlot: '10:00 - 12:00',
    departmentOfInterest: 'Education',
    numberOfAttendees: 5,
    comments: 'Are there group discounts?',
  },
  {
    id: 10,
    name: 'Charlotte Anderson',
    email: 'charlotte.anderson@example.com',
    phone: '555-123-4570',
    city: 'San Jose',
    date: '2024-03-01',
    timeSlot: '16:00 - 18:00',
    departmentOfInterest: 'Environmental Science',
    numberOfAttendees: 2,
    comments: 'Interested in campus sustainability programs.',
  },
];

const TourApplicationsTable = ({ rows }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogContent, setDialogContent] = useState('');
  const [decisions, setDecisions] = useState({}); // Store decisions for each row
  const [expandedRow, setExpandedRow] = useState(null);

  // Toggle row expansion
  const toggleRowExpansion = (id) => {
    setExpandedRow((prev) => (prev === id ? null : id));
  };

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

  const handleDecisionChange = (decision, id) => {
    setDecisions((prevDecisions) => ({
      ...prevDecisions,
      [id]: decision,
    }));
  };

  const handleResetDecision = (id) => {
    setDecisions((prevDecisions) => ({
      ...prevDecisions,
      [id]: null, // Reset the decision for the specified row
    }));
  };

// Columns
const columns = [
  { field: 'name', headerName: 'Student Name', width: 130 },
  { field: 'date', headerName: 'Tour Date', width: 90 },
  { field: 'timeSlot', headerName: 'Tour Time', width: 100 },
  { field: 'city', headerName: 'City', width: 100 },
  { field: 'departmentOfInterest', headerName: 'Department of Interest', width: 160 },
  { field: 'numberOfAttendees', headerName: 'Attendees', width: 85 },
  {
    field: 'contact',
    headerName: 'Contact',
    width: 70,
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
    field: 'decision',
    headerName: 'Accept / Reject',
    width: 120,
    renderCell: (params) => (
      <div>
        <Radio
          checked={params.row.decision === 'accept'}
          onChange={() => params.row.handleDecisionChange('accept', params.row.id)}
          value="accept"
          name={`decision-${params.row.id}`}
          inputProps={{ 'aria-label': 'Accept' }}
          sx={{
            color: '#8a0303',
            '&.Mui-checked': {
              color: '#6c0101',
            },
          }}
        />
        <Radio
          checked={params.row.decision === 'reject'}
          onChange={() => params.row.handleDecisionChange('reject', params.row.id)}
          value="reject"
          name={`decision-${params.row.id}`}
          inputProps={{ 'aria-label': 'Reject' }}
          sx={{
            color: '#8a0303',
            '&.Mui-checked': {
              color: '#6c0101',
            },
          }}
        />
      </div>
    ),
  },
  {
    field: 'reset',
    headerName: 'Reset',
    width: 60,
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
];
  // Map rows and add handlers to each row
  const rowsWithHandlers = rows.map((row) => ({
    ...row,
    handleContactClick, // Add the handler for contact
    handleDecisionChange, // Add the handler for decision change
    handleResetDecision, // Add the handler for reset
    decision: decisions[row.id] || null, // Attach decision state
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

export default TourApplicationsTable;