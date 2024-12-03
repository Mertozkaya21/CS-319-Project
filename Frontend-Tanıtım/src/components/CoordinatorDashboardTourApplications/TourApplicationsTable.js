import React, { useState } from 'react';
import styles from './CoordinatorDashboardTourApplications.module.css';
import { FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

const TourApplicationsTable = () => {
  const dummyData = [
    { name: 'High School A', priority: 1, tourDate: 'Oct 30, 2024', tourTime: '09:00-11:00', city: 'Ankara' },
    { name: 'High School B', priority: 2, tourDate: 'Oct 30, 2024', tourTime: '09:00-11:00', city: 'Antalya' },
    { name: 'High School C', priority: 3, tourDate: 'Oct 30, 2024', tourTime: '09:00-11:00', city: 'Konya' },
    { name: 'High School D', priority: 4, tourDate: 'Oct 30, 2024', tourTime: '09:00-11:00', city: 'Istanbul' },
    { name: 'High School E', priority: 5, tourDate: 'Oct 30, 2024', tourTime: '09:00-11:00', city: 'Konya' },
    { name: 'High School F', priority: 6, tourDate: 'Oct 30, 2024', tourTime: '09:00-11:00', city: 'Ankara' },
  ];

  const rowsPerPage = 5; // Number of rows to display per page
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the visible rows based on pagination
  const startIndex = (currentPage - 1) * rowsPerPage;
  const visibleRows = dummyData.slice(startIndex, startIndex + rowsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className={styles.tableContainer}>
      <table className={styles.tourApplicationsTable}>
        <thead>
          <tr>
            <th>High School Name</th>
            <th>Priority</th>
            <th>Tour Date</th>
            <th>Tour Time</th>
            <th>High School City</th>
            <th>Contact</th>
            <th>Accept</th>
            <th>Reject</th>
          </tr>
        </thead>
        <tbody>
          {visibleRows.map((school, index) => (
            <tr key={index}>
              <td>{school.name}</td>
              <td>
                <div className={`${styles.priorityScore} ${styles[`priority-${school.priority}`]}`}>
                  {school.priority}
                </div>
              </td>
              <td>{school.tourDate}</td>
              <td>{school.tourTime}</td>
              <td>{school.city}</td>
              <td>
                <button className={styles.contactButton}>
                  <FaPhoneAlt />
                </button>
                <button className={styles.contactButton}>
                  <FaEnvelope />
                </button>
              </td>
              <td>
                <input type="checkbox" className={styles.checkbox} />
              </td>
              <td>
                <input type="checkbox" className={styles.checkbox} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Pagination */}
      <div className={styles.pagination}>
        <button
          className={styles.pageArrow}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          &lt;
        </button>
        {Array.from(
          { length: Math.ceil(dummyData.length / rowsPerPage) },
          (_, i) => (
            <button
              key={i}
              className={`${styles.pageButton} ${
                currentPage === i + 1 ? styles.activePageButton : ''
              }`}
              onClick={() => handlePageChange(i + 1)}
            >
              {i + 1}
            </button>
          )
        )}
        <button
          className={styles.pageArrow}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === Math.ceil(dummyData.length / rowsPerPage)}
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default TourApplicationsTable;