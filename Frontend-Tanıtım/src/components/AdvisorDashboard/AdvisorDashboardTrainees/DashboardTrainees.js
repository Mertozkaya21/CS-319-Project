import React, { useState, useEffect } from 'react';
import Sidebar from '../AdvisorDashboardCommon/Sidebar';
import Header from './Header';
import TraineesTable, { traineesRows } from './TraineesTable';
import styles from './AdvisorDashboardTrainees.module.css';
import axios from 'axios';

const DashboardTrainees = () => {
  const [traineeRows, setTraineeRows] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);

  useEffect(() => {
    const fetchTraineeRows = async () => {
      try {
        const response = await axios.get('http://localhost:8080/v1/user/trainee');
        const updatedData = response.data.map(trainee => ({
          ...trainee,
          name: `${trainee.firstName} ${trainee.lastName}`,
        }));

        setTraineeRows(updatedData);
        setFilteredRows(updatedData);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching trainee data:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchTraineeRows();
  }, []);

  const deleteSelectedTrainees = async () => {
    try {
      const response = await axios.delete('http://localhost:8080/v1/user/trainee/remove', {
        data: selectedRows
      });
      if (response.status === 200) {
        const updatedTraineeRows = traineeRows.filter(
          (trainee) => !selectedRows.includes(trainee.id)
        );
        setTraineeRows(updatedTraineeRows);
        setFilteredRows(updatedTraineeRows);
        alert('Trainees deleted successfully!');
      }
    } catch (error) {
      console.error('Error deleting trainees:', error);
      alert('An error occurred while deleting trainees.');
    }
  };

  const handleSearchSelection = (value) => {
    if (value) {
      const filtered = traineeRows.filter((row) => row.name === value.label);
      setFilteredRows(filtered);
    } else {
      setFilteredRows(traineeRows);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className={styles.dashboardContainer}>
      <Sidebar />
      <div className={styles.mainContent}>
        <Header 
          title="Trainees" 
          onSearchSelection={handleSearchSelection} 
          trainees={traineeRows}
          deleteSelectedTrainees={deleteSelectedTrainees}
        />
        <TraineesTable 
          rows={filteredRows} 
          setSelectedRows={setSelectedRows}
        />
      </div>
    </div>
  );
};

export default DashboardTrainees;