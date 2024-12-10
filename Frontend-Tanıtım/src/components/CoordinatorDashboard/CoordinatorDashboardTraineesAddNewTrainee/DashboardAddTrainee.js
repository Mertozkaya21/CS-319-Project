import React from 'react';
import Sidebar from "../CoordinatorDashboardCommon/Sidebar";
import Header from './Header';
import styles from './CoordinatorDashboardAddTrainee.module.css';
import Table from './Table';

const DashboardAddTrainee = () => {
  return (
    <div className={styles.dashboardContainer}>
      {/* Sidebar */}
      <Sidebar />
      {/* Main Content */}
      <div className={styles.mainContent}>
        {/* Header */}
        <Header title="Add New Trainee" />
        {/* Table*/}
        <Table />
      </div>
    </div>
  );
};


export default DashboardAddTrainee;