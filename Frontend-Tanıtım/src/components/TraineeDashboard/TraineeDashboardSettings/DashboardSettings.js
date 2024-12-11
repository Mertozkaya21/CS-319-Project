import React from 'react';
import Sidebar from "../TraineeDashboardCommon/Sidebar";
import Header from './Header';
import styles from './TraineeDashboardSettings.module.css';
import Settings from './Settings';

const DashboardSettings = () => {
  return (
    <div className={styles.dashboardContainer}>
      {/* Sidebar */}
      <Sidebar />
      {/* Main Content */}
      <div className={styles.mainContent}>
        {/* Header */}
        <Header title="Settings" />
        {/* Settings*/}
        <Settings />
      </div>
    </div>
  );
};

export default DashboardSettings;