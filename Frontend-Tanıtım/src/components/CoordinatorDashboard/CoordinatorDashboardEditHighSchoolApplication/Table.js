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
import { NavLink } from "react-router-dom";
import EventIcon from "@mui/icons-material/Event";

export const tourApplicationsRows = [
  { 
    id: 1, 
    name: 'High School A', 
    priority: 1, 
    date: 'Dec 20, 2023', 
    time: '11:00 - 13:00', 
    city: 'Ankara', 
    phone: '555-123-4561', 
    email: 'jane.doe1@example.com', 
    distance: '5 km', 
    lgsPercentile: 85, 
    comments: 'Looking forward to the tour and meeting the students.'
  },
  { 
    id: 2, 
    name: 'High School B', 
    priority: 2, 
    date: 'Dec 21, 2023', 
    time: '09:00 - 11:00', 
    city: 'Ankara', 
    phone: '555-123-4562', 
    email: 'jane.doe2@example.com', 
    distance: '8 km', 
    lgsPercentile: 88, 
    comments: 'Please share parking instructions.'
  },
  { 
    id: 3, 
    name: 'High School C', 
    priority: 3, 
    date: 'Dec 22, 2023', 
    time: '11:00 - 13:00', 
    city: 'Istanbul', 
    phone: '555-123-4563', 
    email: 'jane.doe3@example.com', 
    distance: '15 km', 
    lgsPercentile: 90, 
    comments: 'We have some questions about campus facilities.'
  },
  { 
    id: 4, 
    name: 'High School D', 
    priority: 4, 
    date: 'Dec 23, 2023', 
    time: '11:00 - 13:00', 
    city: 'Izmir', 
    phone: '555-987-6541', 
    email: 'john.doe1@example.com', 
    distance: '20 km', 
    lgsPercentile: 92, 
    comments: 'Are refreshments provided during the tour?'
  },
];

const Table = () => {
  const { id } = useParams(); // Extract ID from URL params
  const [formData, setFormData] = useState({
    name: "",
    city: "",
    phone: "",
    email: "",
    priority: "",
    date: "",
    time: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Handle Editable Fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Event Data:", formData);
    alert("Event details updated successfully!");
  };

  useEffect(() => {
    console.log(id,"useEffect");
    const fetchData = async () => {
      setLoading(true);
      try {
        console.log(id,"useEffect");
        const response = await fetch(`http://localhost:8080/v1/highschool/${id}`);
        if (!response.ok) {
          throw new Error("Data could not be loaded.");
        }
        const data = await response.json();
        setFormData(data); // Backend'den dönen veriyi ayarla
      } catch (error) {
        setError("Data could not be loaded. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>; // Add this line here to show loading state
  }
  
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
        {/* Name */}
        <TextField
          id="name"
          name="name"
          label="High School Name"
          value={formData.name}
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SchoolIcon sx={{ color: "#8a0303" }} />
              </InputAdornment>
            ),
            readOnly: true,
            style: { color: "#9e9e9e" },
          }}
        />

        {/* City */}
        <TextField
          id="city"
          name="city"
          label="City"
          value={formData.city}
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LocationCityIcon sx={{ color: "#8a0303" }} />
              </InputAdornment>
            ),
            readOnly: true,
            style: { color: "#9e9e9e" },
          }}
        />

        {/* Phone */}
        <TextField
          id="phone"
          name="phone"
          label="Phone Number"
          value={formData.phone}
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PhoneIcon sx={{ color: "#8a0303" }} />
              </InputAdornment>
            ),
            readOnly: true,
            style: { color: "#9e9e9e" },
          }}
        />

        {/* Email */}
        <TextField
          id="email"
          name="email"
          label="Email Address"
          value={formData.email}
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmailIcon sx={{ color: "#8a0303" }} />
              </InputAdornment>
            ),
            readOnly: true,
            style: { color: "#9e9e9e" },
          }}
        />

        {/* Priority */}
        <TextField
          id="priority"
          name="priority"
          label="Priority"
          value={formData.priority}
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EventIcon sx={{ color: "#8a0303" }} />
              </InputAdornment>
            ),
            readOnly: true,
            style: { color: "#9e9e9e" },
          }}
        />

        {/* Date - Editable */}
        <TextField
          required
          id="date"
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
          id="time"
          name="time"
          label="Event Time"
          value={formData.time} // Dynamically sets the initial value
          onChange={handleInputChange}
          select
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EventIcon sx={{ color: "#8a0303" }} />
              </InputAdornment>
            ),
          }}
        >
          <MenuItem value="09:00 - 11:00">09:00 - 11:00</MenuItem>
          <MenuItem value="11:00 - 13:00">11:00 - 13:00</MenuItem>
          <MenuItem value="13:30 - 15:30">13:30 - 15:30</MenuItem>
          <MenuItem value="16:00 - 18:00">16:00 - 18:00</MenuItem>
        </TextField>
      </Box>

      {/* Action Buttons */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          gap: 2,
          padding: "0 20px 20px",
        }}
      >
        <Button
          component={NavLink}
          to="/coordinatordashboardtoursandfairsviewall"
          variant="outlined"
          sx={{
            color: "#8a0303",
            borderColor: "#8a0303",
            "&:hover": { backgroundColor: "#fdeaea" },
          }}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="contained"
          sx={{
            backgroundColor: "#8a0303",
            "&:hover": { backgroundColor: "#b10505" },
          }}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default Table;