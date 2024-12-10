import React from 'react';
import Sidebar from "../AdvisorDashboardCommon/Sidebar";
import Header from './Header';
import styles from './AdvisorDashboardChat.module.css';
import Chat from './Chat';

const DashboardChat = () => {
  return (
    <div className={styles.dashboardContainer}>
      {/* Sidebar */}
      <Sidebar />
      {/* Main Content */}
      <div className={styles.mainContent}>
        {/* Header */}
        <Header title="Chat" />
        {/* Chat*/}
        <Chat />
      </div>
    </div>
  );
};

export default DashboardChat;