import React from 'react';
import styles from './CoordinatorDashboardFeedbackAnalysis.module.css';

const InfoCard = ({ title, value, icon, bgColor }) => {
  return (
    <div className={styles.infoCard}>
      <div
        className={styles.iconContainer}
        style={{ backgroundColor: bgColor }} // Dynamic background color
      >
        {icon}
      </div>
      <div className={styles.textContainer}>
        <div className={styles.value}>{value}</div>
        <div className={styles.title}>{title}</div>
      </div>
    </div>
  );
};

export default InfoCard;