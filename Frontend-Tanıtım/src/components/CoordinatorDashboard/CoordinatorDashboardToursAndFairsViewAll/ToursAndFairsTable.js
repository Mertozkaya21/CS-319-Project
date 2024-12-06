import React, { useState } from 'react';
import styles from './CoordinatorDashboardToursAndFairsViewAll.module.css';
import { FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

const ToursAndFairsTable = () => {
  const dummyData = [
    { name: 'High School A', id: '#123456789', dateUpdated: 'Oct 25, 2023', city: 'Ankara', counselorName: 'Jane Doe', priority: 1 },
    { name: 'High School B', id: '#123456789', dateUpdated: 'Oct 25, 2023', city: 'Ankara', counselorName: 'Jane Doe', priority: 2 },
    { name: 'High School C', id: '#123456789', dateUpdated: 'Oct 25, 2023', city: 'Ankara', counselorName: 'Jane Doe', priority: 3 },
    { name: 'High School D', id: '#987654321', dateUpdated: 'Oct 26, 2023', city: 'Istanbul', counselorName: 'John Doe', priority: 4 },
    { name: 'High School E', id: '#987654321', dateUpdated: 'Oct 26, 2023', city: 'Istanbul', counselorName: 'John Doe', priority: 5 },
    { name: 'High School F', id: '#987654321', dateUpdated: 'Oct 27, 2023', city: 'Izmir', counselorName: 'Jane Doe', priority: 6 },
  ];

  const rowsPerPage = 5; // Rows per page
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page) => setCurrentPage(page);

  const startIndex = (currentPage - 1) * rowsPerPage;
  const visibleRows = dummyData.slice(startIndex, startIndex + rowsPerPage);

  return (
    <div className={styles.tableContainer}>
      <table className={styles.highSchoolTable}>
        <thead>
          <tr>
            <th>Event</th>
            <th>High School Name</th>
            <th>Guide</th>
            <th>Event Date</th>
            <th>Event Time</th>
            <th>City</th>
            <th>Contact</th>
          </tr>
        </thead>
        <tbody>
          {visibleRows.map((school, index) => (
            <tr key={index}>
              <td>Tour</td>
              <td>{school.name}</td>
              <td>{school.counselorName}</td>
              <td>{school.dateUpdated}</td>
              <td>09:00 - 11:00</td>
              <td>{school.city}</td>
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

export default ToursAndFairsTable;