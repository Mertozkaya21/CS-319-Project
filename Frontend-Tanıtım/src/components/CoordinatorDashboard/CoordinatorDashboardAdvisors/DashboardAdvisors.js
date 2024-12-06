import React, { useState } from 'react';
import Sidebar from '../CoordinatorDashboardCommon/Sidebar';
import Header from './Header';
import AdvisorTable from './AdvisorTable';
import { advisorRows } from './AdvisorTable'; // Import data
import styles from './CoordinatorDashboardAdvisors.module.css';

const DashboardAdvisors = () => {
  const [filteredRows, setFilteredRows] = useState(advisorRows); // Manage filtered rows

  const handleSearchSelection = (value) => {
    if (value) {
      // Filter rows based on the selected advisor name
      const filtered = advisorRows.filter((row) => row.name === value.label);
      setFilteredRows(filtered);
    } else {
      // Reset to show all rows when the search is cleared
      setFilteredRows(advisorRows);
    }
  };

  return (
    <div className={styles.dashboardContainer}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className={styles.mainContent}>
        {/* Header */}
        <Header title="Advisors" onSearchSelection={handleSearchSelection} />

        {/* Advisors Table */}
        <AdvisorTable rows={filteredRows} />
      </div>
    </div>
  );
};

export default DashboardAdvisors;