import React from 'react';
import Sidebar from "../CoordinatorDashboardCommon/Sidebar";
import Header from './Header';
import styles from './CoordinatorDashboardProfileAddCoordinator.module.css';
import Table from './Table';

const CoordinatorDashboardProfileAddCoordinator = () => {
  return (
    <div className={styles.dashboardContainer}>
      {/* Sidebar */}
      <Sidebar />
      {/* Main Content */}
      <div className={styles.mainContent}>
        {/* Header */}
        <Header title="Add New Coordinator" />
        {/* Table*/}
        <Table />
      </div>
    </div>
  );
};


export default CoordinatorDashboardProfileAddCoordinator;