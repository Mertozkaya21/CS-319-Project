import React, { useState } from 'react';
import styles from './CoordinatorDashboardGuides.module.css';
import { FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

const GuidesTable = () => {
  const dummyData = [
    { name: 'Samanta William', id: '#123456789', dateAdded: 'Oct 25, 2023', tours: 23 },
    { name: 'Tony Soap', id: '#123456789', dateAdded: 'Oct 25, 2023', tours: 23 },
    { name: 'Karen Hope', id: '#123456789', dateAdded: 'Oct 25, 2023', tours: 23 },
    { name: 'Jordan Nico', id: '#987654321', dateAdded: 'Oct 26, 2023', tours: 23 },
    { name: 'Nadila Adja', id: '#987654321', dateAdded: 'Oct 26, 2023', tours: 23 },
    { name: 'Johnny Ahmad', id: '#987654321', dateAdded: 'Oct 27, 2023', tours: 23 },
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
      <table className={styles.guidesTable}>
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Guide ID</th>
            <th>Date Added</th>
            <th>Number of Tours Conducted</th>
            <th>View Schedule</th>
            <th>Contact</th>
          </tr>
        </thead>
        <tbody>
          {visibleRows.map((guide, index) => (
            <tr key={index}>
              <td>
                <input type="checkbox" />
              </td>
              <td>{guide.name}</td>
              <td>{guide.id}</td>
              <td>{guide.dateAdded}</td>
              <td>{guide.tours}</td>
              <td>
                <button className={styles.scheduleButton}>See Schedule</button>
              </td>
              <td>
                <button className={styles.contactButton}>
                  <FaPhoneAlt />
                </button>
                <button className={styles.contactButton}>
                  <FaEnvelope />
                </button>
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

export default GuidesTable;