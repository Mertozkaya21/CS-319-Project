import React from 'react';
import styles from './HighSchoolForm.module.css';
import bilkentLogo from '../../../assets/bilkent-logo.png';

const Header = () => {
    return (
        <div className={styles.headerContainer}>
            {/* Bilkent logo */}
            <img src={bilkentLogo} alt="Bilkent Logo" className={styles.headerLogo} />
            {/* Text container */}
            <div className={styles.headerText}>
                <h1 className={styles.headerTitle}>Bilkent Üniversitesi</h1>
                <div className={styles.headerLine}></div>
                <h2 className={styles.headerSubtitle}>Kampüs Ziyaret Formu</h2>
            </div>
        </div>
    );
};

export default Header;