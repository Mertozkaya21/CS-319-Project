import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import AdvisorTable from './AdvisorTable';
import styles from './CoordinatorDashboardAdvisors.module.css';

const DashboardAdvisors = () => {
  return (
    <div className={styles.dashboardContainer}>
      {/* Sidebar */}
      <Sidebar />
      {/* Main Content */}
      <div className={styles.mainContent}>
        {/* Header */}
        <Header title="Advisors" />
        {/* Advisor Table */}
        <AdvisorTable />
      </div>
    </div>
  );
};

export default DashboardAdvisors;