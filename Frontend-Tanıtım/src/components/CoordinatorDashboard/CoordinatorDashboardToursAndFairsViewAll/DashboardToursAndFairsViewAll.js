import React, { useState, useEffect } from 'react';
import Sidebar from '../CoordinatorDashboardCommon/Sidebar';
import Header from './Header';
import ToursAndFairsTable from './ToursAndFairsTable';
import { eventRows } from './ToursAndFairsTable'; // Import data
import styles from './CoordinatorDashboardToursAndFairsViewAll.module.css';

const DashboardToursAndFairsViewAll = () => {
  const [eventRows, setEventRows] = useState([]); // Store the high school rows
    const [filteredRows, setFilteredRows] = useState(eventRows); // Manage filtered rows
    const [selectedRows, setSelectedRows] = useState([]);// Manage filtered rows

  const handleSearchSelection = (value) => {
    if (value) {
      // Filter rows based on the selected event name
      const filtered = eventRows.filter((row) => row.name === value.label);
      setFilteredRows(filtered);
    } else {
      // Reset to show all rows when the search is cleared
      setFilteredRows(eventRows);
    }
  };

  const deleteSelectedEvents = async () => {
    
    try {
      const response = await fetch('http://localhost:8080/v1/events/remove', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(selectedRows), // Send selected row IDs for deletion
      });

      if (response.ok) {
        const updatedEventRows = eventRows.filter(
          (event) => !selectedRows.includes(event.id)
        );
        setEventRows(updatedEventRows);
        setFilteredRows(updatedEventRows);
        alert('Events deleted successfully!');
      } else {
        alert('Failed to delete events.');
      }
    } catch (error) {
      console.error('Error deleting events:', error);
      alert('An error occurred while deleting events.');
    }
  };

  useEffect(() => {
      const fetchEvents = async () => {
        try {
          const response = await fetch('http://localhost:8080/v1/events'); // Replace with your backend endpoint
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          const data = await response.json(); // Get data from the response
          setEventRows(data); // Store data in state
          setFilteredRows(data); 
        } catch (error) {
          console.error('Events could not be fetched:', error);
        }
      };
  
      fetchEvents(); 
    }, []); 

  return (
    <div className={styles.dashboardContainer}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className={styles.mainContent}>
        {/* Header */}
        <Header title="Tours And Fairs" onSearchSelection={handleSearchSelection}
        deleteSelectedEvents={deleteSelectedEvents} rows={eventRows} />

        {/* Events Table */}
        <ToursAndFairsTable 
        rows={eventRows}
        setSelectedRows={setSelectedRows}  />
      </div>
    </div>
  );
};

export default DashboardToursAndFairsViewAll;