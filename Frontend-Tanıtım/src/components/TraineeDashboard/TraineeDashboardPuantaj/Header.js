import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './TraineeDashboardPuantaj.module.css';
import { FaBell, FaCog } from 'react-icons/fa';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import AddIcon from '@mui/icons-material/Add';

const Header = ({ title, onSearchSelection, events }) => {
  const [sortOption, setSortOption] = useState('Date Updated');

  // Transform events into options for Autocomplete
  const eventOptions = events?.map((event) => ({
    label: event.name,
    id: event.id
  })) || [];

  return (
    <div className={styles.header}>
      <div className={styles.headerTopRow}>
        <h1 className={styles.headerTitle}>{title}</h1>
        <div className={styles.userSection}>
          <NavLink to="/traineedashboardnotifications" className={styles.iconButton}>
            <FaBell className={styles.notificationIcon} />
            <span className={styles.notificationDot}></span>
          </NavLink>

          <NavLink to="/traineedashboardsettings" className={styles.iconButton}>
            <FaCog />
          </NavLink>

          <NavLink to="/traineedashboardprofile" className={styles.userAvatar}>
            <div className={styles.avatarCircle}></div>
          </NavLink>
          <div className={styles.userInfoText}>
            <p className={styles.userName}>Nabila A.</p>
            <p className={styles.userRole}>Trainee</p>
          </div>
        </div>
      </div>

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
            <TextField {...params} label="Search Task" />
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