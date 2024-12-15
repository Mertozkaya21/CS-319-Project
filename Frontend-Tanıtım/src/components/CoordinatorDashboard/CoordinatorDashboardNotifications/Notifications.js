import React from "react";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import TimelineDot from "@mui/lab/TimelineDot";
import LaptopMacIcon from "@mui/icons-material/LaptopMac";
import Typography from "@mui/material/Typography";
import WarningIcon from "@mui/icons-material/Warning";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

const notifications = [
  { day: "Thursday", date: "Oct 31 2024", message: "Tour Application for High School X has been accepted", type: "success" },
  { day: "Thursday", date: "Oct 31 2024", message: "[REMINDER] Monthly Payment to Jane Doe has not been completed", type: "warning" },
  { day: "Thursday", date: "Oct 31 2024", message: "Tour Application for High School Y has been accepted", type: "success" },
  { day: "Thursday", date: "Oct 31 2024", message: "Feedback Analysis has been updated", type: "info" },
  { day: "Thursday", date: "Oct 31 2024", message: "Fair Invitation 23 has been accepted", type: "success" },
  { day: "Thursday", date: "Oct 31 2024", message: "[REMINDER] Monthly Payment to John Doe has not been completed", type: "warning" },
  { day: "Monday", date: "Oct 28 2024", message: "Feedback Analysis has been updated", type: "info" },
  { day: "Wednesday", date: "Oct 30 2024", message: "Tour Application for High School Z has been canceled", type: "error" },
  { day: "Wednesday", date: "Oct 30 2024", message: "Fair Invitation 22 has been accepted", type: "success" },
  { day: "Tuesday", date: "Oct 29 2024", message: "Monthly Payment to Anna Lee has been completed", type: "success" },
  { day: "Tuesday", date: "Oct 29 2024", message: "Fair Invitation 21 has been sent", type: "info" },
  { day: "Monday", date: "Oct 28 2024", message: "Tour Application for High School W has been resubmitted", type: "info" },
  { day: "Sunday", date: "Oct 27 2024", message: "Feedback Analysis has been reviewed", type: "info" },
  { day: "Saturday", date: "Oct 26 2024", message: "Tour Application for High School V has been approved", type: "success" },
  { day: "Friday", date: "Oct 25 2024", message: "[REMINDER] Fair Invitation 20 needs confirmation", type: "warning" },
  { day: "Thursday", date: "Oct 24 2024", message: "Monthly Payment to Robert Brown has not been completed", type: "warning" },
  { day: "Thursday", date: "Oct 24 2024", message: "Fair Invitation 19 has been accepted", type: "success" },
  { day: "Wednesday", date: "Oct 23 2024", message: "Feedback Analysis for this week has been generated", type: "info" },
  { day: "Tuesday", date: "Oct 22 2024", message: "Tour Application for High School U has been updated", type: "info" },
  { day: "Monday", date: "Oct 21 2024", message: "Monthly Payment to Laura Smith has been verified", type: "success" },
];

const getIcon = (type) => {
  switch (type) {
    case "success":
      return <CheckCircleIcon color="success" />;
    case "warning":
      return <WarningIcon color="warning" />;
    case "error":
      return <CancelIcon color="error" />;
    case "info":
    default:
      return <LaptopMacIcon color="primary" />;
  }
};

const Notifications = () => {
  return (
    <Timeline position="alternate">
      {notifications.map((item, index) => (
        <TimelineItem key={index}>
          {/* Opposite Content */}
          <TimelineOppositeContent
            sx={{ m: "auto 0" }}
            align={index % 2 === 0 ? "right" : "left"}
            variant="body2"
            color="text.secondary"
          >
            {item.day}, {item.date}
          </TimelineOppositeContent>

          {/* Timeline Dot */}
          <TimelineSeparator>
            <TimelineConnector />
            <TimelineDot>{getIcon(item.type)}</TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>

          {/* Timeline Content */}
          <TimelineContent sx={{ py: "12px", px: 2 }}>
            <Typography variant="h6" component="span">
              {item.type === "warning" ? "[REMINDER]" : "Notification"}
            </Typography>
            <Typography>{item.message.replace("[REMINDER]", "").trim()}</Typography>
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  );
};

export default Notifications;