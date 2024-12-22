import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './AdvisorDashboardTourApplications.module.css';
import { FaBell, FaCog } from 'react-icons/fa';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

const Header = ({ title, onSearchSelection, applications }) => {
  const [sortOption, setSortOption] = useState('Date Updated');

  // Map the search options from the applications list
  const searchOptions = applications.map((app) => ({
    label: app.name,  // Only store name for label
    id: app.id        // Keep the id for filtering purposes
  }));

  return (
    <div className={styles.header}>
      <div className={styles.headerTopRow}>
        <h1 className={styles.headerTitle}>{title}</h1>
        <div className={styles.userSection}>
          <NavLink to="/advisordashboardnotifications" className={styles.iconButton}>
            <FaBell className={styles.notificationIcon} />
            <span className={styles.notificationDot}></span>
          </NavLink>

          <NavLink to="/advisordashboardsettings" className={styles.iconButton}>
            <FaCog />
          </NavLink>

          <div className={styles.userAvatar}>
            <div className={styles.avatarCircle}></div>
          </div>
          <div className={styles.userInfoText}>
            <p className={styles.userName}>Nabila A.</p>
            <p className={styles.userRole}>Advisor</p>
          </div>
        </div>
      </div>

      <div className={styles.headerBottomRow}>
        <Autocomplete
          disablePortal
          options={searchOptions}  // Filter options by name
          getOptionLabel={(option) => option.label}  // Set the label
          onChange={(event, value) => onSearchSelection(value ? value.label : '')}
          renderInput={(params) => (
            <TextField {...params} label="Search Applications" />
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
