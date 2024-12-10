import React from 'react';
import Sidebar from "../CoordinatorDashboardCommon/Sidebar";
import Header from './Header';
import styles from './CoordinatorDashboardEditAdvisor.module.css';
import Table from './Table';

const DashboardEditAdvisor = () => {
  return (
    <div className={styles.dashboardContainer}>
      {/* Sidebar */}
      <Sidebar />
      {/* Main Content */}
      <div className={styles.mainContent}>
        {/* Header */}
        <Header title="Edit Advisor" />
        {/* Table*/}
        <Table />
      </div>
    </div>
  );
};


export default DashboardEditAdvisor;