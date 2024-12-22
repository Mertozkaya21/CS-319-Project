import React, { useState, useEffect } from 'react';
import Sidebar from '../AdvisorDashboardCommon/Sidebar';
import Header from './Header';
import TourApplicationsTable from './TourApplicationsTable';
import styles from './AdvisorDashboardTourApplications.module.css';
import axios from 'axios';

const DashboardTourApplications = () => {
  const [applications, setApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get('http://localhost:8080/v1/individualform');
        setApplications(response.data);
        setFilteredApplications(response.data);
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching applications:', err);
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchApplications();
  }, []);

  const handleSearchSelection = (value) => {
    if (value) {
      const filtered = applications.filter((app) => app.name === value.label);
      setFilteredApplications(filtered);
    } else {
      setFilteredApplications(applications);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className={styles.dashboardContainer}>
      <Sidebar />
      <div className={styles.mainContent}>
        <Header 
          title="Individual Tour Applications" 
          onSearchSelection={handleSearchSelection}
          applications={applications}
        />
        <TourApplicationsTable rows={filteredApplications} />
      </div>
    </div>
  );
};

export default DashboardTourApplications;