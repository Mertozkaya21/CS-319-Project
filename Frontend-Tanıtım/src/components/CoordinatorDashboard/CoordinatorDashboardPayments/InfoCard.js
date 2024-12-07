import React from 'react';
import styles from './CoordinatorDashboardPayments.module.css';

const InfoCard = ({ title, value, icon, bgColor, subtitle }) => {
  return (
    <div className={styles.infoCard}>
      <div
        className={styles.iconContainer}
        style={{ backgroundColor: bgColor }} // Dynamic circle color
      >
        {icon}
      </div>
      <div className={styles.textContainer}>
        <div className={styles.title}>{title}</div>
        <div className={styles.value}>{value}</div>
        <div className={styles.subtitle}>{subtitle}</div> {/* Subtitle for percentage */}
      </div>
    </div>
  );
};

export default InfoCard;