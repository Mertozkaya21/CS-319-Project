import React, { useState ,useEffect} from 'react';
import Sidebar from '../CoordinatorDashboardCommon/Sidebar';
import Header from './Header';
import CoordinatorsTable from './CoordinatorsTable';
import styles from './CoordinatorDashboardProfileManageCoordinators.module.css';

const DashboardProfileManageCoordinators = () => {
  const [coordinatorRows, setCoordinatorRows] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]); // Manage filtered rows
  const [loading, setLoading] = useState(true);
  const [selectedRows, setSelectedRows] = useState([]);

  const handleSearchSelection = (value) => {
    if (value) {
      // Filter rows based on the selected coordinator name
      const filtered = coordinatorRows.filter((row) => row.name === value.label);
      setFilteredRows(filtered);
    } else {
      // Reset to show all rows when the search is cleared
      setFilteredRows(coordinatorRows);
    }
  };

  const deleteSelectedCoordinators = async () => {
    try {
      const response = await fetch('http://localhost:8080/v1/user/coordinator/remove', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(selectedRows), // Send selected row IDs for deletion
      });

      if (response.ok) {
        // If delete is successful, remove the deleted coordinators from the list
        const updatedCoordinatorRows = coordinatorRows.filter(
          (coordinator) => !selectedRows.includes(coordinator.id)
        );
        setCoordinatorRows(updatedCoordinatorRows);
        setFilteredRows(updatedCoordinatorRows);
        alert('Coordinators deleted successfully!');
      } else {
        alert('Failed to delete coordinators.');
      }
    } catch (error) {
      console.error('Error deleting coordinators:', error);
      alert('An error occurred while deleting coordinators.');
    }
  };

  useEffect(() => {
    const fetchCoordinatorRows = async () => {
      try {
        const response = await fetch('http://localhost:8080/v1/user/coordinator'); 
        const data = await response.json();
        const updatedData = data.map(coordinator => ({
          ...coordinator,
          name: `${coordinator.firstName} ${coordinator.lastName}`,
        }));

        setCoordinatorRows(updatedData);
        setFilteredRows(updatedData);

        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error('Error fetching coordinator data:', error);
        setLoading(false); // Stop loading in case of an error
      }
    };

    fetchCoordinatorRows(); // Call the function to fetch data
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
        <Header title="Coordinators" onSearchSelection={handleSearchSelection} 
        deleteSelectedCoordinators={deleteSelectedCoordinators}/>

        {/* Coordinator Table */}
        <CoordinatorsTable rows={filteredRows} 
        setSelectedRows={setSelectedRows} />
      </div>
    </div>
  );
};

export default DashboardProfileManageCoordinators;