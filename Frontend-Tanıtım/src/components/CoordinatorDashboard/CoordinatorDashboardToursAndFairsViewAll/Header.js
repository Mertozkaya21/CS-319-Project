import React, { useState } from 'react';
import styles from './CoordinatorDashboardToursAndFairsViewAll.module.css';
import { FaBell, FaCog, FaSearch } from 'react-icons/fa';

const Header = ({ title }) => {
  const [sortOption, setSortOption] = useState('Time');

  const handleDropdownChange = (option) => {
    setSortOption(option);
    // Logic to sort the table can go here
  };

  const handleSearch = () => {
    console.log('Search functionality triggered');
    // Logic to handle search can go here
  };

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
        <div className={styles.searchBar}>
          <button className={styles.searchIconButton} onClick={handleSearch}>
            <FaSearch className={styles.searchIcon} />
          </button>
          <input type="text" placeholder="Search High School Name" />
        </div>
        <div className={styles.actions}>
          <div className={styles.dropdown}>
            <button
              className={styles.dropdownButton}
              onClick={() => handleDropdownChange('High School Name')}
            >
              {sortOption} <span className={styles.dropdownArrow}>▼</span>
            </button>
            {/* For accessibility, add dropdown options */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;