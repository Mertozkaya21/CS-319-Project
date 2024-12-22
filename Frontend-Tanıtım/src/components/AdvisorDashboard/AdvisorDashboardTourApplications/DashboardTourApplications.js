import React, { useState, useEffect } from 'react';
import Sidebar from '../AdvisorDashboardCommon/Sidebar';
import Header from './Header';
import TourApplicationsTable from './TourApplicationsTable';
import styles from './AdvisorDashboardTourApplications.module.css';

const DashboardTourApplications = () => {
  const [applications, setApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await fetch('http://localhost:8080/v1/groupform');
      const data = await response.json();
      setApplications(data);
      setFilteredApplications(data);
    } catch (error) {
      console.error('Error fetching applications:', error);
    }
  };

  const handleSearchSelection = (selectedValue) => {
    if (selectedValue) {
      const filtered = applications.filter(app => 
        app.highSchoolName === selectedValue.label
      );
      setFilteredApplications(filtered);
    } else {
      setFilteredApplications(applications);
    }
  };

  return (
    <div className={styles.dashboardContainer}>
      <Sidebar />
      <div className={styles.mainContent}>
        <Header 
          title="Tour Applications" 
          onSearchSelection={handleSearchSelection}
          applications={applications}
        />
        <TourApplicationsTable rows={filteredApplications} onDataChange={fetchApplications} />
      </div>
    </div>
  );
};

export default DashboardTourApplications;