import React from "react";
import Sidebar from "../CoordinatorDashboardCommon/Sidebar";
import InfoCard from "./InfoCard";
import TableOfficeExpense from "./TableOfficeExpense";
import TableUnpaidAdvisor from "./TableUnpaidAdvisor";
import Header from "./Header";
import LineChart from "./LineChart";
import { FaUsers, FaDollarSign } from "react-icons/fa";
import styles from "./CoordinatorDashboardPayments.module.css";

const DashboardPayments = () => {
  const dummyInfoData = [
    {
      title: "Total Advisors",
      value: "34",
      icon: <FaUsers style={{ color: "#ffffff" }} />,
      bgColor: "#0033a0", // Blue background
      subtitle: "+10% than last month",
    },
    {
      title: "Office Balance",
      value: "$13,456",
      icon: <FaDollarSign style={{ color: "#ffffff" }} />,
      bgColor: "#8a0303", // Red background
      subtitle: "+23% than last month",
    },
  ];

  return (
    <div className={styles.dashboard}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className={styles.mainContent}>
        <Header title="Payments" />

        {/* Info Cards */}
        <div className={styles.infoCardsContainer}>
          {dummyInfoData.map((data, index) => (
            <InfoCard
              key={index}
              title={data.title}
              value={data.value}
              icon={data.icon}
              bgColor={data.bgColor}
              subtitle={data.subtitle} // Add subtitle dynamically
            />
          ))}
        </div>

        {/* Line Chart */}
        <div className={styles.graphContainer}>
          <LineChart />
        </div>

        {/* Tables */}
        <div className={styles.tablesWrapper}>
          {/* Unpaid Advisors Table */}
          <div className={styles.unpaidTable}>
            <h3>Unpaid Advisors</h3>
            <TableUnpaidAdvisor />
          </div>

          {/* Office Expense Table */}
          <div className={styles.officeExpenseTable}>
            <h3>Office Expense</h3>
            <TableOfficeExpense />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPayments;