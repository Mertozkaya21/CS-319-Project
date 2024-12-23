import React, { useState, useEffect } from 'react';
import Sidebar from '../GuideDashboardCommon/Sidebar';
import Header from './Header';
import Table from './Table';
import styles from './GuideDashboardPuantaj.module.css';
import axios from 'axios';

const DashboardPuantaj = () => {
  const [events, setEvents] = useState([]);
  const guideId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:8080/v1/events');
        // Filter events assigned to this guide
        const guideEvents = response.data.filter(event => 
          event.guideIds && 
          event.guideIds.includes(Number(guideId))
        );
        setEvents(guideEvents || []);
      } catch (err) {
        console.error('Error fetching events:', err);
      }
    };

    if (guideId) {
      fetchEvents();
    }
  }, [guideId]);

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