import React from 'react';
import Sidebar from "../CoordinatorDashboardCommon/Sidebar";
import Header from './Header';
import styles from './CoordinatorDashboardAddAdvisor.module.css';
import Table from './Table';

const DashboardAddAdvisor = () => {
  return (
    <div className={styles.dashboardContainer}>
      {/* Sidebar */}
      <Sidebar />
      {/* Main Content */}
      <div className={styles.mainContent}>
        {/* Header */}
        <Header title="Add New Advisor" />
        {/* Table*/}
        <Table />
      </div>
    </div>
  );
};


export default DashboardAddAdvisor;