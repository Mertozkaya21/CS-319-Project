import React from 'react';
import styles from './AdvisorDashboard.module.css';
import { FaBell, FaCog } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';


// Dummy Data
const dummyData = {
  user: {
    name: 'Nabila A.',
    role: 'Advisor',
    profilePic: 'https://via.placeholder.com/40',
  },
  recentContacts: [
    { name: 'Samantha William', profilePic: 'https://via.placeholder.com/30' },
    { name: 'Tony Soap', profilePic: 'https://via.placeholder.com/30' },
    { name: 'Karen Hope', profilePic: 'https://via.placeholder.com/30' },
    { name: 'Jordan Nico', profilePic: 'https://via.placeholder.com/30' },
    { name: 'Nadila Adja', profilePic: 'https://via.placeholder.com/30' },
  ],
  messages: [
    {
      name: 'Samantha William',
      time: '12:45 PM',
      message: 'Lorem ipsum dolor sit amet...',
      profilePic: 'https://via.placeholder.com/30',
    },
    {
      name: 'Tony Soap',
      time: '12:45 PM',
      message: 'Lorem ipsum dolor sit amet...',
      profilePic: 'https://via.placeholder.com/30',
    },
    {
      name: 'Jordan Nico',
      time: '12:45 PM',
      message: 'Lorem ipsum dolor sit amet...',
      profilePic: 'https://via.placeholder.com/30',
    },
    {
      name: 'Nadila Adja',
      time: '12:45 PM',
      message: 'Lorem ipsum dolor sit amet...',
      profilePic: 'https://via.placeholder.com/30',
    },
  ],
  upcomingFairs: [
    { image: 'https://via.placeholder.com/50', organizationName: 'Organisation 1' },
    { image: 'https://via.placeholder.com/50', organizationName: 'Organisation 2' },
    { image: 'https://via.placeholder.com/50', organizationName: 'Organisation 3' },
    { image: 'https://via.placeholder.com/50', organizationName: 'Organisation 4' },
  ],
};

const RightSidebar = () => {
  return (
    <div className={styles.rightSidebar}>
      {/* Top Section: User Info and Icons */}
      <div className={styles.topSection}>
        {/* User Info and Notification/Settings in one row */}
        <div className={styles.userInfoWithIcons}>
          {/* User Info */}
          <div className={styles.userInfo}>
          <NavLink to="/advisordashboardprofile" className={styles.userAvatar}>
              <img
                src={dummyData.user.profilePic}
                alt="User"
                className={styles.avatarImage}
              />
            </NavLink>
            <div>
              <p className={styles.userName}>{dummyData.user.name}</p>
              <p className={styles.userRole}>{dummyData.user.role}</p>
            </div>
          </div>

          
          {/* Notification and Settings Icons */}
          <div className={styles.topIcons}>
            {/* Notification Button */}
            <NavLink to="/advisordashboardnotifications" className={styles.iconButton}>
              <FaBell className={styles.notificationIcon} />
              <span className={styles.notificationDot}></span>
            </NavLink>

          {/* Settings Button */}
          <NavLink to="/advisordashboardsettings" className={styles.iconButton}>
              <FaCog />
            </NavLink>
          </div>
        </div>
      </div>

      {/* Other Sections: Recent Contacts, Messages, Upcoming Fairs */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Recent Contacts</h3>
        <ul className={styles.contactList}>
          {dummyData.recentContacts.map((contact, index) => (
            <li key={index} className={styles.contactItem}>
              <div className={styles.contactAvatar}>
                <img
                  src={contact.profilePic}
                  alt={contact.name}
                  className={styles.avatarImage}
                />
              </div>
              <span className={styles.contactName}>{contact.name}</span>
              <button className={styles.contactButton}>
                <i className="fas fa-envelope" />
              </button>
            </li>
          ))}
        </ul>
        <NavLink to="/advisordashboardchat" className={styles.viewAllButton}>
          View All
        </NavLink>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Messages</h3>
        <ul className={styles.messageList}>
          {dummyData.messages.map((message, index) => (
            <li key={index} className={styles.messageItem}>
              <div className={styles.messageAvatar}>
                <img
                  src={message.profilePic}
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
        <NavLink to="/advisordashboardchat" className={styles.viewAllButton}>
          View All
        </NavLink>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Upcoming Fairs</h3>
        <ul className={styles.fairList}>
          {dummyData.upcomingFairs.map((fair, index) => (
            <li key={index} className={styles.fairItem}>
              <div className={styles.fairImage}>
                <img
                  src={fair.image}
                  alt="Fair"
                  className={styles.fairImageContent}
                />
              </div>
              <p className={styles.fairTitle}>{fair.organizationName}</p>
            </li>
          ))}
        </ul>
        <NavLink to="/advisordashboardtoursandfairs" className={styles.viewAllButtonLast}>
          View All
        </NavLink>
      </div>
    </div>
  );
};

export default RightSidebar;