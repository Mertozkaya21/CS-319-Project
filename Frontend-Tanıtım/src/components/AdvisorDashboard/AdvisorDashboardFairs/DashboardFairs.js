import React, { useState } from 'react';
import Sidebar from '../AdvisorDashboardCommon/Sidebar';
import Header from './Header';
import FairsTable from './FairsTable';
import { eventRows } from './FairsTable'; // Import data
import styles from './AdvisorDashboardFairs.module.css';

const DashboardFairs = () => {
  const [filteredRows, setFilteredRows] = useState(eventRows); // Manage filtered rows

  const handleSearchSelection = (value) => {
    if (value) {
      // Filter rows based on the selected event name
      const filtered = eventRows.filter((row) => row.name === value.label);
      setFilteredRows(filtered);
    } else {
      // Reset to show all rows when the search is cleared
      setFilteredRows(eventRows);
    }
  };

  return (
    <div className={styles.dashboardContainer}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className={styles.mainContent}>
        {/* Header */}
        <Header title="Fairs" onSearchSelection={handleSearchSelection} />

        {/* Events Table */}
        <FairsTable rows={filteredRows} />
      </div>
    </div>
  );
};

export default DashboardFairs;