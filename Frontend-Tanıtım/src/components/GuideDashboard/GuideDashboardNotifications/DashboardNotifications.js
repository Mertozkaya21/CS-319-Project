import React from 'react';
import Sidebar from "../GuideDashboardCommon/Sidebar";
import Header from './Header';
import Notifications from './Notifications';
import styles from './GuideDashboardNotifications.module.css';

const DashboardNotifications = () => {
  return (
    <div className={styles.dashboard}>
      {/* Sidebar */}
      <Sidebar />
      {/* Main Content */}
      <div className={styles.mainContent}>
        {/* Header */}
        <Header title="Notifications and Latest Activity" />
        {/* Notifications */}
        <div className={styles.notificationsContainer}>
          <Notifications />
        </div>
      </div>
    </div>
  );
};

export default DashboardNotifications;