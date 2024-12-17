import React, { useState , useEffect} from 'react';
import Sidebar from '../CoordinatorDashboardCommon/Sidebar';
import Header from './Header';
import HighSchoolTable from './HighSchoolTable';
//import { highSchoolRows } from './HighSchoolTable'; // Import data
import styles from './CoordinatorDashboardHighSchool.module.css';

const DashboardHighSchool = () => {
  const [highSchoolRows, setHighSchoolRows] = useState([]); // Store the high school rows
  const [filteredRows, setFilteredRows] = useState(highSchoolRows); // Manage filtered rows
  const [selectedRows, setSelectedRows] = useState([]); // Store selected high schools for deletion


  const handleSearchSelection = (value) => {
    if (value) {
      // Filter rows based on the selected high school name
      const filtered = highSchoolRows.filter((row) => row.name === value.label);
      setFilteredRows(filtered);
    } else {
      // Reset to show all rows when the search is cleared
      setFilteredRows(highSchoolRows);
    }
  };

  const handleRemoveSelected = async () => {
    if (selectedRows.length === 0) {
      alert('No schools selected for removal.');
      return;
    }

    try {
      // Loop through selected high schools and send DELETE request for each
      const remainingRows = [...highSchoolRows];
      for (let id of selectedRows) {
      const response = await fetch(`http://localhost:8080/v1/highschool/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to delete high school with ID: ${id}`);
      }

      // Optional: If you want to refresh the high schools after each successful deletion
      const updatedRows = highSchoolRows.filter((row) => row.id !== id);
      setHighSchoolRows(updatedRows);
      setFilteredRows(updatedRows);
    }
      setSelectedRows([]); // Reset selected rows
      alert('Selected high schools have been removed.');
    } catch (error) {
      console.error('Error removing high schools:', error);
      alert('There was an error while removing the selected high schools.');
    }
  };

  useEffect(() => {
    const fetchHighSchools = async () => {
      try {
        const response = await fetch('http://localhost:8080/v1/highschool'); // Replace with your backend endpoint
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json(); // Get data from the response
        setHighSchoolRows(data); // Store data in highSchoolRows state
        setFilteredRows(data); // Set filteredRows initially to the full data
      } catch (error) {
        console.error('High schools could not be fetched:', error);
      }
    };

    fetchHighSchools(); // Fetch high schools on component mount
  }, []); 

  return (
    <div className={styles.dashboardContainer}>
      <Sidebar />
      <div className={styles.mainContent}>
        <Header title="High Schools" onSearchSelection={handleSearchSelection} onConfirmDelete={handleRemoveSelected} />
        <HighSchoolTable
          rows={filteredRows}
          setSelectedRows={setSelectedRows} 
        />
      </div>
    </div>
  );
};

export default DashboardHighSchool;