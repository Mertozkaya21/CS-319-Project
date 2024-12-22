import React, { useState, useEffect } from 'react';
import Sidebar from '../TraineeDashboardCommon/Sidebar';
import Header from './Header';
import Table from './Table';
import styles from './TraineeDashboardPuantaj.module.css';
import axios from 'axios';

const DashboardPuantaj = () => {
  const [events, setEvents] = useState([]);
  const traineeId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:8080/v1/events');
        // Filter events assigned to this trainee
        const traineeEvents = response.data.filter(event => 
          event.traineeIds && 
          event.traineeIds.includes(Number(traineeId))
        );
        setEvents(traineeEvents || []);
      } catch (err) {
        console.error('Error fetching events:', err);
      }
    };

    if (traineeId) {
      fetchEvents();
    }
  }, [traineeId]);

  return (
    <div className={styles.dashboardContainer}>
      <Sidebar />
      <div className={styles.mainContent}>
        <Header 
          title="Puantaj" 
          onSearchSelection={(value) => console.log(value)}
          events={events}
        />
        <Table events={events} />
      </div>
    </div>
  );
};

export default DashboardPuantaj;