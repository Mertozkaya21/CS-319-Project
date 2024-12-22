import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './AdvisorDashboardPuantaj.module.css';
import { FaBell, FaCog } from 'react-icons/fa';
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import AddIcon from '@mui/icons-material/Add';

const Header = ({ title, onSearchSelection, trainees }) => {
  const [sortOption, setSortOption] = useState('Date Updated');

  // Transform trainee data for Autocomplete while keeping existing structure
  const eventOptions = trainees.map((trainee) => ({
    label: `${trainee.firstName} ${trainee.lastName}`,
    id: trainee.id
  }));

  return (
    <div className={styles.header}>
      {/* Title Row */}
      <div className={styles.headerTopRow}>
        <h1 className={styles.headerTitle}>{title}</h1>
        <div className={styles.userSection}>
          {/* Keep existing notification, settings, and user sections */}
          <NavLink to="/advisordashboardnotifications" className={styles.iconButton}>
            <FaBell className={styles.notificationIcon} />
            <span className={styles.notificationDot}></span>
          </NavLink>

          <NavLink to="/advisordashboardsettings" className={styles.iconButton}>
            <FaCog />
          </NavLink>

          <NavLink to="/advisordashboardprofile" className={styles.userAvatar}>
            <div className={styles.avatarCircle}></div>
          </NavLink>
          <div className={styles.userInfoText}>
            <p className={styles.userName}>Nabila A.</p>
            <p className={styles.userRole}>Advisor</p>
          </div>
        </div>
      </div>

      {/* Search and Action Buttons Row */}
      <div className={styles.headerBottomRow}>
        <Autocomplete
          disablePortal
          options={eventOptions}
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
            <TextField {...params} label="Search Trainee" />
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