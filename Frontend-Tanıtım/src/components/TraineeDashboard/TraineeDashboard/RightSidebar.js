import React, { useState, useEffect } from 'react';
import styles from './TraineeDashboard.module.css';
import { FaBell, FaCog } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

const RightSidebar = () => {
  const [recentContacts, setRecentContacts] = useState([]);
  const [upcomingFairs, setUpcomingFairs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Current user info (this could come from auth context/state)
  const user = {
    name: 'Nabila A.',
    role: 'Trainee',
    profilePic: 'https://via.placeholder.com/40',
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch guides (recent contacts)
        const guidesResponse = await axios.get('http://localhost:8080/v1/user/guide');
        const guides = guidesResponse.data.slice(0, 5).map(guide => ({
          name: `${guide.firstName} ${guide.lastName}`,
          profilePic: guide.imagePath || 'https://via.placeholder.com/30'
        }));

        // Fetch upcoming fairs
        const fairsResponse = await axios.get('http://localhost:8080/v1/events');
        const fairs = fairsResponse.data
          .filter(event => !event.tourType) // Filter for fairs
          .slice(0, 4) // Take only first 4 fairs
          .map(fair => ({
            image: 'https://via.placeholder.com/50',
            organizationName: fair.name || 'Organization'
          }));

        setRecentContacts(guides);
        setUpcomingFairs(fairs);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Messages would typically come from a real-time system
  const messages = [
    {
      name: 'Tour Coordinator',
      time: '12:45 PM',
      message: 'New tour schedule available',
      profilePic: 'https://via.placeholder.com/30',
    },
    // ... more messages
  ];

  if (isLoading) return <div className={styles.rightSidebar}>Loading...</div>;
  if (error) return <div className={styles.rightSidebar}>Error: {error}</div>;

  return (
    <div className={styles.rightSidebar}>
      <div className={styles.topSection}>
        <div className={styles.userInfoWithIcons}>
          <div className={styles.userInfo}>
            <NavLink to="/traineedashboardprofile" className={styles.userAvatar}>
              <img src={user.profilePic} alt="User" className={styles.avatarImage} />
            </NavLink>
            <div>
              <p className={styles.userName}>{user.name}</p>
              <p className={styles.userRole}>{user.role}</p>
            </div>
          </div>

          <div className={styles.topIcons}>
            <NavLink to="/traineedashboardnotifications" className={styles.iconButton}>
              <FaBell className={styles.notificationIcon} />
              <span className={styles.notificationDot}></span>
            </NavLink>

            <NavLink to="/traineedashboardsettings" className={styles.iconButton}>
              <FaCog />
            </NavLink>
          </div>
        </div>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Recent Contacts</h3>
        <ul className={styles.contactList}>
          {recentContacts.map((contact, index) => (
            <li key={index} className={styles.contactItem}>
              <div className={styles.contactAvatar}>
                <img src={contact.profilePic} alt={contact.name} className={styles.avatarImage} />
              </div>
              <span className={styles.contactName}>{contact.name}</span>
              <button className={styles.contactButton}>
                <i className="fas fa-envelope" />
              </button>
            </li>
          ))}
        </ul>
        <NavLink to="/traineedashboardchat" className={styles.viewAllButton}>
          View All
        </NavLink>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Messages</h3>
        <ul className={styles.messageList}>
          {messages.map((message, index) => (
            <li key={index} className={styles.messageItem}>
              <div className={styles.messageAvatar}>
                <img src={message.profilePic} alt={message.name} className={styles.avatarImage} />
              </div>
              <div className={styles.messageContent}>
                <p className={styles.messageName}>{message.name}</p>
                <p className={styles.messageText}>{message.message}</p>
              </div>
              <span className={styles.messageTime}>{message.time}</span>
            </li>
          ))}
        </ul>
        <NavLink to="/traineedashboardchat" className={styles.viewAllButton}>
          View All
        </NavLink>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Upcoming Fairs</h3>
        <ul className={styles.fairList}>
          {upcomingFairs.map((fair, index) => (
            <li key={index} className={styles.fairItem}>
              <div className={styles.fairImage}>
                <img src={fair.image} alt="Fair" className={styles.fairImageContent} />
              </div>
              <p className={styles.fairTitle}>{fair.organizationName}</p>
            </li>
          ))}
        </ul>
        <NavLink to="/traineedashboardfairs" className={styles.viewAllButtonLast}>
          View All
        </NavLink>
      </div>
    </div>
  );
};

export default RightSidebar;