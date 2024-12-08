import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './CoordinatorDashboardTrainees.module.css';
import { FaBell, FaCog } from 'react-icons/fa';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { traineesRows } from './TraineesTable'; // Import trainees data
import AddIcon from '@mui/icons-material/Add'; // Import plus icon

const Header = ({ title, onSearchSelection }) => {
  const [sortOption, setSortOption] = useState('Date Updated');

  // Transform traineesRows into a format suitable for Autocomplete
  const traineesOptions = traineesRows.map((school) => ({
    label: school.name, // Only the school name will be displayed
  }));

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
          options={traineesOptions} //  trainees name options
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
            <TextField {...params} label="Search Trainee" />
          )}
        />

        {/* Buttons */}
        <div className={styles.actionButtons}>
          <Button
            variant="outlined"
            startIcon={<DeleteIcon />}
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

          {/* Add New Trainee Button */}
          <Button
            component={NavLink}
            to="/coordinatordashboardaddtrainee" // Route for Add New Trainee
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
            Add New Trainee
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Header;