import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import styles from './CoordinatorDashboardFairApplications.module.css';
import FairApplicationsTable from './FairApplicationsTable';

const DashboardTourApplications = () => {
  return (
    <div className={styles.dashboardContainer}>
      {/* Sidebar */}
      <Sidebar />
      {/* Main Content */}
      <div className={styles.mainContent}>
        {/* Header */}
        <Header title="Fair Applications" />
        {/* Fair Applications Table */}
        <FairApplicationsTable />
      </div>
    </div>
  );
};

export default DashboardTourApplications;