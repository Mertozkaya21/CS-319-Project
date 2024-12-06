import React from 'react';
import Sidebar from "../CoordinatorDashboardCommon/Sidebar";
import Header from './Header';
import ToursAndFairsTable from './ToursAndFairsTable';
import styles from './CoordinatorDashboardToursAndFairsViewAll.module.css';

const DashboardToursAndFairsViewAll = () => {
  return (
    <div className={styles.dashboardContainer}>
      {/* Sidebar */}
      <Sidebar />
      {/* Main Content */}
      <div className={styles.mainContent}>
        {/* Header */}
        <Header title="Tours & Fairs" />
        {/* Tours And Fairs Table */}
        <ToursAndFairsTable />
      </div>
    </div>
  );
};

export default DashboardToursAndFairsViewAll;