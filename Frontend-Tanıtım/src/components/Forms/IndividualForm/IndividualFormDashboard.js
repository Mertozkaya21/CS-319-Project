import React from 'react';
import Header from './Header';
import Circles from './Circles';
import Form from './Form'; // Import the Form component
import styles from './IndividualForm.module.css';

const IndividualFormDashboard = () => {
  return (
    <>
      {/* Header Section */}
      <div className={styles.headerContainer}>
        <Header />
      </div>

      {/* Form Section */}
      <div className={styles.formContainer}>
        <Form />
      </div>

      {/* Circles Section */}
      <div className={styles.circlesContainer}>
        <Circles />
      </div>
    </>
  );
};

export default IndividualFormDashboard;