import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './AdvisorDashboardGuides.module.css';
import { FaBell, FaCog } from 'react-icons/fa';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { guidesRows } from './GuidesTable'; // Import guide data
import AddIcon from '@mui/icons-material/Add'; // Import plus icon

const Header = ({ title, onSearchSelection, guides }) => {
  const [sortOption, setSortOption] = useState('Date Updated');

  // Transform guides into options for Autocomplete
  const guidesOptions = guides?.map((guide) => ({
    label: guide.name,
  })) || [];

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
          options={guidesOptions}
          onChange={(event, value) => onSearchSelection(value)}
          sx={{
            width: 300,
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#8a0303',
              },
              '&:hover fieldset': {
                borderColor: '#6c0101',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#8a0303',
              },
              color: '#8a0303',
            },
            '& .MuiInputBase-input': {
              color: '#8a0303',
            },
            '& .MuiInputLabel-root': {
              color: '#8a0303',
            },
            '& .MuiInputLabel-root.Mui-focused': {
              color: '#6c0101',
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