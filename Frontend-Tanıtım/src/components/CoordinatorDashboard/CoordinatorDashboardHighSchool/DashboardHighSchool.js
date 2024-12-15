import React, { useState } from 'react';
import Sidebar from '../CoordinatorDashboardCommon/Sidebar';
import Header from './Header';
import HighSchoolTable from './HighSchoolTable';
import { highSchoolRows } from './HighSchoolTable'; // Import data
import styles from './CoordinatorDashboardHighSchool.module.css';

const DashboardHighSchool = () => {
  const [filteredRows, setFilteredRows] = useState(highSchoolRows); // Manage filtered rows
 
  const handleSearchSelection = (value) => {
    if (value) {
      // Filter rows based on the selected high school name
      const filtered = highSchoolRows.filter((row) => row.name === value.label);
      setFilteredRows(filtered);
    } else {
      // Reset to show all rows when the search is cleared
      setFilteredRows(highSchoolRows);
    }
  };

  return (
    <div className={styles.dashboardContainer}>
      <Sidebar />
      <div className={styles.mainContent}>
        <Header title="High Schools" onSearchSelection={handleSearchSelection} />
        <HighSchoolTable rows={filteredRows} />
      </div>
    </div>
  );
};

export default DashboardHighSchool;