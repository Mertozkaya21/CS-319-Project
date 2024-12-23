import React from 'react';
import styles from './CoordinatorDashboardProfile.module.css';
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

      {/* Profile Info */}
      <div className={styles.profileContainer}>
        <div className={styles.profileDetails}>
          <h2 className={styles.profileName}>Nabila Azalea</h2>
          <p className={styles.profileRole}>Coordinator</p>
          <p className={styles.profileLocation}>📍 Ankara, Turkey</p>
          <div className={styles.profileContact}>
            <p>📞 +90 345 6789 0</p>
            <p>✉️ nabila@mail.com</p>
          </div>
        </div>

        
      </div>
    </div>
  );
};

export default Header;