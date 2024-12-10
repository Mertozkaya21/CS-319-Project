import React from 'react';
import Sidebar from "../CoordinatorDashboardCommon/Sidebar";
import Header from './Header';
import styles from './CoordinatorDashboardEditHighSchool.module.css';
import Table from './Table';

const DashboardEditHighSchool = () => {
  return (
    <div className={styles.dashboardContainer}>
      {/* Sidebar */}
      <Sidebar />
      {/* Main Content */}
      <div className={styles.mainContent}>
        {/* Header */}
        <Header title="Edit High School" />
        {/* Table*/}
        <Table />
      </div>
    </div>
  );
};


export default DashboardEditHighSchool;