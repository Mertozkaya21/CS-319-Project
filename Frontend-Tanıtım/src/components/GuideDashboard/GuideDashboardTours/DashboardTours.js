import React, { useState } from 'react';
import Sidebar from '../GuideDashboardCommon/Sidebar';
import Header from './Header';
import ToursTable from './ToursTable';
import { eventRows } from './ToursTable'; // Import data
import styles from './GuideDashboardTours.module.css';

const DashboardTours = () => {
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
        <Header title="Tours" onSearchSelection={handleSearchSelection} />

        {/* Events Table */}
        <ToursTable rows={filteredRows} />
      </div>
    </div>
  );
};

export default DashboardTours;