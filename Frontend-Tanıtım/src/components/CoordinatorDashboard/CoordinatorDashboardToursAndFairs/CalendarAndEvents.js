// import React, { useState } from 'react';
// import styles from './CoordinatorDashboardToursAndFairs.module.css';
// import { FaCalendarAlt, FaClock } from 'react-icons/fa';

// const DashboardCalendarAndEvents = () => {
//   const [currentMonth, setCurrentMonth] = useState('October');
//   const [currentYear, setCurrentYear] = useState(2024);
//   const [selectedDay, setSelectedDay] = useState(null);

//   // Dummy data for calendar events
//   const calendarEvents = [
//     { date: 10, type: 'tour', count: 2 },
//     { date: 15, type: 'fair', count: 1 },
//     { date: 18, type: 'tour', count: 1 },
//     { date: 20, type: 'fair', count: 3 },
//     { date: 29, type: 'tour', count: 1 },
//   ];

//   // Dummy data for schedule details
//   const scheduleDetails = [
//     { date: 10, type: 'tour', time: '09:00 - 11:00' },
//     { date: 10, type: 'fair', time: '10:00 - 12:00' },
//     { date: 15, type: 'tour', time: '13:30 - 16:00' },
//     { date: 18, type: 'fair', time: '14:00 - 16:00' },
//     { date: 20, type: 'tour', time: '11:00 - 13:00' },
//     { date: 29, type: 'tour', time: '09:00 - 11:00' },
//   ];

//   const daysInMonth = 31; // Static for simplicity
//   const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

//   // Handle day click
//   const handleDayClick = (day) => {
//     setSelectedDay(day);
//   };

//   // Render calendar days
//   const renderCalendarDays = () => {
//     const days = [];
//     for (let i = 1; i <= daysInMonth; i++) {
//       const event = calendarEvents.find((e) => e.date === i);
//       days.push(
//         <div
//           key={i}
//           className={`${styles.calendarDay} ${
//             event
//               ? event.type === 'tour'
//                 ? styles.tourDay
//                 : styles.fairDay
//               : ''
//           }`}
//           onClick={() => handleDayClick(i)}
//         >
//           <span>{i}</span>
//           {event && (
//             <div
//               className={`${styles.eventIndicator} ${
//                 event.count > 1 ? styles.multiEvent : ''
//               }`}
//             >
//               {event.count > 1 ? `${event.count}+` : ''}
//             </div>
//           )}
//         </div>
//       );
//     }
//     return days;
//   };

//   // Filter schedule details for selected day
//   const filteredDetails = scheduleDetails.filter((event) => event.date === selectedDay);

//   return (
//     <div className={styles.dashboardContent}>
//       {/* Calendar Section */}
//       <div className={styles.calendarSection}>
//         <div className={styles.calendarContainer}>
//           <div className={styles.calendarHeader}>
//             <div className={styles.monthControls}>
//               <select
//                 value={currentMonth}
//                 onChange={(e) => setCurrentMonth(e.target.value)}
//                 className={styles.monthDropdown}
//               >
//                 {months.map((month) => (
//                   <option key={month} value={month}>
//                     {month}
//                   </option>
//                 ))}
//               </select>
//               <select
//                 value={currentYear}
//                 onChange={(e) => setCurrentYear(e.target.value)}
//                 className={styles.yearDropdown}
//               >
//                 <option value={2023}>2023</option>
//                 <option value={2024}>2024</option>
//                 <option value={2025}>2025</option>
//               </select>
//             </div>
//           </div>
//           <div className={styles.calendarGrid}>
//             <div className={styles.dayLabel}>Mon</div>
//             <div className={styles.dayLabel}>Tue</div>
//             <div className={styles.dayLabel}>Wed</div>
//             <div className={styles.dayLabel}>Thu</div>
//             <div className={styles.dayLabel}>Fri</div>
//             <div className={styles.dayLabel}>Sat</div>
//             <div className={styles.dayLabel}>Sun</div>
//             {renderCalendarDays()}
//           </div>
//         </div>
//       </div>

//       {/* Upcoming Events Section */}
//       <div className={styles.eventsSection}>
//         <h3 className={styles.eventsTitle}>
//           {selectedDay
//             ? `Schedule Details - ${currentMonth} ${selectedDay}, ${currentYear}`
//             : 'Upcoming Events'}
//         </h3>
//         {filteredDetails.length > 0 ? (
//           filteredDetails.map((event, index) => (
//             <div key={index} className={styles.eventCard}>
//               <div className={styles.eventType}>
//                 {event.type === 'tour' ? 'Tour' : 'Fair'}
//               </div>
//               <div className={styles.eventDetails}>
//                 <FaCalendarAlt className={styles.icon} />
//                 <span>{`${currentMonth} ${event.date}, ${currentYear}`}</span>
//               </div>
//               <div className={styles.eventDetails}>
//                 <FaClock className={styles.icon} />
//                 <span>{event.time}</span>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p className={styles.noEvents}>
//             {selectedDay
//               ? 'No events for this day'
//               : 'No upcoming events'}
//           </p>
//         )}
//         <button className={styles.viewAllButton}>View All</button>
//       </div>
//     </div>
//   );
// };

// export default DashboardCalendarAndEvents;