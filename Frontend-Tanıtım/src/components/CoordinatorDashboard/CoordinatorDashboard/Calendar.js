import React, { useState } from "react";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  format,
  getDaysInMonth,
  startOfMonth,
  getDay,
  addDays,
} from "date-fns";
import styles from "./CoordinatorDashboard.module.css";

// Dummy data for events
const events = [
  { date: '2024-12-10', type: 'tour', time: '09:00 - 11:00' },
  { date: '2024-12-10', type: 'fair', time: '10:00 - 12:00' },
  { date: '2024-12-10', type: 'fair', time: '10:00 - 12:00' },
  { date: '2024-12-10', type: 'fair', time: '10:00 - 12:00' },
  { date: '2024-12-10', type: 'fair', time: '10:00 - 12:00' },
  { date: '2024-12-10', type: 'fair', time: '10:00 - 12:00' },
  { date: '2024-12-15', type: 'tour', time: '13:30 - 16:00' },
  { date: '2024-12-15', type: 'tour', time: '13:30 - 16:00' },
  { date: '2024-12-15', type: 'tour', time: '13:30 - 16:00' },
  { date: '2024-12-15', type: 'tour', time: '13:30 - 16:00' },
  { date: '2024-12-18', type: 'fair', time: '14:00 - 16:00' },
  { date: '2024-12-20', type: 'tour', time: '11:00 - 13:00' },
  { date: '2024-12-20', type: 'tour', time: '11:00 - 13:00' },
  { date: '2024-12-20', type: 'tour', time: '11:00 - 13:00' },
  { date: '2024-12-20', type: 'tour', time: '11:00 - 13:00' },
  { date: '2024-12-29', type: 'tour', time: '09:00 - 11:00' },
];

const CustomCalendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const navigate = useNavigate();

  const daysInMonth = getDaysInMonth(new Date(currentYear, currentMonth));
  const firstDayOfMonth = getDay(startOfMonth(new Date(currentYear, currentMonth)));

  const generateCalendarDays = () => {
    const days = [];
    const adjustedFirstDay = (firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1); // Adjust so Monday is the first day
    const totalCells = adjustedFirstDay + daysInMonth; // Account for empty days before the first day

    for (let i = 0; i < totalCells; i++) {
      if (i < adjustedFirstDay) {
        days.push(<div key={`empty-${i}`} className={styles.calendarDay}></div>);
      } else {
        const day = i - adjustedFirstDay + 1;
        const formattedDate = format(
          new Date(currentYear, currentMonth, day),
          "yyyy-MM-dd"
        );

        const eventsForDay = events.filter((e) => e.date === formattedDate);

        days.push(
          <div
            key={day}
            className={styles.calendarDay}
            onClick={() => navigate(`/coordinatorDashboardToursAndFairs`)}
          >
            <span>{day}</span>
            <div className={styles.eventIndicators}>
              {eventsForDay.slice(0, 2).map((event, idx) => (
                <div
                  key={idx}
                  className={`${styles.eventIndicator} ${
                    event.type === "tour" ? styles.tour : styles.fair
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

  return (
    <div className="calendarWrapper">
      <Typography
        variant="h6"
        sx={{
          fontWeight: "bold",
          color: "#374151",
          marginBottom: "16px",
          textAlign: "center",
        }}
      >
        Upcoming Events
      </Typography>

      <div className={styles.calendarContainer}>
        <div className={styles.calendarHeader}>
          {/* Previous Month Button */}
          <button
            className={styles.arrowButton}
            onClick={() => {
              if (currentMonth === 0) {
                setCurrentMonth(11);
                setCurrentYear(currentYear - 1);
              } else {
                setCurrentMonth(currentMonth - 1);
              }
            }}
          >
            &#8249;
          </button>

          {/* Month and Year Label */}
          <div className={styles.monthYearLabel}>
            {format(new Date(currentYear, currentMonth), "MMMM yyyy")}
          </div>

          {/* Next Month Button */}
          <button
            className={styles.arrowButton}
            onClick={() => {
              if (currentMonth === 11) {
                setCurrentMonth(0);
                setCurrentYear(currentYear + 1);
              } else {
                setCurrentMonth(currentMonth + 1);
              }
            }}
          >
            &#8250;
          </button>
        </div>

        {/* Day Labels */}
        <div className={styles.dayLabels}>
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, index) => (
            <div key={index} className={styles.dayLabel}>
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className={styles.calendarGrid}>{generateCalendarDays()}</div>
      </div>
    </div>
  );
};

export default CustomCalendar;