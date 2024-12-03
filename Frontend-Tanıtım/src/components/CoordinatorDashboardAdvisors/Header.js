import React, { useState } from 'react';
import styles from './CoordinatorDashboardAdvisors.module.css';
import { FaBell, FaCog, FaSearch } from 'react-icons/fa';

const Header = ({ title }) => {
  const [sortOption, setSortOption] = useState('Date Added');

  const handleDropdownChange = (option) => {
    setSortOption(option);
    console.log(`Sort by: ${option}`);
    // Add sorting logic here
  };

  const handleSearch = () => {
    console.log('Search functionality triggered');
    // Add search logic here
  };

  const handleAddAdvisor = () => {
    console.log('Add New Advisor');
    // Add logic to open the "New Advisor" form or modal
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
          <input type="text" placeholder="Search Name" />
        </div>
        <div className={styles.actions}>
          <div className={styles.dropdown}>
            <button
              className={styles.dropdownButton}
              onClick={() => handleDropdownChange('Advisor Name')}
            >
              {sortOption} <span className={styles.dropdownArrow}>▼</span>
            </button>
          </div>
          <button className={styles.removeButton}>Remove Selected</button>
          <button
            className={styles.addButton}
            onClick={handleAddAdvisor}
          >
            + New Advisor
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;