import React, { useState } from 'react';
import Sidebar from '../AdvisorDashboardCommon/Sidebar';
import Header from './Header';
import FairApplicationsTable from './FairApplicationsTable'; // Correct component import
import { fairApplicationsRows } from './FairApplicationsTable'; // Import data
import styles from './AdvisorDashboardFairs.module.css';

const DashboardFairApplications = () => {
  const [filteredRows, setFilteredRows] = useState(fairApplicationsRows); // Manage filtered rows

  const handleSearchSelection = (value) => {
    if (value && value.label) {
      const filtered = fairApplicationsRows.filter((row) =>
        row.name.toLowerCase() === value.label.toLowerCase()
      );
      setFilteredRows(filtered);
    } else {
      setFilteredRows(fairApplicationsRows);
    }
  };

  return (
    <div className={styles.dashboardContainer}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className={styles.mainContent}>
        {/* Header */}
        <Header title="Fair Applications" onSearchSelection={handleSearchSelection} />

        {/* Fair Applications Table */}
        <FairApplicationsTable rows={filteredRows} /> {/* Capitalized component name */}
      </div>
    </div>
  );
};

export default DashboardFairApplications;