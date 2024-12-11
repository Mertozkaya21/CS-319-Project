import React from 'react';
import Sidebar from "../CoordinatorDashboardCommon/Sidebar";
import Header from './Header';
import styles from './CoordinatorDashboardEditGuide.module.css';
import Table from './Table';

const DashboardEditGuide = () => {
  return (
    <div className={styles.dashboardContainer}>
      {/* Sidebar */}
      <Sidebar />
      {/* Main Content */}
      <div className={styles.mainContent}>
        {/* Header */}
        <Header title="Edit Guide" />
        {/* Table*/}
        <Table />
      </div>
    </div>
  );
};


export default DashboardEditGuide;