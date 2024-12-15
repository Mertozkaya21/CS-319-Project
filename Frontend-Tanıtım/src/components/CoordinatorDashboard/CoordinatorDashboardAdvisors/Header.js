import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './CoordinatorDashboardAdvisors.module.css';
import { FaBell, FaCog } from 'react-icons/fa';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { advisorRows } from './AdvisorTable'; // Import advisor data

const Header = ({ title, onSearchSelection }) => {
  const [sortOption, setSortOption] = useState('Date Updated');
  const [isPopupOpen, setPopupOpen] = useState(false); // State to control popup visibility

  // Transform advisorRows into a format suitable for Autocomplete
  const advisorOptions = advisorRows.map((advisor) => ({
    label: advisor.name, // Only the advisor name will be displayed
  }));

  // Open Confirmation Dialog
  const handleRemoveClick = () => {
    setPopupOpen(true);
  };

  // Close Confirmation Dialog
  const handleClosePopup = () => {
    setPopupOpen(false);
  };

  return (
    <div className={styles.header}>
      {/* Title Row */}
      <div className={styles.headerTopRow}>
        <h1 className={styles.headerTitle}>{title}</h1>
        <div className={styles.userSection}>
          {/* Notification Button */}
          <NavLink to="/coordinatordashboardnotifications" className={styles.iconButton}>
            <FaBell className={styles.notificationIcon} />
            <span className={styles.notificationDot}></span>
          </NavLink>

          {/* Settings Button */}
          <NavLink to="/coordinatordashboardsettings" className={styles.iconButton}>
            <FaCog />
          </NavLink>

          {/* User Info */}
          <div className={styles.userAvatar}>
            <div className={styles.avatarCircle}></div>
            <div className={styles.userInfoText}>
              <p className={styles.userName}>Nabila A.</p>
              <p className={styles.userRole}>Coordinator</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Action Buttons Row */}
      <div className={styles.headerBottomRow}>
        {/* Replace Search Bar with Autocomplete */}
        <Autocomplete
          disablePortal
          options={advisorOptions} // Advisor name options
          onChange={(event, value) => onSearchSelection(value)} // Handle selection
          sx={{
            width: 300,
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#8a0303', // Red outline
              },
              '&:hover fieldset': {
                borderColor: '#6c0101', // Darker red on hover
              },
              '&.Mui-focused fieldset': {
                borderColor: '#8a0303', // Red outline when focused
              },
              color: '#8a0303', // Ensures input text stays red
            },
            '& .MuiInputBase-input': {
              color: '#8a0303', // Set the text color of the input
            },
            '& .MuiInputLabel-root': {
              color: '#8a0303', // Red label color
            },
            '& .MuiInputLabel-root.Mui-focused': {
              color: '#6c0101', // Darker red when label is focused
            },
          }}
          renderInput={(params) => (
            <TextField {...params} label="Search Advisor" />
          )}
        />

        {/* Buttons */}
        <div className={styles.actionButtons}>
          <Button
            variant="outlined"
            startIcon={<DeleteIcon />}
            onClick={handleRemoveClick}
            sx={{
              color: '#8a0303',
              borderColor: '#8a0303',
              '&:hover': {
                backgroundColor: '#fbe8e8',
                borderColor: '#6c0101',
              },
            }}
          >
            Remove Selected
          </Button>

          {/* Add New Advisor Button */}
          <Button
            component={NavLink}
            to="/coordinatordashboardaddadvisor" // Route for Add New Advisor
            variant="contained" // Contained style
            startIcon={<AddIcon />}
            sx={{
              backgroundColor: '#8a0303', // Red background
              color: '#ffffff', // White text
              marginLeft: '10px', // Add spacing between buttons
              '&:hover': {
                backgroundColor: '#6c0101', // Darker red background on hover
              },
            }}
          >
            Add New Advisor
          </Button>
        </div>
      </div>
    {/* Confirmation Popup */}
    <Dialog open={isPopupOpen} onClose={handleClosePopup}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          Are you sure you want to delete the selected advisor(s)? You will not be able to access their data if you proceed.
        </DialogContent>
        <DialogActions>
          {/* No Button */}
          <Button
            onClick={handleClosePopup}
            variant="outlined"
            sx={{
              color: '#8a0303',
              borderColor: '#8a0303',
              '&:hover': { backgroundColor: '#fdeaea', borderColor: '#8a0303' },
            }} 
          >
            No
          </Button>

          {/* Yes Button */}
          <Button
            onClick={handleClosePopup} // Replace with deletion logic if needed
            variant="contained"
            sx={{
              backgroundColor: '#8a0303',
              color: '#ffffff',
              '&:hover': { backgroundColor: '#b10505' },
            }}
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Header;