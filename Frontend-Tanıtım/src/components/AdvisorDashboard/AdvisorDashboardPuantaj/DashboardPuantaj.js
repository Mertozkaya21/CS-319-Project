import React, { useState, useEffect } from 'react';
import Sidebar from '../AdvisorDashboardCommon/Sidebar';
import Header from './Header';
import Table from './Table';
import styles from './AdvisorDashboardPuantaj.module.css';
import axios from 'axios';

const DashboardPuantaj = () => {
  const [trainees, setTrainees] = useState([]);
  const advisorId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchTrainees = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/v1/user/advisor/${advisorId}/trainees`);
        setTrainees(response.data || []);
      } catch (err) {
        console.error('Error fetching trainees:', err);
      }
    };

    if (advisorId) {
      fetchTrainees();
    }
  }, [advisorId]);

  return (
    <div className={styles.dashboardContainer}>
      <Sidebar />
      <div className={styles.mainContent}>
        <Header 
          title="Puantaj" 
          onSearchSelection={(value) => console.log(value)}
          trainees={trainees}
        />
        <Table />
      </div>
    </div>
  );
};

export default DashboardPuantaj;