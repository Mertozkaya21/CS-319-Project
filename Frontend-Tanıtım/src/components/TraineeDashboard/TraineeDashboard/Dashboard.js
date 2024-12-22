import React, { useState, useEffect } from "react";
import Sidebar from "../TraineeDashboardCommon/Sidebar";
import InfoCard from "./InfoCard";
import Table from "./Table";
import RightSidebar from "./RightSidebar";
import { FaUsers, FaChalkboardTeacher, FaRoute, FaBuilding } from "react-icons/fa";
import styles from "./TraineeDashboard.module.css";
import axios from 'axios';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    guides: 0,
    tours: 0,
    fairs: 0
  });

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Using your existing endpoints from controllers
        const [guidesResponse, eventsResponse] = await Promise.all([
          axios.get('http://localhost:8080/v1/user/guide'),
          axios.get('http://localhost:8080/v1/events')
        ]);

        // Filter events to count tours and fairs separately
        const events = eventsResponse.data;
        const tours = events.filter(event => event.tourType); // Events with tourType are tours
        const fairs = events.filter(event => !event.tourType); // Events without tourType are fairs

        setDashboardData({
          guides: guidesResponse.data.length,
          tours: tours.length,
          fairs: fairs.length
        });
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const infoData = [
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
        <h1 className={styles.dashboardTitle}>Trainee Dashboard</h1>
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
        <div className={styles.tableContainer}>
          <Table />
        </div>
      </div>
      <RightSidebar />
    </div>
  );
};

export default Dashboard;