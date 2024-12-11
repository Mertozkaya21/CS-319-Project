import React from 'react';
import Sidebar from "../CoordinatorDashboardCommon/Sidebar";
import Header from './Header';
import styles from './CoordinatorDashboardAddGuide.module.css';
import Table from './Table';

const DashboardAddGuide = () => {
  return (
    <div className={styles.dashboardContainer}>
      {/* Sidebar */}
      <Sidebar />
      {/* Main Content */}
      <div className={styles.mainContent}>
        {/* Header */}
        <Header title="Add New Guide" />
        {/* Table*/}
        <Table />
      </div>
    </div>
  );
};


export default DashboardAddGuide;