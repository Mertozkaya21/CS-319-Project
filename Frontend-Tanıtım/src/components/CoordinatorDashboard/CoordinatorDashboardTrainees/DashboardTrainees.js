import React, { useState, useEffect } from 'react';
import Sidebar from '../CoordinatorDashboardCommon/Sidebar';
import Header from './Header';
import TraineesTable, { traineesRows } from './TraineesTable';
import styles from './CoordinatorDashboardTrainees.module.css';

const DashboardTrainees = () => {
  const [traineeRows, setTraineeRows] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]); // Manage filtered rows
  const [loading, setLoading] = useState(true);
  const [selectedRows, setSelectedRows] = useState([]);

  const handleSearchSelection = (value) => {
    if (value) {
      // Filter rows based on the selected trainee name
      const filtered = traineesRows.filter((row) => row.name === value.label);
      setFilteredRows(filtered);
    } else {
      // Reset to show all rows when the search is cleared
      setFilteredRows(traineesRows);
    }
  };

  const deleteSelectedTrainees = async () => {
    try {
      console.log(selectedRows);
      const response = await fetch('http://localhost:8080/v1/user/trainee/remove', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(selectedRows), // Send selected row IDs for deletion
      });

      if (response.ok) {
        // If delete is successful, remove the deleted advisors from the list
        const updatedTraineeRows = traineeRows.filter(
          (trainee) => !selectedRows.includes(trainee.id)
        );
        setTraineeRows(updatedTraineeRows);
        setFilteredRows(updatedTraineeRows);
        alert('Trainees deleted successfully!');
      } else {
        alert('Failed to delete trainees.');
      }
    } catch (error) {
      console.error('Error deleting trainees:', error);
      alert('An error occurred while deleting trainees.');
    }
  };
    
  useEffect(() => {
    const fetchTraineeRows = async () => {
      try {
        const response = await fetch('http://localhost:8080/v1/user/trainee'); 
        const data = await response.json();
        const updatedData = data.map(trainee => ({
          ...trainee,
          name: `${trainee.firstName} ${trainee.lastName}`,
          advisorResponsible: trainee.advisor ? `${trainee.advisor.firstName} ${trainee.advisor.lastName}` : null
        }));

        setTraineeRows(updatedData);
        setFilteredRows(updatedData);

        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error('Error fetching trainee data:', error);
        setLoading(false); // Stop loading in case of an error
      }
    };

    fetchTraineeRows(); // Call the function to fetch data
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
        <Header title="Trainees" onSearchSelection={handleSearchSelection} 
        deleteSelectedTrainees={deleteSelectedTrainees}/>

        {/* Trainees Table */}
        <TraineesTable rows={filteredRows} 
        setSelectedRows={setSelectedRows}/>
      </div>
    </div>
  );
};

export default DashboardTrainees;