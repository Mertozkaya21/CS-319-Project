import React from 'react';
import styles from './HighSchoolForm.module.css';

const Circles = () => {
  return (
    <div className={styles.circlesContainer}>
      <div className={styles.circleLarge}></div>
      <div className={styles.circleMedium}></div>
      <div className={styles.circleSmall}></div>
    </div>
  );
};

export default Circles;