import React from 'react';
import { NavLink } from 'react-router-dom'; // Removed useLocation
import {
  FaHome,
  FaSchool,
  FaUser,
  FaUsers,
  FaClipboard,
  FaHandshake,
  FaMapMarkerAlt,
  FaDollarSign,
  FaChartBar,
  FaUserCircle,
  FaEnvelope,
  FaCog,
} from 'react-icons/fa';
import styles from './CoordinatorDashboardToursAndFairsViewAll.module.css'; // Adjust path if necessary
import bilkentLogo from '../../assets/bilkent-logo.png';

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      {/* Logo Section */}
      <div className={styles.logo}>
        <img src={bilkentLogo} alt="Bilkent Logo" className={styles.logoImage} />
        <h2>Bilkent Tours</h2>
      </div>

      {/* Navigation Links */}
      <nav className={styles.nav}>
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive
              ? `${styles.navItem} ${styles.active}`
              : styles.navItem
          }
        >
          <FaHome className={styles.icon} />
          <span>Dashboard</span>
        </NavLink>
        <NavLink
          to="/high-schools"
          className={({ isActive }) =>
            isActive
              ? `${styles.navItem} ${styles.active}`
              : styles.navItem
          }
        >
          <FaSchool className={styles.icon} />
          <span>High Schools</span>
        </NavLink>
        <NavLink
          to="/advisors"
          className={({ isActive }) =>
            isActive
              ? `${styles.navItem} ${styles.active}`
              : styles.navItem
          }
        >
          <FaUser className={styles.icon} />
          <span>Advisors</span>
        </NavLink>
        <NavLink
          to="/guides"
          className={({ isActive }) =>
            isActive
              ? `${styles.navItem} ${styles.active}`
              : styles.navItem
          }
        >
          <FaUsers className={styles.icon} />
          <span>Guides</span>
        </NavLink>
        <NavLink
          to="/trainees"
          className={({ isActive }) =>
            isActive
              ? `${styles.navItem} ${styles.active}`
              : styles.navItem
          }
        >
          <FaClipboard className={styles.icon} />
          <span>Trainees</span>
        </NavLink>
        <NavLink
          to="/tour-applications"
          className={({ isActive }) =>
            isActive
              ? `${styles.navItem} ${styles.active}`
              : styles.navItem
          }
        >
          <FaHandshake className={styles.icon} />
          <span>Tour Applications</span>
        </NavLink>
        <NavLink
          to="/fair-applications"
          className={({ isActive }) =>
            isActive
              ? `${styles.navItem} ${styles.active}`
              : styles.navItem
          }
        >
          <FaMapMarkerAlt className={styles.icon} />
          <span>Fair Applications</span>
        </NavLink>
        <NavLink
          to="/tours-fairs"
          className={({ isActive }) =>
            isActive
              ? `${styles.navItem} ${styles.active}`
              : styles.navItem
          }
        >
          <FaMapMarkerAlt className={styles.icon} />
          <span>Tours & Fairs</span>
        </NavLink>
        <NavLink
          to="/payments"
          className={({ isActive }) =>
            isActive
              ? `${styles.navItem} ${styles.active}`
              : styles.navItem
          }
        >
          <FaDollarSign className={styles.icon} />
          <span>Payments</span>
        </NavLink>
        <NavLink
          to="/feedback-analysis"
          className={({ isActive }) =>
            isActive
              ? `${styles.navItem} ${styles.active}`
              : styles.navItem
          }
        >
          <FaChartBar className={styles.icon} />
          <span>Feedback Analysis</span>
        </NavLink>
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            isActive
              ? `${styles.navItem} ${styles.active}`
              : styles.navItem
          }
        >
          <FaUserCircle className={styles.icon} />
          <span>Profile</span>
        </NavLink>
        <NavLink
          to="/chat"
          className={({ isActive }) =>
            isActive
              ? `${styles.navItem} ${styles.active}`
              : styles.navItem
          }
        >
          <FaEnvelope className={styles.icon} />
          <span>Chat</span>
        </NavLink>
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            isActive
              ? `${styles.navItem} ${styles.active}`
              : styles.navItem
          }
        >
          <FaCog className={styles.icon} />
          <span>Settings</span>
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;