import React from 'react';
import { NavLink } from 'react-router-dom'; // Import NavLink for navigation
import styles from './GuideDashboardSettings.module.css';
import { FaBell } from 'react-icons/fa';

const Header = ({ title }) => {
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

          {/* User Avatar (Clickable for Profile Navigation) */}
          <NavLink to="/guidedashboardprofile" className={styles.userAvatar}>
            <div className={styles.avatarCircle}></div>
          </NavLink>

          {/* User Info (Static, Not Clickable) */}
          <div className={styles.userInfoText}>
            <p className={styles.userName}>Nabila A.</p>
            <p className={styles.userRole}>Guide</p>
          </div>
        </div>
      </div>

      {/* Search and Action Buttons Row */}
      <div className={styles.headerBottomRow}>
        <div className={styles.actions}>
          <div className={styles.dropdown}></div>
        </div>
      </div>
    </div>
  );
};

export default Header;