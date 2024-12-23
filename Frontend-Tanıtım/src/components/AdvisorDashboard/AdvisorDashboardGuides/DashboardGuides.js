import React, { useState, useEffect } from 'react';
import Sidebar from '../AdvisorDashboardCommon/Sidebar';
import Header from './Header';
import GuidesTable from './GuidesTable';
import styles from './AdvisorDashboardGuides.module.css';
import axios from 'axios';

const DashboardGuides = () => {
  const [guideRows, setGuideRows] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGuideRows = async () => {
      try {
        const response = await axios.get('http://localhost:8080/v1/user/guide');
        const updatedData = response.data.map(guide => ({
          ...guide,
          name: `${guide.firstName} ${guide.lastName}`,
        }));

        setGuideRows(updatedData);
        setFilteredRows(updatedData);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching guide data:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchGuideRows();
  }, []);

  const handleSearchSelection = (value) => {
    if (value) {
      const filtered = guideRows.filter((row) => row.name === value.label);
      setFilteredRows(filtered);
    } else {
      setFilteredRows(guideRows);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className={styles.dashboardContainer}>
      <Sidebar />
      <div className={styles.mainContent}>
        <Header 
          title="Guides" 
          onSearchSelection={handleSearchSelection} 
          guides={guideRows}
        />
        <GuidesTable rows={filteredRows} />
      </div>
    </div>
  );
};

export default DashboardGuides;