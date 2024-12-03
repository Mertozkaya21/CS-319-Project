import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import styles from './CoordinatorDashboardTourApplications.module.css';
import TourApplicationsTable from './TourApplicationsTable';

const DashboardTourApplications = () => {
  return (
    <div className={styles.dashboardContainer}>
      {/* Sidebar */}
      <Sidebar />
      {/* Main Content */}
      <div className={styles.mainContent}>
        {/* Header */}
        <Header title="Tour Applications" />
        {/* Tour Applications Table */}
        <TourApplicationsTable />
      </div>
    </div>
  );
};

export default DashboardTourApplications;