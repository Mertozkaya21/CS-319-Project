import React, { useState } from 'react';
import Sidebar from '../AdvisorDashboardCommon/Sidebar';
import Header from './Header';
import TraineesTable, { traineesRows } from './TraineesTable';
import styles from './AdvisorDashboardTrainees.module.css';

const DashboardTrainees = () => {
  const [filteredRows, setFilteredRows] = useState(traineesRows); // Manage filtered rows

  const handleSearchSelection = (value) => {
    if (value) {
      // Filter rows based on the selected trainee name
      const filtered = traineesRows.filter((row) => row.name === value.label);
      setFilteredRows(filtered);
    } else {
      // Reset to show all rows when the search is cleared
      setFilteredRows(traineesRows);
    }
  };

  return (
    <div className={styles.dashboardContainer}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className={styles.mainContent}>
        {/* Header */}
        <Header title="Trainees" onSearchSelection={handleSearchSelection} />

        {/* Trainees Table */}
        <TraineesTable rows={filteredRows} />
      </div>
    </div>
  );
};

export default DashboardTrainees;