import React, { useState } from 'react';
import styles from './CoordinatorDashboardFairApplications.module.css';
import { FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

const FairApplicationsTable = () => {
  const dummyData = [
    { name: 'Organization A', fairDate: 'Oct 30, 2024', fairTime: '09:00-11:00', city: 'Ankara' },
    { name: 'Organization B', fairDate: 'Oct 30, 2024', fairTime: '09:00-11:00', city: 'Antalya' },
    { name: 'Organization C', fairDate: 'Oct 30, 2024', fairTime: '09:00-11:00', city: 'Konya' },
    { name: 'Organization D', fairDate: 'Oct 30, 2024', fairTime: '09:00-11:00', city: 'Istanbul' },
    { name: 'Organization E', fairDate: 'Oct 30, 2024', fairTime: '09:00-11:00', city: 'Konya' },
    { name: 'Organization F', fairDate: 'Oct 30, 2024', fairTime: '09:00-11:00', city: 'Ankara' },
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
      <table className={styles.fairApplicationsTable}>
        <thead>
          <tr>
            <th>Organization</th>
            <th>Fair Date</th>
            <th>Fair Time</th>
            <th>Fair City</th>
            <th>Organizer Contact</th>
            <th>Accept</th>
            <th>Reject</th>
          </tr>
        </thead>
        <tbody>
          {visibleRows.map((organization, index) => (
            <tr key={index}>
              <td>{organization.name}</td>
              <td>{organization.fairDate}</td>
              <td>{organization.fairTime}</td>
              <td>{organization.city}</td>
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

export default FairApplicationsTable;