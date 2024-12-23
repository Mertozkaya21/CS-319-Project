import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './CoordinatorDashboardToursAndFairsViewAll.module.css';
import { FaBell, FaCog } from 'react-icons/fa';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { eventRows } from './ToursAndFairsTable'; // Import event data

const Header = ({ title, onSearchSelection, deleteSelectedEvents, rows }) => {
  const [sortOption, setSortOption] = useState('Date Updated');

  // Transform eventRows into a format suitable for Autocomplete
  const eventOptions = eventRows.map((school) => ({
    label: school.name, // Only the school name will be displayed
  }));

  const handleRemoveClick = () => {
    deleteSelectedEvents();
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
          <NavLink to="/coordinatordashboardprofile" className={styles.userAvatar}>
            <div className={styles.avatarCircle}></div>
            
          </NavLink>
          <div className={styles.userInfoText}>
              <p className={styles.userName}>Nabila A.</p>
              <p className={styles.userRole}>Coordinator</p>
            </div>
        </div>
      </div>

      {/* Search and Action Buttons Row */}
      <div className={styles.headerBottomRow}>
        {/* Replace Search Bar with Autocomplete */}
        <Autocomplete
          disablePortal
          options={eventOptions} // event name options
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
            <TextField {...params} label="Search Name" />
          )}
        />

        <Button
          variant="outlined"
          onClick={handleRemoveClick}
          startIcon={<DoDisturbIcon />}
          sx={{
            color: '#8a0303', // Red text
            borderColor: '#8a0303', // Red border
            '&:hover': {
              backgroundColor: '#fbe8e8', // Light red background on hover
              borderColor: '#6c0101', // Darker red border on hover
            },
          }}
        >
          Cancel Selected
        </Button>
      </div>
    </div>
  );
};

export default Header;