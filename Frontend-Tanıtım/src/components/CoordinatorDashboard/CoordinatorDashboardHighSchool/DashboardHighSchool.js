import React, { useState , useEffect} from 'react';
import Sidebar from '../CoordinatorDashboardCommon/Sidebar';
import Header from './Header';
import HighSchoolTable from './HighSchoolTable';
//import { highSchoolRows } from './HighSchoolTable'; // Import data
import styles from './CoordinatorDashboardHighSchool.module.css';

const DashboardHighSchool = () => {
  const [highschoolRows, setHighschoolRows] = useState([]); // Store the high school rows
  const [filteredRows, setFilteredRows] = useState(highschoolRows); // Manage filtered rows
  const [selectedRows, setSelectedRows] = useState([]); // Store selected high schools for deletion

  const handleSearchSelection = (value) => {
    if (value) {
      // Filter rows based on the selected high school name
      const filtered = highschoolRows.filter((row) => row.name === value.label);
      setFilteredRows(filtered);
    } else {
      // Reset to show all rows when the search is cleared
      setFilteredRows(highschoolRows);
    }
  };

  const deleteSelectedHighschools = async () => {
    try {
      const response = await fetch(`http://localhost:8080/v1/highschool/remove`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(selectedRows), // Send selected row IDs for deletion
      });

      if (response.ok) {
        // If delete is successful, remove the deleted advisors from the list
        const updatedHighschoolRows = highschoolRows.filter(
          (highschool) => !selectedRows.includes(highschool.id)
        );
        setHighschoolRows(updatedHighschoolRows);
        setFilteredRows(updatedHighschoolRows);
        alert('Highschools deleted successfully!');
      } else {
        alert('Failed to delete highschools.');
      }
    } catch (error) {
      console.error('Error deleting highschools:', error);
      alert('An error occurred while deleting highschools.');
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
        setHighschoolRows(data); // Store data in highSchoolRows state
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
        <Header title="High Schools" onSearchSelection={handleSearchSelection} deleteSelectedHighschools={deleteSelectedHighschools} rows={highschoolRows}/>
        <HighSchoolTable
          rows={highschoolRows}
          setSelectedRows={setSelectedRows} 
        />
      </div>
    </div>
  );
};

export default DashboardHighSchool;