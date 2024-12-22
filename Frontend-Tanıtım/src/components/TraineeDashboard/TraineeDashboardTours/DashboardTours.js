import React, { useState, useEffect } from 'react';
import Sidebar from '../TraineeDashboardCommon/Sidebar';
import Header from './Header';
import ToursTable from './ToursTable';
import styles from './TraineeDashboardTours.module.css';
import axios from 'axios';

const DashboardTours = () => {
  const [tours, setTours] = useState([]);
  const [filteredTours, setFilteredTours] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const traineeId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await axios.get('http://localhost:8080/v1/events');
        // Filter tours assigned to this trainee
        const traineeTours = response.data.filter(event => 
          event.tourType && 
          event.traineeIds && 
          event.traineeIds.includes(Number(traineeId))
        );
        setTours(traineeTours);
        setFilteredTours(traineeTours);
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching tours:', err);
        setError(err.message);
        setIsLoading(false);
      }
    };

    if (traineeId) {
      fetchTours();
    }
  }, [traineeId]);

  const handleSearchSelection = (value) => {
    if (value) {
      const filtered = tours.filter((tour) => tour.name === value.label);
      setFilteredTours(filtered);
    } else {
      setFilteredTours(tours);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className={styles.dashboardContainer}>
      <Sidebar />
      <div className={styles.mainContent}>
        <Header 
          title="My Tours" 
          onSearchSelection={handleSearchSelection}
          tours={tours}
        />
        <ToursTable rows={filteredTours} />
      </div>
    </div>
  );
};

export default DashboardTours;