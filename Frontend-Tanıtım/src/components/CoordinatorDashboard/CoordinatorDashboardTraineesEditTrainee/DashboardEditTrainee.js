import React from 'react';
import Sidebar from "../CoordinatorDashboardCommon/Sidebar";
import Header from './Header';
import styles from './CoordinatorDashboardEditTrainee.module.css';
import Table from './Table';

const DashboardEditTrainee = () => {
  return (
    <div className={styles.dashboardContainer}>
      {/* Sidebar */}
      <Sidebar />
      {/* Main Content */}
      <div className={styles.mainContent}>
        {/* Header */}
        <Header title="Edit Trainee" />
        {/* Table*/}
        <Table />
      </div>
    </div>
  );
};


export default DashboardEditTrainee;