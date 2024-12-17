import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import SchoolIcon from "@mui/icons-material/School";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import MenuItem from "@mui/material/MenuItem";
import PersonIcon from "@mui/icons-material/Person";
import EventIcon from "@mui/icons-material/Event";
import PeopleIcon from "@mui/icons-material/People";
import CommentIcon from "@mui/icons-material/Comment";
import { NavLink } from "react-router-dom";

// Dummy Data. replace with data from database
export const tourApplicationsRows = [
  {
    id: 1,
    name: 'John Smith',
    email: 'john.smith@example.com',
    phone: '555-123-4561',
    city: 'New York',
    date: '2024-01-15',
    timeSlot: '10:00 - 12:00',
    departmentOfInterest: 'Computer Science',
    numberOfAttendees: 3,
    comments: 'Looking forward to the tour.',
  },
  {
    id: 2,
    name: 'Emily Johnson',
    email: 'emily.johnson@example.com',
    phone: '555-123-4562',
    city: 'Los Angeles',
    date: '2024-01-20',
    timeSlot: '14:00 - 16:00',
    departmentOfInterest: 'Business Administration',
    numberOfAttendees: 2,
    comments: 'Please provide parking information.',
  },
  {
    id: 3,
    name: 'Michael Williams',
    email: 'michael.williams@example.com',
    phone: '555-123-4563',
    city: 'Chicago',
    date: '2024-01-25',
    timeSlot: '09:00 - 11:00',
    departmentOfInterest: 'Engineering',
    numberOfAttendees: 4,
    comments: 'Interested in meeting faculty.',
  },
  {
    id: 4,
    name: 'Sophia Brown',
    email: 'sophia.brown@example.com',
    phone: '555-123-4564',
    city: 'Houston',
    date: '2024-02-01',
    timeSlot: '11:00 - 13:00',
    departmentOfInterest: 'Architecture',
    numberOfAttendees: 1,
    comments: 'Please confirm availability.',
  },
  {
    id: 5,
    name: 'James Davis',
    email: 'james.davis@example.com',
    phone: '555-123-4565',
    city: 'Phoenix',
    date: '2024-02-05',
    timeSlot: '15:00 - 17:00',
    departmentOfInterest: 'Law',
    numberOfAttendees: 2,
    comments: 'Will the library be open?',
  },
  {
    id: 6,
    name: 'Olivia Miller',
    email: 'olivia.miller@example.com',
    phone: '555-123-4566',
    city: 'Philadelphia',
    date: '2024-02-10',
    timeSlot: '13:00 - 15:00',
    departmentOfInterest: 'Medicine',
    numberOfAttendees: 3,
    comments: 'Are refreshments provided?',
  },
  {
    id: 7,
    name: 'William Garcia',
    email: 'william.garcia@example.com',
    phone: '555-123-4567',
    city: 'San Antonio',
    date: '2024-02-15',
    timeSlot: '08:00 - 10:00',
    departmentOfInterest: 'Psychology',
    numberOfAttendees: 4,
    comments: 'Do we need prior registration?',
  },
  {
    id: 8,
    name: 'Mia Martinez',
    email: 'mia.martinez@example.com',
    phone: '555-123-4568',
    city: 'San Diego',
    date: '2024-02-20',
    timeSlot: '12:00 - 14:00',
    departmentOfInterest: 'Art and Design',
    numberOfAttendees: 1,
    comments: 'Excited to visit!',
  },
  {
    id: 9,
    name: 'Alexander Wilson',
    email: 'alexander.wilson@example.com',
    phone: '555-123-4569',
    city: 'Dallas',
    date: '2024-02-25',
    timeSlot: '10:00 - 12:00',
    departmentOfInterest: 'Education',
    numberOfAttendees: 5,
    comments: 'Are there group discounts?',
  },
  {
    id: 10,
    name: 'Charlotte Anderson',
    email: 'charlotte.anderson@example.com',
    phone: '555-123-4570',
    city: 'San Jose',
    date: '2024-03-01',
    timeSlot: '16:00 - 18:00',
    departmentOfInterest: 'Environmental Science',
    numberOfAttendees: 2,
    comments: 'Interested in campus sustainability programs.',
  },
];

const Table = () => {
  const { id } = useParams(); // Extract ID from URL params
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    date: "",
    timeSlot: "",
    departmentOfInterest: "",
    numberOfAttendees: "",
    comments: "",
  });
  
  // Fetch Event Data
  useEffect(() => {
    const fetchEventData = () => {
      const event = tourApplicationsRows.find((row) => row.id === Number(id));
      if (event) {
        setFormData(event);
      }
    };
    fetchEventData();
  }, [id]);

  // Handle Editable Input Change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Data:", formData);
    alert("Event details updated successfully!");
  };

  return (
    <Box
      sx={{
        backgroundColor: "#ffffff",
        borderRadius: "12px",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        marginTop: "-30px", // Moves the table up by 40px
      }}
    >
      {/* Header */}
      <Box
        sx={{
          backgroundColor: "#8a0303",
          padding: "10px 20px",
          borderRadius: "12px 12px 0 0",
          color: "white",
          fontSize: "18px",
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        Tour Details
      </Box>
      {/* Form */}
      <Box
        component="form"
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
          gap: 3,
          padding: "20px",
        }}
        onSubmit={handleSubmit}
      >
        {/* Non-Editable Fields */}
        <TextField
          label="Name"
          value={formData.name}
          fullWidth
          InputProps={{
            startAdornment: <InputAdornment position="start"><PersonIcon /></InputAdornment>,
            readOnly: true,
            style: { color: "#9e9e9e" },
          }}
        />
        <TextField
          label="Email"
          value={formData.email}
          fullWidth
          InputProps={{
            startAdornment: <InputAdornment position="start"><EmailIcon /></InputAdornment>,
            readOnly: true,
            style: { color: "#9e9e9e" },
          }}
        />
        <TextField
          label="Phone"
          value={formData.phone}
          fullWidth
          InputProps={{
            startAdornment: <InputAdornment position="start"><PhoneIcon /></InputAdornment>,
            readOnly: true,
            style: { color: "#9e9e9e" },
          }}
        />
        <TextField
          label="City"
          value={formData.city}
          fullWidth
          InputProps={{
            startAdornment: <InputAdornment position="start"><LocationCityIcon /></InputAdornment>,
            readOnly: true,
            style: { color: "#9e9e9e" },
          }}
        />
        <TextField
          label="Department of Interest"
          value={formData.departmentOfInterest}
          fullWidth
          InputProps={{
            startAdornment: <InputAdornment position="start"><SchoolIcon /></InputAdornment>,
            readOnly: true,
            style: { color: "#9e9e9e" },
          }}
        />
        <TextField
          label="Number of Attendees"
          value={formData.numberOfAttendees}
          fullWidth
          InputProps={{
            startAdornment: <InputAdornment position="start"><PeopleIcon /></InputAdornment>,
            readOnly: true,
            style: { color: "#9e9e9e" },
          }}
        />
        {/* Editable Fields */}
        <TextField
          required
          name="date"
          label="Event Date"
          type="date"
          value={formData.date}
          onChange={handleInputChange}
          InputLabelProps={{ shrink: true }}
          fullWidth
        />
        <TextField
          required
          name="timeSlot"
          label="Event Time Slot"
          value={formData.timeSlot}
          onChange={handleInputChange}
          fullWidth
        />
      </Box>

      {/* Buttons */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, padding: "0 20px 20px" }}>
        <Button
          component={NavLink}
          to="/coordinatordashboardtourapplications"
          variant="outlined"
          sx={{ color: "#8a0303", borderColor: "#8a0303", "&:hover": { backgroundColor: "#fdeaea" } }}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="contained"
          sx={{ backgroundColor: "#8a0303", "&:hover": { backgroundColor: "#b10505" } }}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default Table;