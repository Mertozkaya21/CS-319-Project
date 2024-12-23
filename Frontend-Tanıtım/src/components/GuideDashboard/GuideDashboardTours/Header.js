import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './GuideDashboardTours.module.css';
import { FaBell, FaCog } from 'react-icons/fa';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import AddIcon from '@mui/icons-material/Add';

const Header = ({ title, onSearchSelection, tours }) => {
  const [sortOption, setSortOption] = useState('Date Updated');

  // Transform tours data into options for Autocomplete
  const tourOptions = tours.map((tour) => ({
    label: tour.name || 'Unnamed Tour', // Fallback if name is undefined
  }));

  return (
    <div className={styles.header}>
      {/* Title Row */}
      <div className={styles.headerTopRow}>
        <h1 className={styles.headerTitle}>{title}</h1>
        <div className={styles.userSection}>
          {/* Notification Button */}
          <NavLink to="/guidedashboardnotifications" className={styles.iconButton}>
            <FaBell className={styles.notificationIcon} />
            <span className={styles.notificationDot}></span>
          </NavLink>

          {/* Settings Button */}
          <NavLink to="/guidedashboardsettings" className={styles.iconButton}>
            <FaCog />
          </NavLink>

          {/* User Info */}
          <NavLink to="/guidedashboardprofile" className={styles.userAvatar}>
            <div className={styles.avatarCircle}></div>
          </NavLink>
          <div className={styles.userInfoText}>
            <p className={styles.userName}>Nabila A.</p>
            <p className={styles.userRole}>Guide</p>
          </div>
        </div>
      </div>

      {/* Search and Action Buttons Row */}
      <div className={styles.headerBottomRow}>
        {/* Replace Search Bar with Autocomplete */}
        <Autocomplete
          disablePortal
          options={tourOptions}
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
            <TextField {...params} label="Search High School" />
          )}
        />

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{
            backgroundColor: '#8a0303',
            color: '#ffffff',
            marginLeft: '10px',
            '&:hover': {
              backgroundColor: '#6c0101',
            },
          }}
        >
          Confirm Changes
        </Button>
      </div>
    </div>
  );
};

export default Header;