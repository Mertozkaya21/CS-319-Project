import React from 'react';
import Sidebar from "../CoordinatorDashboardCommon/Sidebar";
import Header from './Header';
import styles from './CoordinatorDashboardFairApplications.module.css';
import Payments from './Payments';

const DashboardPayments = () => {
  return (
    <div className={styles.dashboardContainer}>
      {/* Sidebar */}
      <Sidebar />
      {/* Main Content */}
      <div className={styles.mainContent}>
        {/* Header */}
        <Header title="Payments" />
        {/* Payments*/}
        <Payments />
      </div>
    </div>
  );
};

export default DashboardPayments;