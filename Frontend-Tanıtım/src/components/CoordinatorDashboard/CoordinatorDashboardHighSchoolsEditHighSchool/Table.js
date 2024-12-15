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

// Mock Data (Replace this with a real API call)
const highSchoolRows = [
  { id: 1, name: 'High School A', city: 'Ankara', counselorName: 'Jane Doe', dateUpdated: 'Oct 25, 2023', highSchoolId: '#123456789', priority: 1, phone: '555-123-4561', email: 'jane.doe1@example.com' },
  { id: 2, name: 'High School B', city: 'Ankara', counselorName: 'Jane Doe', dateUpdated: 'Oct 25, 2023', highSchoolId: '#123456789', priority: 2, phone: '555-123-4562', email: 'jane.doe2@example.com' },
  { id: 3, name: 'High School C', city: 'Ankara', counselorName: 'Jane Doe', dateUpdated: 'Oct 25, 2023', highSchoolId: '#123456789', priority: 3, phone: '555-123-4563', email: 'jane.doe3@example.com' },
  { id: 4, name: 'High School D', city: 'Istanbul', counselorName: 'John Doe', dateUpdated: 'Oct 26, 2023', highSchoolId: '#987654321', priority: 4, phone: '555-987-6541', email: 'john.doe1@example.com' },
  { id: 5, name: 'High School E', city: 'Istanbul', counselorName: 'John Doe', dateUpdated: 'Oct 26, 2023', highSchoolId: '#987654321', priority: 5, phone: '555-987-6542', email: 'john.doe2@example.com' },
  { id: 6, name: 'High School F', city: 'Izmir', counselorName: 'Jane Doe', dateUpdated: 'Oct 27, 2023', highSchoolId: '#987654321', priority: 6, phone: '555-654-3211', email: 'jane.doe4@example.com' },
  { id: 7, name: 'High School G', city: 'Ankara', counselorName: 'Jane Doe', dateUpdated: 'Oct 25, 2023', highSchoolId: '#123456789', priority: 7, phone: '555-123-4567', email: 'jane.doe5@example.com' },
  { id: 8, name: 'High School H', city: 'Ankara', counselorName: 'Jane Doe', dateUpdated: 'Oct 25, 2023', highSchoolId: '#123456789', priority: 8, phone: '555-123-4568', email: 'jane.doe6@example.com' },
  { id: 9, name: 'High School I', city: 'Ankara', counselorName: 'Jane Doe', dateUpdated: 'Oct 25, 2023', highSchoolId: '#123456789', priority: 9, phone: '555-123-4569', email: 'jane.doe7@example.com' },
  { id: 10, name: 'High School J', city: 'Istanbul', counselorName: 'John Doe', dateUpdated: 'Oct 26, 2023', highSchoolId: '#987654321', priority: 10, phone: '555-987-6543', email: 'john.doe3@example.com' },
  { id: 11, name: 'High School K', city: 'Istanbul', counselorName: 'John Doe', dateUpdated: 'Oct 26, 2023', highSchoolId: '#987654321', priority: 11, phone: '555-987-6544', email: 'john.doe4@example.com' },
  { id: 12, name: 'High School L', city: 'Izmir', counselorName: 'Jane Doe', dateUpdated: 'Oct 27, 2023', highSchoolId: '#987654321', priority: 12, phone: '555-654-3212', email: 'jane.doe8@example.com' },
];

const Table = () => {
  const { id } = useParams(); // Extract the ID from the URL
  const [formData, setFormData] = useState({
    name: "",
    city: "",
    phone: "",
    email: "",
    counselorName: "",
  });
  const [loading, setLoading] = useState(true);

  // Fetch High School Data
  useEffect(() => {
    const fetchHighSchoolData = () => {
      const highSchool = highSchoolRows.find((school) => school.id === parseInt(id)); // Ensure proper comparison
      if (highSchool) {
        setFormData(highSchool);
      }
      setLoading(false);
    };

    fetchHighSchoolData();
  }, [id]);

  // Handle Input Change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle Form Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Data:", formData);
    alert("High School details updated successfully!");
    // Add backend PUT/POST API call here
  };
  return (
    <Box
      sx={{
        backgroundColor: "#ffffff",
        borderRadius: "12px",
        padding: "0px 0px",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      {/* Form Header */}
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
        High School Details
      </Box>

      {/* Form Fields */}
      <Box
        component="form"
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, // Responsive layout
          gap: 3,
          padding: "20px",
        }}
        onSubmit={handleSubmit}
      >
        <TextField
          required
          name="name"
          label="High School Name"
          value={formData.name}
          onChange={handleInputChange}
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SchoolIcon sx={{ color: "#8a0303" }} />
              </InputAdornment>
            ),
          }}
        >
          <MenuItem value="High School A">High School A</MenuItem>
          <MenuItem value="High School B">High School B</MenuItem>
          <MenuItem value="High School C">High School C</MenuItem>
        </TextField>
        <TextField
          required
          name="city"
          label="City"
          value={formData.city}
          onChange={handleInputChange}
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LocationCityIcon sx={{ color: "#8a0303" }} />
              </InputAdornment>
            ),
          }}
          select
        >
          <MenuItem value="Ankara">Ankara</MenuItem>
          <MenuItem value="Istanbul">Istanbul</MenuItem>
          <MenuItem value="Izmir">Izmir</MenuItem>
        </TextField>
        {/* New Counselor Name Field */}
        <TextField
          required
          name="counselorName"
          label="Counselor Name"
          value={formData.counselorName}
          onChange={handleInputChange}
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PersonIcon sx={{ color: "#8a0303" }} />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          required
          name="phone"
          label="Counselor Phone Number"
          value={formData.phone}
          onChange={handleInputChange}
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PhoneIcon sx={{ color: "#8a0303" }} />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          required
          name="email"
          label="Counselor Email Address"
          value={formData.email}
          onChange={handleInputChange}
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmailIcon sx={{ color: "#8a0303" }} />
              </InputAdornment>
            ),
          }}
        />
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
          to="/coordinatordashboardhighschool" // Redirect to this page
          variant="outlined"
          sx={{
            color: "#8a0303",
            borderColor: "#8a0303",
            "&:hover": {
              backgroundColor: "#fdeaea",
              borderColor: "#8a0303",
            },
          }}
        >
          Delete Changes
        </Button>
        <Button
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