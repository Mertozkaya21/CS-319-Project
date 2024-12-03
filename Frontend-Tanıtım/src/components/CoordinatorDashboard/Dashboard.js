import React from 'react';
import Sidebar from './Sidebar';
import InfoCard from './InfoCard';
import Calendar from './Calendar';
import PieChart from './PieChart';
import Table from './Table'; // Import the Table component
import RightSidebar from './RightSidebar'; // Import the RightSidebar component
import { FaUsers, FaChalkboardTeacher, FaRoute, FaBuilding } from 'react-icons/fa';
import styles from './CoordinatorDashboard.module.css';

const Dashboard = () => {
  const dummyInfoData = [
    {
      title: 'Advisors',
      value: 34,
      icon: <FaUsers style={{ color: '#ffffff' }} />,
      bgColor: '#e0a800', // Gold circle background
    },
    {
      title: 'Guides',
      value: 53,
      icon: <FaChalkboardTeacher style={{ color: '#ffffff' }} />,
      bgColor: '#20c997', // Green circle background
    },
    {
      title: 'Tours',
      value: 49,
      icon: <FaRoute style={{ color: '#ffffff' }} />,
      bgColor: '#007bff', // Blue circle background
    },
    {
      title: 'Fairs',
      value: 9,
      icon: <FaBuilding style={{ color: '#ffffff' }} />,
      bgColor: '#6610f2', // Purple circle background
    },
  ];

  return (
    <div className={styles.dashboard}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className={styles.mainContent}>
        <h1 className={styles.dashboardTitle}>Dashboard</h1>

        {/* Info Cards */}
        <div className={styles.infoCardsContainer}>
          {dummyInfoData.map((data, index) => (
            <InfoCard
              key={index}
              title={data.title}
              value={data.value}
              icon={data.icon}
              bgColor={data.bgColor}
            />
          ))}
        </div>

        <div className={styles.bottomSection}>
          {/* Calendar and Pie Chart */}
          <div className={styles.calendarAndPieContainer}>
            <div className={styles.calendarContainer}>
              <Calendar />
            </div>
            <div className={styles.pieChartContainer}>
              <PieChart />
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className={styles.tableContainer}>
          <Table />
        </div>
      </div>

      {/* Right Sidebar */}
      <RightSidebar />
    </div>
  );
};

export default Dashboard;