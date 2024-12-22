import React, { useState, useEffect } from 'react';
import Sidebar from '../AdvisorDashboardCommon/Sidebar';
import Header from './Header';
import GuidesTable from './GuidesTable';
import styles from './AdvisorDashboardGuides.module.css';

const DashboardGuides = () => {
  const [guideRows, setGuideRows] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]); // Manage filtered rows
  const [loading, setLoading] = useState(true);

  const handleSearchSelection = (value) => {
    if (value) {
      // Filter rows based on the selected guide name
      const filtered = guideRows.filter((row) => row.name === value.label);
      setFilteredRows(filtered);
    } else {
      // Reset to show all rows when the search is cleared
      setFilteredRows(guideRows);
    }
  };

  useEffect(() => {
    const fetchGuideRows = async () => {
      try {
        const response = await fetch('http://localhost:8080/v1/user/guide');
        const data = await response.json();
        const updatedData = data.map(guide => ({
          ...guide,
          name: `${guide.firstName} ${guide.lastName}`,
          guideId: guide.id,  // Ensure guideId is added here
        }));

        setGuideRows(updatedData);
        setFilteredRows(updatedData);
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error('Error fetching guide data:', error);
        setLoading(false); // Stop loading in case of an error
      }
    };

    fetchGuideRows(); // Fetch data when the component mounts
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Show loading indicator while fetching data
  }

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
