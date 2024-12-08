import React, { useState } from 'react';
import Sidebar from '../CoordinatorDashboardCommon/Sidebar';
import Header from './Header';
import ToursAndFairsTable from './ToursAndFairsTable';
import { eventRows } from './ToursAndFairsTable'; // Import data
import styles from './CoordinatorDashboardToursAndFairsViewAll.module.css';

const DashboardToursAndFairsViewAll = () => {
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
        <Header title="Tours And Fairs" onSearchSelection={handleSearchSelection} />

        {/* Events Table */}
        <ToursAndFairsTable rows={filteredRows} />
      </div>
    </div>
  );
};

export default DashboardToursAndFairsViewAll;