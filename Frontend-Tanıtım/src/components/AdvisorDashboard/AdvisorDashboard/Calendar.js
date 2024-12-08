import React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar, PickersDay } from "@mui/x-date-pickers";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import styles from './AdvisorDashboard.module.css';

// Dummy data for events
const events = [
  { date: "2024-12-08", type: "tour" },
  { date: "2024-12-11", type: "tour" },
  { date: "2024-12-15", type: "tour" },
  { date: "2024-12-18", type: "fair" },
  { date: "2024-12-20", type: "fair" },
  { date: "2024-12-25", type: "tour" },
  { date: "2024-12-27", type: "fair" },
];

// Styled component for custom day rendering
const StyledPickersDay = styled(PickersDay)(({ theme, type }) => ({
  ...(type === "tour" && {
    backgroundColor: "#8a0303", // Red for tours
    color: "#ffffff",
    "&:hover": {
      backgroundColor: "#d64040",
    },
  }),
  ...(type === "fair" && {
    backgroundColor: "#4267B2", // Blue for fairs
    color: "#ffffff",
    "&:hover": {
      backgroundColor: "#567dc9",
    },
  }),
}));

const CustomCalendar = () => {
  const navigate = useNavigate();

  const renderDay = (date, selectedDate, pickersDayProps) => {
    const formattedDate = date.format("YYYY-MM-DD");
    const event = events.find((e) => e.date === formattedDate);
    const type = event?.type;

    return (
      <StyledPickersDay
        {...pickersDayProps}
        type={type}
        onClick={() => navigate("/coordinatorDashboardToursAndFairs")}
      />
    );
  };

  return (
    <div className="calendarWrapper">
  <h2 className="calendarTitle">Upcoming Events</h2>
  <div className={`${styles.calendarContainer} calendarHoverable`}>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        renderDay={renderDay}
        showDaysOutsideCurrentMonth
        dayOfWeekFormatter={(day) =>
          ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][day]
        }
      />
    </LocalizationProvider>
  </div>
</div>
  );
};

export default CustomCalendar;