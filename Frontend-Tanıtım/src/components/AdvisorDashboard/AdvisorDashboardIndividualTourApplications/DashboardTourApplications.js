import React, { useState } from 'react';
import Sidebar from '../AdvisorDashboardCommon/Sidebar';
import Header from './Header';
import TourApplicationsTable from './TourApplicationsTable'; // Correct component import
import { tourApplicationsRows } from './TourApplicationsTable'; // Import dataset
import styles from './AdvisorDashboardTourApplications.module.css';

const DashboardTourApplications = () => {
  const [filteredRows, setFilteredRows] = useState(tourApplicationsRows); // Manage filtered rows

  const handleSearchSelection = (selectedValue) => {
    const filtered = selectedValue
      ? tourApplicationsRows.filter((row) => row.name === selectedValue)
      : tourApplicationsRows;
    setFilteredRows(filtered);
  };

  return (
    <div className={styles.dashboardContainer}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className={styles.mainContent}>
        {/* Header */}
        <Header
          title="Individual Tour Applications"
          onSearchSelection={handleSearchSelection}
        />

        {/* Tour Applications Table */}
        <TourApplicationsTable rows={filteredRows} /> {/* Render rows dynamically */}
      </div>
    </div>
  );
};

export default DashboardTourApplications;