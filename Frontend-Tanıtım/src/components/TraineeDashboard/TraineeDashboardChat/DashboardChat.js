import React from 'react';
import Sidebar from "../TraineeDashboardCommon/Sidebar";
import Header from './Header';
import styles from './TraineeDashboardChat.module.css';
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