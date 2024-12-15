import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Sidebar from '../CoordinatorDashboardCommon/Sidebar';
import { FaCalendarAlt, FaClock } from 'react-icons/fa';
import { format, getDaysInMonth, startOfMonth, getDay, addDays } from 'date-fns';
import styles from './CoordinatorDashboardToursAndFairs.module.css';
import Header from './Header';

const DashboardToursAndFairs = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth()); // Current month (0-based)
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [selectedDay, setSelectedDay] = useState(null);
 
  const scheduleDetails = [
    { date: '2024-12-10', eventType: 'tour', time: '09:00 - 11:00' },
    { date: '2024-12-10', eventType: 'fair', time: '10:00 - 12:00' },
    { date: '2024-12-10', eventType: 'fair', time: '10:00 - 12:00' },
    { date: '2024-12-10', eventType: 'fair', time: '10:00 - 12:00' },
    { date: '2024-12-10', eventType: 'fair', time: '10:00 - 12:00' },
    { date: '2024-12-10', eventType: 'fair', time: '10:00 - 12:00' },
    { date: '2024-12-15', eventType: 'tour', time: '13:30 - 16:00' },
    { date: '2024-12-15', eventType: 'tour', time: '13:30 - 16:00' },
    { date: '2024-12-15', eventType: 'tour', time: '13:30 - 16:00' },
    { date: '2024-12-15', eventType: 'tour', time: '13:30 - 16:00' },
    { date: '2024-12-18', eventType: 'fair', time: '14:00 - 16:00' },
    { date: '2024-12-20', eventType: 'tour', time: '11:00 - 13:00' },
    { date: '2024-12-20', eventType: 'tour', time: '11:00 - 13:00' },
    { date: '2024-12-20', eventType: 'tour', time: '11:00 - 13:00' },
    { date: '2024-12-20', eventType: 'tour', time: '11:00 - 13:00' },
    { date: '2024-12-29', eventType: 'tour', time: '09:00 - 11:00' },
  ];

  const daysInMonth = getDaysInMonth(new Date(currentYear, currentMonth));
  const firstDayOfMonth = getDay(startOfMonth(new Date(currentYear, currentMonth)));

  const generateCalendarDays = () => {
    const days = [];
    const adjustedFirstDay = (firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1); // Adjust so Monday is the first day
    const totalCells = adjustedFirstDay + daysInMonth; // Account for empty days before the first day
  
    for (let i = 0; i < totalCells; i++) {
      if (i < adjustedFirstDay) {
        days.push(<div key={`empty-${i}`} className={styles.calendarDay}></div>); // Empty cells
      } else {
        const day = i - adjustedFirstDay + 1;
        const formattedDate = format(
          new Date(currentYear, currentMonth, day),
          'yyyy-MM-dd'
        );
  
        const eventsForDay = scheduleDetails.filter(
          (event) => event.date === formattedDate
        );
  
        days.push(
          <div
            key={day}
            className={`${styles.calendarDay} ${
              selectedDay === formattedDate ? styles.selected : ''
            }`}
            onClick={() => setSelectedDay(formattedDate)}
          >
            <span>{day}</span>
            <div className={styles.eventIndicators}>
              {eventsForDay.slice(0, 2).map((event, idx) => (
                <div
                  key={idx}
                  className={`${styles.eventIndicator} ${
                    event.eventType === 'tour' ? styles.tour : styles.fair
                  }`}
                ></div>
              ))}
              {eventsForDay.length > 2 && (
                <div className={`${styles.eventIndicator} ${styles.more}`}>
                  +{eventsForDay.length - 2}
                </div>
              )}
            </div>
          </div>
        );
      }
    }
    return days;
  };

  const filteredDetails = scheduleDetails.filter((event) => event.date === selectedDay);

  return ( 
    <div className={styles.dashboardContainer}>
      <Sidebar />
      <div className={styles.mainContent}>
        <Header title="Tours & Fairs" />
        <div className={styles.contentSection}>
        <div className={styles.calendarSection}>
          <div className={styles.calendarHeader}>
            {/* Previous Month Button */}
            <button
              className={styles.arrowButton}
              onClick={() => {
                if (currentMonth === 0) {
                  setCurrentMonth(11); // December
                  setCurrentYear(currentYear - 1);
                } else {
                  setCurrentMonth(currentMonth - 1);
                }
              }}
            >
              &#8249; {/* Left arrow */}
            </button>

            {/* Month and Year Label */}
            <div className={styles.monthYearLabel}>
              {format(new Date(currentYear, currentMonth), 'MMMM yyyy')}
            </div>

            {/* Next Month Button */}
            <button
              className={styles.arrowButton}
              onClick={() => {
                if (currentMonth === 11) {
                  setCurrentMonth(0); // January
                  setCurrentYear(currentYear + 1);
                } else {
                  setCurrentMonth(currentMonth + 1);
                }
              }}
            >
              &#8250; {/* Right arrow */}
            </button>
          </div>

          <div className={styles.calendarContainer}>
            {/* Days of the Week */}
            <div className={styles.dayLabels}>
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
                <div key={index} className={styles.dayLabel}>
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Grid */}
            <div className={styles.calendarGrid}>{generateCalendarDays()}</div>
          </div>
        </div>

          <div className={styles.eventsSection}>
            <h3 className={styles.eventsTitle}>
              {selectedDay ? `Schedule Details - ${selectedDay}` : 'Upcoming Events'}
            </h3>
            <div className={styles.eventsList}>
              {filteredDetails.length > 0 ? (
                filteredDetails.map((event, idx) => (
                  <div key={idx} className={styles.eventCard}>
                    <div className={styles.eventType}>
                      {event.eventType === 'tour' ? 'Tour' : 'Fair'}
                    </div>
                    <div className={styles.eventDetails}>
                      <FaCalendarAlt />
                      <span>{event.date}</span>
                    </div>
                    <div className={styles.eventDetails}>
                      <FaClock />
                      <span>{event.time}</span>
                    </div>
                  </div>
                ))
              ) : (
                <p>No events for this day</p>
              )}
            </div>
            <NavLink to="/coordinatordashboardtoursandfairsviewall" className={styles.viewAllButton}>
              View All
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardToursAndFairs;
