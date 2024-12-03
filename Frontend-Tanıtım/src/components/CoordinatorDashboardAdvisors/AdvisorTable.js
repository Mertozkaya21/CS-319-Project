import React, { useState } from 'react';
import styles from './CoordinatorDashboardAdvisors.module.css';
import { FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

const AdvisorsTable = () => {
  const dummyData = [
    { name: 'Samanta William', id: '#123456789', dateAdded: 'Oct 25, 2023', tours: 23, city: 'Ankara' },
    { name: 'Tony Soap', id: '#123456789', dateAdded: 'Oct 25, 2023', tours: 23, city: 'Ankara' },
    { name: 'Karen Hope', id: '#123456789', dateAdded: 'Oct 25, 2023', tours: 23, city: 'Ankara' },
    { name: 'Jordan Nico', id: '#987654321', dateAdded: 'Oct 26, 2023', tours: 23, city: 'Ankara' },
    { name: 'Nadila Adja', id: '#987654321', dateAdded: 'Oct 26, 2023', tours: 23, city: 'Ankara' },
    { name: 'Johnny Ahmad', id: '#987654321', dateAdded: 'Oct 27, 2023', tours: 23, city: 'Ankara' },
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
      <table className={styles.advisorsTable}>
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Advisor ID</th>
            <th>Date Added</th>
            <th>Number of Tours Conducted</th>
            <th>City</th>
            <th>Contact</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {visibleRows.map((advisor, index) => (
            <tr key={index}>
              <td>
                <input type="checkbox" />
              </td>
              <td>{advisor.name}</td>
              <td>{advisor.id}</td>
              <td>{advisor.dateAdded}</td>
              <td>{advisor.tours}</td>
              <td>{advisor.city}</td>
              <td>
                <button className={styles.contactButton}>
                  <FaPhoneAlt />
                </button>
                <button className={styles.contactButton}>
                  <FaEnvelope />
                </button>
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
                        onClick={() => alert(`Editing ${advisor.name}`)}
                      >
                        Edit Advisor
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

export default AdvisorsTable;