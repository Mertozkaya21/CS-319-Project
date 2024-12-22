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
import { NavLink, useNavigate } from "react-router-dom";
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
    phoneNumber: "",
    email: "",
    eventDate: "",
    tourHour: "",
  });
  const [loading, setLoading] = useState(true);
  const [tourHours, setTourHours] = useState(true);
  const [error, setError] = useState(null);
  

  // Handle Editable Fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const navigate = useNavigate();
  // Handle Form Submission
  const handleSubmit = async (e) => {
    console.log("işte veriler:")
    console.log(JSON.stringify(formData));
    e.preventDefault(); // Sayfanın yenilenmesini engeller

    try {
      const response = await fetch(`http://localhost:8080/v1/groupform/${id}`, {
        method: "PUT", 
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), // Form verilerini JSON formatında gönder
      });
  
      if (!response.ok) {
        throw new Error("Failed to update highschool form details.");
      }
  
      const result = await response.json();
      console.log("Updated Highschool Form Data:", result);
      alert("Highschool form details updated successfully!");
      navigate("/coordinatordashboardtourapplications");
    } catch (error) {
      console.error("Error submitting highschool form details:", error);
      alert("Failed to update highschool form details. Please try again.");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:8080/v1/groupform/${id}`);
        if (!response.ok) {
          throw new Error("Data could not be loaded.");
        }
        const data = await response.json();
        setFormData(data); // Backend'den dönen veriyi ayarla
        console.log(data);
      } catch (error) {
        setError("Data could not be loaded. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
      const fetchTourHours = async () => {
        try {
          const response = await fetch("http://localhost:8080/v1/highschool/dropdown/tourhours"); // API endpoint
          if (!response.ok) {
            throw new Error("Failed to fetch tourhours.");
          }
          const data = await response.json();
          console.log(data);
    
          setTourHours(data);
          console.log(data);
        } catch (error) {
          console.error("Error fetching tourhours:", error);
        }
      };
      fetchTourHours();
    }, []);

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

        {/* Phone */}
        <TextField
          id="phoneNumber"
          name="phoneNumber"
          label="Phone Number"
          value={formData.phoneNumber}
          onChange={handleInputChange}
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PhoneIcon sx={{ color: "#8a0303" }} />
              </InputAdornment>
            ),
            style: { color: "#9e9e9e" },
          }}
        />

        {/* Email */}
        <TextField
          id="email"
          name="email"
          label="Email Address"
          value={formData.email}
          onChange={handleInputChange}
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmailIcon sx={{ color: "#8a0303" }} />
              </InputAdornment>
            ),
            style: { color: "#9e9e9e" },
          }}
        />

        {/*
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
        />*/}

        {/* Date - Editable */}
        <TextField
          required
          id="eventDate"
          name="eventDate"
          label="Event Date"
          type="date"
          value={formData.eventDate}
          onChange={handleInputChange}
          InputLabelProps={{ shrink: true }}
          fullWidth
        />

        <TextField
          required
          id="tourHour"
          name="tourHour"
          label="Event Time"
          value={formData.tourHour} // Dynamically sets the initial value
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
          {tourHours.map((tourHour) => (
            <MenuItem key={tourHour} value={tourHour}>
              {tourHour}
            </MenuItem>
          ))}
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
          to="/coordinatordashboardtourapplications"
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
          onClick={handleSubmit}
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