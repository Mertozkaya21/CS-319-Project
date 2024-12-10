import React from 'react';
import styles from './GuideDashboard.module.css';

const InfoCard = ({ title, value, icon, bgColor }) => {
  return (
    <div className={styles.infoCard}>
      <div
        className={styles.iconContainer}
        style={{ backgroundColor: bgColor }} // Dynamic circle color
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