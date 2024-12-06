import React, { useState } from 'react';
import styles from './CoordinatorDashboardToursAndFairs.module.css';
import Sidebar from "../CoordinatorDashboardCommon/Sidebar";
import { FaCalendarAlt, FaClock } from 'react-icons/fa';

const DashboardToursAndFairs = () => {
  const [currentMonth, setCurrentMonth] = useState('October');
  const [currentYear, setCurrentYear] = useState(2024);
  const [selectedDay, setSelectedDay] = useState(null);

  const calendarEvents = [
    { date: 10, type: 'tour', count: 2 },
    { date: 15, type: 'fair', count: 1 },
    { date: 18, type: 'tour', count: 1 },
    { date: 20, type: 'fair', count: 3 },
    { date: 29, type: 'tour', count: 1 },
  ];

  const scheduleDetails = [
    { date: 10, type: 'tour', time: '09:00 - 11:00' },
    { date: 10, type: 'fair', time: '10:00 - 12:00' },
    { date: 15, type: 'tour', time: '13:30 - 16:00' },
    { date: 18, type: 'fair', time: '14:00 - 16:00' },
    { date: 20, type: 'tour', time: '11:00 - 13:00' },
    { date: 29, type: 'tour', time: '09:00 - 11:00' },
  ];

  const daysInMonth = 31;
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const handleDayClick = (day) => {
    setSelectedDay(day);
  };

  const renderCalendarDays = () => {
    const days = [];
    for (let i = 1; i <= daysInMonth; i++) {
      const event = calendarEvents.find((e) => e.date === i);
      days.push(
        <div
          key={i}
          className={`${styles.calendarDay} ${
            event
              ? event.type === 'tour'
                ? styles.tourDay
                : styles.fairDay
              : ''
          }`}
          onClick={() => handleDayClick(i)}
        >
          <span>{i}</span>
          {event && (
            <div
              className={`${styles.eventIndicator} ${
                event.count > 1 ? styles.multiEvent : ''
              }`}
            >
              {event.count > 1 ? `${event.count}+` : ''}
            </div>
          )}
        </div>
      );
    }
    return days;
  };

  const filteredDetails = scheduleDetails.filter((event) => event.date === selectedDay);

  return (
    <div className={styles.dashboardContainer}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className={styles.mainContent}>
        {/* Header */}
        <div className={styles.header}>
          <h1 className={styles.headerTitle}>Tours & Fairs</h1>
          <div className={styles.userSection}>
            <div className={styles.avatarCircle}></div>
            <div className={styles.userInfoText}>
              <p className={styles.userName}>Nabila A.</p>
              <p className={styles.userRole}>Coordinator</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className={styles.contentSection}>
          {/* Calendar Section */}
          <div className={styles.calendarSection}>
            <div className={styles.calendarContainer}>
              <div className={styles.calendarHeader}>
                <select
                  value={currentMonth}
                  onChange={(e) => setCurrentMonth(e.target.value)}
                  className={styles.monthDropdown}
                >
                  {months.map((month) => (
                    <option key={month} value={month}>
                      {month}
                    </option>
                  ))}
                </select>
                <select
                  value={currentYear}
                  onChange={(e) => setCurrentYear(e.target.value)}
                  className={styles.yearDropdown}
                >
                  <option value={2023}>2023</option>
                  <option value={2024}>2024</option>
                  <option value={2025}>2025</option>
                </select>
              </div>
              <div className={styles.calendarGrid}>
                <div className={styles.dayLabel}>Mon</div>
                <div className={styles.dayLabel}>Tue</div>
                <div className={styles.dayLabel}>Wed</div>
                <div className={styles.dayLabel}>Thu</div>
                <div className={styles.dayLabel}>Fri</div>
                <div className={styles.dayLabel}>Sat</div>
                <div className={styles.dayLabel}>Sun</div>
                {renderCalendarDays()}
              </div>
            </div>
          </div>

          {/* Events Section */}
          <div className={styles.eventsSection}>
            <h3 className={styles.eventsTitle}>
              {selectedDay
                ? `Schedule Details - ${currentMonth} ${selectedDay}, ${currentYear}`
                : 'Upcoming Events'}
            </h3>
            {filteredDetails.length > 0 ? (
              filteredDetails.map((event, index) => (
                <div key={index} className={styles.eventCard}>
                  <div className={styles.eventType}>
                    {event.type === 'tour' ? 'Tour' : 'Fair'}
                  </div>
                  <div className={styles.eventDetails}>
                    <FaCalendarAlt className={styles.icon} />
                    <span>{`${currentMonth} ${event.date}, ${currentYear}`}</span>
                  </div>
                  <div className={styles.eventDetails}>
                    <FaClock className={styles.icon} />
                    <span>{event.time}</span>
                  </div>
                </div>
              ))
            ) : (
              <p className={styles.noEvents}>
                {selectedDay ? 'No events for this day' : 'No upcoming events'}
              </p>
            )}
            <button className={styles.viewAllButton}>View All</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardToursAndFairs;