import React from 'react';
import Sidebar from "../CoordinatorDashboardCommon/Sidebar";
import Header from './Header';
import styles from './CoordinatorDashboardProfile.module.css';
import Profile from './Profile';

const DashboardProfile = () => {
  return (
    <div className={styles.dashboardContainer}>
      {/* Sidebar */}
      <Sidebar />
      {/* Main Content */}
      <div className={styles.mainContent}>
        {/* Header */}
        <Header title="Profile" />
        {/* Profile*/}
        <Profile />
      </div>
    </div>
  );
};

export default DashboardProfile;