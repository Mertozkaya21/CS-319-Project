import React from 'react';
import Sidebar from "../CoordinatorDashboardCommon/Sidebar";
import Header from './Header';
import styles from './CoordinatorDashboardHighSchoolAddHighSchool.module.css';
import Table from './Table';

const DashboardAddHighSchool = () => {
  return (
    <div className={styles.dashboardContainer}>
      {/* Sidebar */}
      <Sidebar />
      {/* Main Content */}
      <div className={styles.mainContent}>
        {/* Header */}
        <Header title="Add New High School" />
        {/* Table*/}
        <Table />
      </div>
    </div>
  );
};


export default DashboardAddHighSchool;