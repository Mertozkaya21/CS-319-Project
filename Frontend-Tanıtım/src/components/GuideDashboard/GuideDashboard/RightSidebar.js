import React from 'react';
import styles from './GuideDashboard.module.css';
import { FaBell, FaCog } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

const RightSidebar = () => {
  return (
    <div className={styles.rightSidebar}>
      {/* Top Section: User Info and Icons */}
      <div className={styles.topSection}>
        {/* User Info and Notification/Settings in one row */}
        <div className={styles.userInfoWithIcons}>
          {/* User Info */}
          <div className={styles.userInfo}>
          <NavLink to="/guidedashboardprofile" className={styles.userAvatar}>
              <img
                src="https://via.placeholder.com/40" // Placeholder for now
                alt="User"
                className={styles.avatarImage}
              />
            </NavLink>
            <div>
              <p className={styles.userName}>Nabila A.</p>
              <p className={styles.userRole}>Guide</p>
            </div>
          </div>

          {/* Notification and Settings Icons */}
          <div className={styles.topIcons}>
            {/* Notification Button */}
          <NavLink to="/guidedashboardnotifications" className={styles.iconButton}>
            <FaBell className={styles.notificationIcon} />
            <span className={styles.notificationDot}></span>
          </NavLink>

          {/* Settings Button */}
          <NavLink to="/guidedashboardsettings" className={styles.iconButton}>
            <FaCog />
          </NavLink>
          </div>
        </div>
      </div>

      {/* Other Sections: Recent Contacts, Messages, Upcoming Fairs */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Recent Contacts</h3>
        <ul className={styles.contactList}>
          {['Samantha William', 'Tony Soap', 'Karen Hope', 'Jordan Nico', 'Nadila Adja'].map(
            (contact, index) => (
              <li key={index} className={styles.contactItem}>
                <div className={styles.contactAvatar}>
                  <img
                    src="https://via.placeholder.com/30"
                    alt={contact}
                    className={styles.avatarImage}
                  />
                </div>
                <span className={styles.contactName}>{contact}</span>
                <button className={styles.contactButton}>
                  <i className="fas fa-envelope" />
                </button>
              </li>
            )
          )}
        </ul>
        {/* Navigate to Chat Page */}
        <NavLink to="/guidedashboardchat" className={styles.viewAllButton}>
          View All
        </NavLink>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Messages</h3>
        <ul className={styles.messageList}>
          {[
            { name: 'Samantha William', time: '12:45 PM', message: 'Lorem ipsum dolor sit amet...' },
            { name: 'Tony Soap', time: '12:45 PM', message: 'Lorem ipsum dolor sit amet...' },
            { name: 'Jordan Nico', time: '12:45 PM', message: 'Lorem ipsum dolor sit amet...' },
            { name: 'Nadila Adja', time: '12:45 PM', message: 'Lorem ipsum dolor sit amet...' },
          ].map((message, index) => (
            <li key={index} className={styles.messageItem}>
              <div className={styles.messageAvatar}>
                <img
                  src="https://via.placeholder.com/30"
                  alt={message.name}
                  className={styles.avatarImage}
                />
              </div>
              <div className={styles.messageContent}>
                <p className={styles.messageName}>{message.name}</p>
                <p className={styles.messageText}>{message.message}</p>
              </div>
              <span className={styles.messageTime}>{message.time}</span>
            </li>
          ))}
        </ul>
        {/* Navigate to Chat Page */}
        <NavLink to="/guidedashboardchat" className={styles.viewAllButton}>
          View All
        </NavLink>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Upcoming Fairs</h3>
        <ul className={styles.fairList}>
          {[1, 2, 3, 4].map((fair, index) => (
            <li key={index} className={styles.fairItem}>
              <div className={styles.fairImage}>
                <img
                  src="https://via.placeholder.com/50"
                  alt="Fair"
                  className={styles.fairImageContent}
                />
              </div>
              <p className={styles.fairTitle}>Lorem ipsum dolor sit amet...</p>
            </li>
          ))}
        </ul>
        {/* Navigate to Tours and Fairs Page */}
        <NavLink to="/guidedashboardtoursandfairs" className={styles.viewAllButtonLast}>
          View All
        </NavLink>
      </div>
    </div>
  );
};

export default RightSidebar;