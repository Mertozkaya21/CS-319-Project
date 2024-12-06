import React, { useState } from 'react';
import Sidebar from '../CoordinatorDashboardCommon/Sidebar';
import Header from './Header';
import FairApplicationsTable from './FairApplicationsTable'; // Correct component import
import { fairApplicationsRows } from './FairApplicationsTable'; // Import data
import styles from './CoordinatorDashboardFairApplications.module.css';

const DashboardFairApplications = () => {
  const [filteredRows, setFilteredRows] = useState(fairApplicationsRows); // Manage filtered rows

  const handleSearchSelection = (value) => {
    if (value) {
      const filtered = fairApplicationsRows.filter((row) => row.name === value.label);
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