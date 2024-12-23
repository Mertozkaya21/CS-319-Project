import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './AdvisorDashboardGuides.module.css';
import { FaBell, FaCog } from 'react-icons/fa';
import { guidesRows } from './GuidesTable'; // Import guide data
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

const Header = ({ title, onSearchSelection }) => {
  // Transform guidesRows into a format suitable for Autocomplete
  const guidesOptions = guidesRows.map((guide) => ({
    label: guide.name, // Display guide name
  }));

  return (
    <div className={styles.header}>
      {/* Title Row */}
      <div className={styles.headerTopRow}>
        <h1 className={styles.headerTitle}>{title}</h1>
        <div className={styles.userSection}>
          {/* Notification Button */}
          <NavLink to="/advisordashboardnotifications" className={styles.iconButton}>
            <FaBell className={styles.notificationIcon} />
            <span className={styles.notificationDot}></span>
          </NavLink>

          {/* Settings Button */}
          <NavLink to="/advisordashboardsettings" className={styles.iconButton}>
            <FaCog />
          </NavLink>

          {/* User Info */}
          <div className={styles.userAvatar}>
            <div className={styles.avatarCircle}></div>
            <div className={styles.userInfoText}>
              <p className={styles.userName}>Nabila A.</p>
              <p className={styles.userRole}>Advisor</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Action Buttons Row */}
      <div className={styles.headerBottomRow}>
        {/* Replace Search Bar with Autocomplete */}
        <Autocomplete
          disablePortal
          options={guidesOptions} // Guide name options
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
            <TextField {...params} label="Search Guide" />
          )}
        />
      </div>
    </div>
  );
};

export default Header;
