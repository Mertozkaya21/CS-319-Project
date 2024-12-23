import React from "react";
import Sidebar from "../CoordinatorDashboardCommon/Sidebar";
import InfoCard from "./InfoCard";
import PieChart from "./PieChartDepartments";
import Comments from "./Comments";
import Header from "./Header";
import BarChartGuideRating from "./BarChartGuideRating";
import LineChartTours from "./LineChartNumberofTours"; // Import the Line Chart
import LineChartSatisfaction from "./LineChartAverageTourSatisfaction"; // Import the Line Chart
import { FaUsers, FaChalkboardTeacher, FaRoute, FaBuilding } from "react-icons/fa";
import styles from "./CoordinatorDashboardFeedbackAnalysis.module.css";
 
const DashboardFeedbackAnalysis = () => {
  const dummyInfoData = [
    {
      title: "Surverys Completed",
      value: 234,
      icon: <FaUsers style={{ color: "#ffffff" }} />,
      bgColor: "#e0a800", // Gold circle background
    },
    {
      title: "Number of Visting Schools",
      value: 53,
      icon: <FaChalkboardTeacher style={{ color: "#ffffff" }} />,
      bgColor: "#20c997", // Green circle background
    },
    {
      title: "Number of Tour Participants",
      value: 549,
      icon: <FaRoute style={{ color: "#ffffff" }} />,
      bgColor: "#007bff", // Blue circle background
    },
  ];

  return (
    <div className={styles.dashboard}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className={styles.mainContent}>
      <Header title="Feedback Analysis" />
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

        {/* Line Chart */}
        <div className={styles.graphContainer}>
          <LineChartTours /> {/* Include the line chart component */}
        </div>

        <div className={styles.chartSection}>
          {/* Pie Chart */}
          <div className={styles.pieChartContainer}>
            <PieChart />
          </div>

          {/* Bar Chart */}
          <div className={styles.barChartContainer}>
            <BarChartGuideRating />
          </div>
        </div>

        {/* Line Chart for Average Satisfaction */}
        <div className={styles.graphContainer}>
          <LineChartSatisfaction /> {/* Line chart for Average Tour Satisfaction */}
        </div>
        
        <Comments />

      </div>
    </div>
  );
};

export default DashboardFeedbackAnalysis;