import React, { useState, useEffect } from 'react';
import Sidebar from '../AdvisorDashboardCommon/Sidebar';
import Header from './Header';
import TourApplicationsTable from './TourApplicationsTable'; // Correct component import
import styles from './AdvisorDashboardTourApplications.module.css';

const DashboardTourApplications = () => {
  const [applications, setApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]); // Manage filtered applications
  const [loading, setLoading] = useState(true);
  const [selectedRows, setSelectedRows] = useState([]);

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

  const fetchApplications = async () => {
    try {
      const response = await fetch('http://localhost:8080/v1/groupform'); 
      const data = await response.json();

      // Adding unique 'id' field for each row to ensure MUI DataGrid works correctly
      const dataWithId = data.map((item, index) => ({
        ...item,
        id: item.applicationFormID || index, // Ensure each row has a unique 'id'
      }));

      setApplications(dataWithId);
      setFilteredApplications(dataWithId);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching applications:', error);
      setLoading(false); // Stop loading in case of an error
    }
  };

  const confirmSelectedChanges = async () => {
    try {
      const response = await fetch('http://localhost:8080/v1/groupform/confirmchanges', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(selectedRows), // Send selected row IDs for confirmation
      });

      if (response.ok) {
        const updatedApplications = applications.filter(
          (app) => !selectedRows.includes(app.id)
        );
        setApplications(updatedApplications);
        setFilteredApplications(updatedApplications);
        alert('Applications confirmed successfully!');
      } else {
        alert('Failed to confirm applications.');
      }
    } catch (error) {
      console.error('Error confirming applications:', error);
      alert('An error occurred while confirming applications.');
    }
  };

  useEffect(() => {
    fetchApplications(); // Call the function to fetch data
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
        <Header
          title="Tour Applications"
          onSearchSelection={handleSearchSelection}
          confirmSelectedChanges={confirmSelectedChanges}
        />

        {/* Tour Applications Table */}
        <TourApplicationsTable rows={filteredApplications} setSelectedRows={setSelectedRows} />
      </div>
    </div>
  );
};

export default DashboardTourApplications;
