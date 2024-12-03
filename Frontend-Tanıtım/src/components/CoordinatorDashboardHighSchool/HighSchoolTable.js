import React, { useState } from 'react';
import styles from './CoordinatorDashboardHighSchool.module.css';
import { FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

const HighSchoolTable = () => {
  const dummyData = [
    { name: 'High School A', id: '#123456789', dateUpdated: 'Oct 25, 2023', city: 'Ankara', counselorName: 'Jane Doe', priority: 1 },
    { name: 'High School B', id: '#123456789', dateUpdated: 'Oct 25, 2023', city: 'Ankara', counselorName: 'Jane Doe', priority: 2 },
    { name: 'High School C', id: '#123456789', dateUpdated: 'Oct 25, 2023', city: 'Ankara', counselorName: 'Jane Doe', priority: 3 },
    { name: 'High School D', id: '#987654321', dateUpdated: 'Oct 26, 2023', city: 'Istanbul', counselorName: 'John Doe', priority: 4 },
    { name: 'High School E', id: '#987654321', dateUpdated: 'Oct 26, 2023', city: 'Istanbul', counselorName: 'John Doe', priority: 5 },
    { name: 'High School F', id: '#987654321', dateUpdated: 'Oct 27, 2023', city: 'Izmir', counselorName: 'Jane Doe', priority: 6 },
  ];

  const rowsPerPage = 5; // Number of rows to display per page
  const [currentPage, setCurrentPage] = useState(1);
  const [menuOpen, setMenuOpen] = useState(null);

  // Calculate the visible rows based on pagination
  const startIndex = (currentPage - 1) * rowsPerPage;
  const visibleRows = dummyData.slice(startIndex, startIndex + rowsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const toggleMenu = (index) => {
    setMenuOpen(menuOpen === index ? null : index); // Toggle menu
  };

  return (
    <div className={styles.tableContainer}>
      <table className={styles.highSchoolTable}>
        <thead>
          <tr>
            <th></th>
            <th>High School Name</th>
            <th>High School ID</th>
            <th>Date Updated</th>
            <th>City</th>
            <th>Counselor Name</th>
            <th>Counselor Contact</th>
            <th>Priority Score</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {visibleRows.map((school, index) => (
            <tr key={index}>
              <td>
                <input type="checkbox" />
              </td>
              <td>{school.name}</td>
              <td>{school.id}</td>
              <td>{school.dateUpdated}</td>
              <td>{school.city}</td>
              <td>{school.counselorName}</td>
              <td>
                <button className={styles.contactButton}>
                  <FaPhoneAlt />
                </button>
                <button className={styles.contactButton}>
                  <FaEnvelope />
                </button>
              </td>
              <td>
                <div className={styles.priorityScore}>{school.priority}</div>
              </td>
              <td>
                <div className={styles.actionMenu}>
                  <button
                    className={styles.moreButton}
                    onClick={() => toggleMenu(index)}
                  >
                    •••
                  </button>
                  {menuOpen === index && (
                    <div className={styles.dropdownMenu}>
                      <button
                        className={styles.dropdownMenuItem}
                        onClick={() => alert(`Editing ${school.name}`)}
                      >
                        Edit High School
                      </button>
                    </div>
                  )}
                </div>
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

export default HighSchoolTable;