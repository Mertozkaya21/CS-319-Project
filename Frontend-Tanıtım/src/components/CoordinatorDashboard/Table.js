import React, { useState, useEffect } from 'react';
import styles from './CoordinatorDashboard.module.css'; // Ensure styles are defined here

const Table = () => {
  // Dummy data
  const [tableData, setTableData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  useEffect(() => {
    // Replace with a real API call to fetch table data
    const fetchData = async () => {
      const dummyData = [
        { school: 'High School A', timeSlot: '9:00 AM', guide: 'John Doe', date: '2024-01-01' },
        { school: 'High School B', timeSlot: '10:00 AM', guide: 'Jane Smith', date: '2024-01-02' },
        { school: 'High School C', timeSlot: '11:00 AM', guide: 'John Doe', date: '2024-01-03' },
        { school: 'High School D', timeSlot: '12:00 PM', guide: 'Jane Smith', date: '2024-01-04' },
        { school: 'High School E', timeSlot: '1:00 PM', guide: 'John Doe', date: '2024-01-05' },
        { school: 'High School F', timeSlot: '2:00 PM', guide: 'Jane Smith', date: '2024-01-06' },
        { school: 'High School G', timeSlot: '3:00 PM', guide: 'John Doe', date: '2024-01-07' },
        { school: 'High School H', timeSlot: '4:00 PM', guide: 'Jane Smith', date: '2024-01-08' },
        { school: 'High School I', timeSlot: '5:00 PM', guide: 'John Doe', date: '2024-01-09' },
        { school: 'High School J', timeSlot: '6:00 PM', guide: 'Jane Smith', date: '2024-01-10' },
      ];

      setTableData(dummyData);
    };

    fetchData();
  }, []);

  // Pagination Logic
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentData = tableData.slice(startIndex, startIndex + rowsPerPage);
  const totalPages = Math.ceil(tableData.length / rowsPerPage);

  return (
    <div className={styles.tableContainer}>
      <h2 className={styles.tableTitle}>Upcoming Tours</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>High School</th>
            <th>Time Slot</th>
            <th>Guide</th>
            <th>Date</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((row, index) => (
            <tr key={index}>
              <td>{row.school}</td>
              <td>{row.timeSlot}</td>
              <td>{row.guide}</td>
              <td>{row.date}</td>
              <td>
                <button className={styles.moreButton}>...</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className={styles.pagination}>
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          className={styles.pageButton}
        >
          &lt;
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={`${styles.pageButton} ${
              currentPage === index + 1 ? styles.activePageButton : ''
            }`}
          >
            {index + 1}
          </button>
        ))}
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          className={styles.pageButton}
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default Table;