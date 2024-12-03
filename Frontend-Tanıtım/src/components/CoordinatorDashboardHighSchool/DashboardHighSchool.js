import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import HighSchoolTable from './HighSchoolTable';
import styles from './CoordinatorDashboardHighSchool.module.css';

const DashboardHighSchool = () => {
  return (
    <div className={styles.dashboardContainer}>
      {/* Sidebar */}
      <Sidebar />
      {/* Main Content */}
      <div className={styles.mainContent}>
        {/* Header */}
        <Header title="High Schools" />
        {/* High School Table */}
        <HighSchoolTable />
      </div>
    </div>
  );
};

export default DashboardHighSchool;