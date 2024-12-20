import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './CoordinatorDashboardHighSchool.module.css';
import { FaBell, FaCog } from 'react-icons/fa';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
//import { getHighSchoolData } from './DashboardHighSchool'; // Import high school data

const Header = ({ title, onSearchSelection , deleteSelectedHighschools, rows}) => {
  const [isPopupOpen, setPopupOpen] = useState(false); // State to control the popup
  const [sortOption, setSortOption] = useState('Date Updated');

  // Transform highSchoolRows into a format suitable for Autocomplete
  const highSchoolOptions = rows.map((school) => ({
    label: school.name, // Only the school name will be displayed
  }));

  const handleRemoveClick = () => {
    setPopupOpen(true);
  };

  const handleDeletions = () => {
    deleteSelectedHighschools();
    setPopupOpen(false);
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
          options={highSchoolOptions} // High school name options
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
            <TextField {...params} label="Search High School" />
          )}
        />

        <Button
          variant="outlined"
          startIcon={<DeleteIcon />}
          onClick={handleRemoveClick} // Open confirmation popup
          sx={{
            color: '#8a0303', // Red text
            borderColor: '#8a0303', // Red border
            '&:hover': {
              backgroundColor: '#fbe8e8', // Light red background on hover
              borderColor: '#6c0101', // Darker red border on hover
            },
          }}
        >
          Remove Selected
        </Button>
      </div>
      {/* Confirmation Popup */}
      <Dialog open={isPopupOpen} onClose={handleClosePopup}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          Are you sure you want to delete the selected high school(s)? You will not be able to access their data if you proceed.
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClosePopup}
            variant="outlined"
            sx={{
              color: '#8a0303',
              borderColor: '#8a0303',
              '&:hover': {
                backgroundColor: '#fdeaea',
                borderColor: '#8a0303',
              },
            }}
          >
            No
          </Button>
          <Button
            onClick = {handleDeletions}
            variant="contained"
            sx={{
              backgroundColor: '#8a0303',
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