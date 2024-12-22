import React, { useState, useEffect } from 'react';
import Sidebar from '../CoordinatorDashboardCommon/Sidebar';
import Header from './Header';
import TourApplicationsTable from './TourApplicationsTable'; // Correct component import
import { tourApplicationsRows } from './TourApplicationsTable'; // Import dataset
import styles from './CoordinatorDashboardTourApplications.module.css';

const DashboardTourApplications = () => {
  const [filteredRows, setFilteredRows] = useState(tourApplicationsRows); // Manage filtered rows
  const [tourRows, setTourRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRows, setSelectedRows] = useState([]);

  const handleSearchSelection = (selectedValue) => {
    const filtered = selectedValue
      ? tourApplicationsRows.filter((row) => row.name === selectedValue)
      : tourApplicationsRows;
    setFilteredRows(filtered);
  };

  const confirmSelectedChanges = async () => {
    try {
      const response = await fetch('http://localhost:8080/v1/groupform/confirmchanges', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(selectedRows), // Send selected row IDs for deletion
      });

      if (response.ok) {
        // If delete is successful, remove the deleted advisors from the list
        const updatedTourRows = tourRows.filter(
          (tour) => !selectedRows.includes(tour.id)
        );
        setTourRows(updatedTourRows);
        setFilteredRows(updatedTourRows);
        alert('Applications confirmed successfully!');
      } else {
        alert('Failed to confirm applications.');
      }
    } catch (error) {
      console.error('Error confirming applications:', error);
      alert('An error occurred while confirming applications.');
    }
  };

  const fetchTourRows = async () => {
    try {
      const response = await fetch('http://localhost:8080/v1/groupform'); 
      const data = await response.json();

      setTourRows(data);
      setFilteredRows(data);

      setLoading(false); // Set loading to false after data is fetched
    } catch (error) {
      console.error('Error fetching tour data:', error);
      setLoading(false); // Stop loading in case of an error
    }
  };

  useEffect(() => {
    fetchTourRows(); // Call the function to fetch data
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
        <TourApplicationsTable rows={filteredRows} 
        setSelectedRows={setSelectedRows}
        fetchTourRows={fetchTourRows}/> {/* Render rows dynamically */}
      </div>
    </div>
  );
};

export default DashboardTourApplications;