import React from 'react';
import { NavLink } from 'react-router-dom'; // Import NavLink for navigation
import styles from './CoordinatorDashboardProfileAddCoordinator.module.css';
import { FaBell, FaCog } from 'react-icons/fa';

const Header = ({ title }) => {
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

          {/* User Avatar (Clickable for Profile Navigation) */}
          <NavLink to="/coordinatordashboardprofile" className={styles.userAvatar}>
            <div className={styles.avatarCircle}></div>
          </NavLink>

          {/* User Info (Static, Not Clickable) */}
          <div className={styles.userInfoText}>
            <p className={styles.userName}>Nabila A.</p>
            <p className={styles.userRole}>Coordinator</p>
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