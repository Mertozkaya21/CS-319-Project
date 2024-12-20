import React, { useState ,useEffect} from 'react';
import Sidebar from '../CoordinatorDashboardCommon/Sidebar';
import Header from './Header';
import AdvisorTable from './AdvisorTable';
//import { advisorRows } from './AdvisorTable'; // Import data
import styles from './CoordinatorDashboardAdvisors.module.css';

const DashboardAdvisors = () => {
  const [advisorRows, setAdvisorRows] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]); // Manage filtered rows
  const [loading, setLoading] = useState(true);
  const [selectedRows, setSelectedRows] = useState([]);

  const handleSearchSelection = (value) => {
    if (value) {
      // Filter rows based on the selected advisor name
      const filtered = advisorRows.filter((row) => row.name === value.label);
      setFilteredRows(filtered);
    } else {
      // Reset to show all rows when the search is cleared
      setFilteredRows(advisorRows);
    }
  };

  const deleteSelectedAdvisors = async () => {
    try {
      const response = await fetch('http://localhost:8080/v1/user/advisor/remove', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(selectedRows), // Send selected row IDs for deletion
      });

      if (response.ok) {
        // If delete is successful, remove the deleted advisors from the list
        const updatedAdvisorRows = advisorRows.filter(
          (advisor) => !selectedRows.includes(advisor.id)
        );
        setAdvisorRows(updatedAdvisorRows);
        setFilteredRows(updatedAdvisorRows);
        alert('Advisors deleted successfully!');
      } else {
        alert('Failed to delete advisors.');
      }
    } catch (error) {
      console.error('Error deleting advisors:', error);
      alert('An error occurred while deleting advisors.');
    }
  };

  useEffect(() => {
    const fetchAdvisorRows = async () => {
      try {
        const response = await fetch('http://localhost:8080/v1/user/advisor'); 
        const data = await response.json();
        const updatedData = data.map(advisor => ({
          ...advisor,
          name: `${advisor.firstName} ${advisor.lastName}`,
        }));

        setAdvisorRows(updatedData);
        setFilteredRows(updatedData);

        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error('Error fetching advisor data:', error);
        setLoading(false); // Stop loading in case of an error
      }
    };

    fetchAdvisorRows(); // Call the function to fetch data
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
        <Header title="Advisors" onSearchSelection={handleSearchSelection} 
        deleteSelectedAdvisors={deleteSelectedAdvisors}/>

        {/* Advisors Table */}
        <AdvisorTable rows={filteredRows} 
        setSelectedRows={setSelectedRows} />
      </div>
    </div>
  );
};

export default DashboardAdvisors;