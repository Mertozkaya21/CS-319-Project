import React, { useState, useEffect } from 'react';
import Sidebar from '../GuideDashboardCommon/Sidebar';
import Header from './Header';
import FairsTable from './FairsTable';
import styles from './GuideDashboardFairs.module.css';
import axios from 'axios';

const DashboardFairs = () => {
  const [fairs, setFairs] = useState([]);
  const [filteredFairs, setFilteredFairs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const guideId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchFairs = async () => {
      try {
        const response = await axios.get('http://localhost:8080/v1/events');
        // Filter fairs assigned to this guide
        const guideFairs = response.data.filter(event => 
          !event.tourType && 
          event.guideIds && 
          event.guideIds.includes(Number(guideId))
        );
        setFairs(guideFairs);
        setFilteredFairs(guideFairs);
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching fairs:', err);
        setError(err.message);
        setIsLoading(false);
      }
    };

    if (guideId) {
      fetchFairs();
    }
  }, [guideId]);

  const handleSearchSelection = (value) => {
    if (value) {
      const filtered = fairs.filter((fair) => fair.name === value.label);
      setFilteredFairs(filtered);
    } else {
      setFilteredFairs(fairs);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className={styles.dashboardContainer}>
      <Sidebar />
      <div className={styles.mainContent}>
        <Header 
          title="My Fairs" 
          onSearchSelection={handleSearchSelection}
          fairs={fairs}
        />
        <FairsTable rows={filteredFairs} />
      </div>
    </div>
  );
};

export default DashboardFairs;