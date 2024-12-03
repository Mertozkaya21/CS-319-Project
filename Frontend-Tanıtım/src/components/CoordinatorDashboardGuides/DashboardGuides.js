import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import styles from './CoordinatorDashboardGuides.module.css';
import GuidesTable from './GuidesTable';

const DashboardGuides = () => {
  return (
    <div className={styles.dashboardContainer}>
      {/* Sidebar */}
      <Sidebar />
      {/* Main Content */}
      <div className={styles.mainContent}>
        {/* Header */}
        <Header title="Guides" />
        {/* Guide Table */}
        <GuidesTable />
      </div>
    </div>
  );
};

export default DashboardGuides;