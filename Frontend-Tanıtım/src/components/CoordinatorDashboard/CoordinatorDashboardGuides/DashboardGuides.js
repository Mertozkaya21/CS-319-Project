import React, { useState, useEffect } from 'react';
import Sidebar from '../CoordinatorDashboardCommon/Sidebar';
import Header from './Header';
import GuidesTable from './GuidesTable';
import { guidesRows } from './GuidesTable'; // Import data
import styles from './CoordinatorDashboardGuides.module.css';

const DashboardGuides = () => {
  const [guideRows, setGuideRows] = useState([]);
    const [filteredRows, setFilteredRows] = useState([]); // Manage filtered rows
    const [loading, setLoading] = useState(true);
    const [selectedRows, setSelectedRows] = useState([]);

  const handleSearchSelection = (value) => {
    if (value) {
      // Filter rows based on the selected guide name
      const filtered = guidesRows.filter((row) => row.name === value.label);
      setFilteredRows(filtered);
    } else {
      // Reset to show all rows when the search is cleared
      setFilteredRows(guidesRows);
    }
  };

   const deleteSelectedGuides = async () => {
      try {
        const response = await fetch('http://localhost:8080/v1/user/guide/remove', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(selectedRows), // Send selected row IDs for deletion
        });
  
        if (response.ok) {
          // If delete is successful, remove the deleted advisors from the list
          const updatedGuideRows = guideRows.filter(
            (guide) => !selectedRows.includes(guide.id)
          );
          setGuideRows(updatedGuideRows);
          setFilteredRows(updatedGuideRows);
          alert('Guides deleted successfully!');
        } else {
          alert('Failed to delete guides.');
        }
      } catch (error) {
        console.error('Error deleting guides:', error);
        alert('An error occurred while deleting guides.');
      }
    };
  
    useEffect(() => {
      const fetchGuideRows = async () => {
        try {
          const response = await fetch('http://localhost:8080/v1/user/guide'); 
          const data = await response.json();
          const updatedData = data.map(guide => ({
            ...guide,
            name: `${guide.firstName} ${guide.lastName}`,
          }));
  
          setGuideRows(updatedData);
          setFilteredRows(updatedData);
  
          setLoading(false); // Set loading to false after data is fetched
        } catch (error) {
          console.error('Error fetching guide data:', error);
          setLoading(false); // Stop loading in case of an error
        }
      };
  
      fetchGuideRows(); // Call the function to fetch data
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
        <Header title="Guides" onSearchSelection={handleSearchSelection} 
        deleteSelectedGuides={deleteSelectedGuides}/>

        {/* Guides Table */}
        <GuidesTable rows={filteredRows}
        setSelectedRows={setSelectedRows}  />
      </div>
    </div>
  );
};

export default DashboardGuides;