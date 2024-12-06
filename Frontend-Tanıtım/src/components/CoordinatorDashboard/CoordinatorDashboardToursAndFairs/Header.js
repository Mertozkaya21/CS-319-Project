import React from 'react';
import styles from './CoordinatorDashboardToursAndFairs.module.css';
import { FaBell, FaCog } from 'react-icons/fa';

const Header = ({ title }) => {

  return (
    <div className={styles.header}>
      {/* Title Row */}
      <div className={styles.headerTopRow}>
        <h1 className={styles.headerTitle}>{title}</h1>
        <div className={styles.userSection}>
          <button className={styles.iconButton}>
            <FaBell className={styles.notificationIcon} />
            <span className={styles.notificationDot}></span>
          </button>
          <button className={styles.iconButton}>
            <FaCog />
          </button>
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

        <div className={styles.actions}>
          <div className={styles.dropdown}>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;