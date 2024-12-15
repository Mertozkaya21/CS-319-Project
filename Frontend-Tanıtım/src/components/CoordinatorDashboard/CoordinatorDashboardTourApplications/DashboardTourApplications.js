import React, { useState } from 'react';
import Sidebar from '../CoordinatorDashboardCommon/Sidebar';
import Header from './Header';
import TourApplicationsTable from './TourApplicationsTable'; // Correct component import
import { tourApplicationsRows } from './TourApplicationsTable'; // Import data
import styles from './CoordinatorDashboardTourApplications.module.css';

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
        <Header title="Tour Applications" onSearchSelection={handleSearchSelection} />

        {/* Tour Applications Table */}
        <TourApplicationsTable rows={filteredRows} /> {/* Capitalized component name */}
      </div>
    </div>
  );
};

export default DashboardTourApplications;