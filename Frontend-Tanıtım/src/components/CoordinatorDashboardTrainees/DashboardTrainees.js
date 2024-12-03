import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import styles from './CoordinatorDashboardTrainees.module.css';
import TraineeTable from './TraineeTable';

const DashboardTrainees = () => {
  return (
    <div className={styles.dashboardContainer}>
      {/* Sidebar */}
      <Sidebar />
      {/* Main Content */}
      <div className={styles.mainContent}>
        {/* Header */}
        <Header title="Trainees" />
        {/* Trainee Table */}
        <TraineeTable />
      </div>
    </div>
  );
};

export default DashboardTrainees;