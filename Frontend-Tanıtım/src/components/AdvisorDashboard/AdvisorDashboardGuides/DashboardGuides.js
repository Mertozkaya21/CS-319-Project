import React, { useState } from 'react';
import Sidebar from '../AdvisorDashboardCommon/Sidebar';
import Header from './Header';
import GuidesTable from './GuidesTable';
import { guidesRows } from './GuidesTable'; // Import data
import styles from './AdvisorDashboardGuides.module.css';

const DashboardGuides = () => {
  const [filteredRows, setFilteredRows] = useState(guidesRows); // Manage filtered rows

  const handleSearchSelection = (value) => {
    if (value) {
      // Filter rows based on the selected guide name
      const filtered = guidesRows.filter((row) => row.name === value.label);
      setFilteredRows(filtered);
    } else {
      // Reset to show all rows when the search is cleared
      setFilteredRows(guidesRows);
    }
  };

  return (
    <div className={styles.dashboardContainer}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className={styles.mainContent}>
        {/* Header */}
        <Header title="Guides" onSearchSelection={handleSearchSelection} />

        {/* Guides Table */}
        <GuidesTable rows={filteredRows} />
      </div>
    </div>
  );
};

export default DashboardGuides;