import React, { useState, useEffect } from "react";
import Sidebar from "../CoordinatorDashboardCommon/Sidebar";
import InfoCard from "./InfoCard";
import Calendar from "./Calendar";
import PieChart from "./PieChart";
import Table from "./Table";
import LineChart from "./LineChart";
import RightSidebar from "./RightSidebar";
import { FaUsers, FaChalkboardTeacher, FaRoute, FaBuilding } from "react-icons/fa";
import styles from "./CoordinatorDashboard.module.css";
import axios from 'axios';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    advisors: 0,
    guides: 0,
    tours: 0,
    fairs: 0
  });

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Using Promise.all to fetch data in parallel
        const [advisorsResponse, guidesResponse, eventsResponse] = await Promise.all([
          axios.get('http://localhost:8080/v1/user/advisor'),
          axios.get('http://localhost:8080/v1/user/guide'),
          axios.get('http://localhost:8080/v1/events')
        ]);

        // Filter events to count tours and fairs separately
        const events = eventsResponse.data;
        const tours = events.filter(event => event.tourType);
        const fairs = events.filter(event => !event.tourType);

        setDashboardData({
          advisors: advisorsResponse.data.length,
          guides: guidesResponse.data.length,
          tours: tours.length,
          fairs: fairs.length
        });
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const infoData = [
    {
      title: "Advisors",
      value: dashboardData.advisors,
      icon: <FaUsers style={{ color: "#ffffff" }} />,
      bgColor: "#e0a800",
    },
    {
      title: "Guides",
      value: dashboardData.guides,
      icon: <FaChalkboardTeacher style={{ color: "#ffffff" }} />,
      bgColor: "#20c997",
    },
    {
      title: "Tours",
      value: dashboardData.tours,
      icon: <FaRoute style={{ color: "#ffffff" }} />,
      bgColor: "#007bff",
    },
    {
      title: "Fairs",
      value: dashboardData.fairs,
      icon: <FaBuilding style={{ color: "#ffffff" }} />,
      bgColor: "#6610f2",
    },
  ];

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className={styles.dashboard}>
      <Sidebar />
      <div className={styles.mainContent}>
        <h1 className={styles.dashboardTitle}>Coordinator Dashboard</h1>
        <div className={styles.infoCardsContainer}>
          {infoData.map((data, index) => (
            <InfoCard
              key={index}
              title={data.title}
              value={data.value}
              icon={data.icon}
              bgColor={data.bgColor}
            />
          ))}
        </div>
        <div className={styles.graphContainer}>
          <LineChart />
        </div>
        <div className={styles.bottomSection}>
          <div className={styles.calendarAndPieContainer}>
            <div className={styles.calendarContainer}>
              <Calendar />
            </div>
            <div className={styles.pieChartContainer}>
              <PieChart />
            </div>
          </div>
        </div>
        <div className={styles.tableContainer}>
          <Table />
        </div>
      </div>
      <RightSidebar />
    </div>
  );
};

export default Dashboard;