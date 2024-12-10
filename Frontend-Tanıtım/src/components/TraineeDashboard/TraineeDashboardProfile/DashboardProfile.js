import React from 'react';
import Sidebar from "../TraineeDashboardCommon/Sidebar";
import styles from './TraineeDashboardProfile.module.css';
import Profile from './Profile';

const DashboardProfile = () => {
  return (
    <div className={styles.dashboardContainer}>
      {/* Sidebar */}
      <Sidebar />
      {/* Main Content */}
      <div className={styles.mainContent}>
        {/* Profile */}
        <Profile />
      </div>
    </div>
  );
};

export default DashboardProfile;