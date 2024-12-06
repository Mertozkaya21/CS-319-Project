import React, { useState } from 'react';
import styles from './CoordinatorDashboardFeedbackAnalysis.module.css';

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState('Oct 2024');

  // Dummy data for the calendar
  const events = [
    { date: 8, type: 'tour' },
    { date: 11, type: 'tour' },
    { date: 15, type: 'tour' },
    { date: 18, type: 'event' },
    { date: 20, type: 'event' },
    { date: 25, type: 'tour' },
    { date: 27, type: 'event' },
  ];

  // Function to toggle between months
  const toggleMonth = (direction) => {
    // In a real-world case, replace this with a dynamic month calculation
    if (direction === 'prev') {
      setCurrentMonth('Sep 2024');
    } else if (direction === 'next') {
      setCurrentMonth('Nov 2024');
    }
  };

  const renderDays = () => {
    const days = [];
    for (let i = 1; i <= 31; i++) {
      const event = events.find((e) => e.date === i);
      days.push(
        <div
          key={i}
          className={`${styles.calendarDay} ${
            event ? (event.type === 'tour' ? styles.tourDay : styles.eventDay) : ''
          }`}
        >
          {i}
        </div>
      );
    }
    return days;
  };

  return (
    <div className={styles.calendarContainer}>
      <div className={styles.calendarHeader}>
        <h2>Upcoming Events</h2>
        <div className={styles.calendarMonth}>
          <button
            className={styles.toggleMonthButton}
            onClick={() => toggleMonth('prev')}
          >
            &lt;
          </button>
          <span>{currentMonth}</span>
          <button
            className={styles.toggleMonthButton}
            onClick={() => toggleMonth('next')}
          >
            &gt;
          </button>
        </div>
      </div>
      <div className={styles.calendarGrid}>
        <div className={styles.calendarDayLabel}>Sun</div>
        <div className={styles.calendarDayLabel}>Mon</div>
        <div className={styles.calendarDayLabel}>Tue</div>
        <div className={styles.calendarDayLabel}>Wed</div>
        <div className={styles.calendarDayLabel}>Thu</div>
        <div className={styles.calendarDayLabel}>Fri</div>
        <div className={styles.calendarDayLabel}>Sat</div>
        {renderDays()}
      </div>
    </div>
  );
};

export default Calendar;