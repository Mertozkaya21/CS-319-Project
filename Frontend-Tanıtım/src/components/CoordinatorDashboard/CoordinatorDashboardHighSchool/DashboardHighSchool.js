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

  const handleConfirmDelete = async () => {
    console.log("Selected Rows Before Deletion:", selectedRows);
    if (selectedRows.length === 0) {
      alert('No schools selected for removal.');
      return;
    }

    try {
      // Send the selected school IDs as a JSON array in a single DELETE request
      const response = await fetch('http://localhost:8080/v1/highschool/remove', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(selectedRows), // Send selected school IDs
      });
      if (!response.ok) {
        throw new Error(`Failed to delete high schools`);
      }

      const updatedRows = filteredRows.filter((row) => !filteredRows.includes(row.id));
      setHighSchoolRows(updatedRows);
      setFilteredRows(updatedRows);

      setSelectedRows([]); // Reset selected rows
      alert('Selected high schools have been removed.');
      console.log("Removing the following schools:", selectedRows);

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
        <Header title="High Schools" onSearchSelection={handleSearchSelection} onConfirmDelete={handleConfirmDelete} rows={highSchoolRows}/>
        <HighSchoolTable
          rows={highSchoolRows}
          setSelectedRows={setSelectedRows} 
        />
      </div>
    </div>
  );
};

export default DashboardHighSchool;