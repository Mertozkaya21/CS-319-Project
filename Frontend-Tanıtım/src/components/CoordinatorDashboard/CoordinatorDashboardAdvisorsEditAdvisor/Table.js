import React, { useEffect, useState } from "react";
import { useParams, NavLink ,useNavigate} from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import InputAdornment from "@mui/material/InputAdornment";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import EventIcon from "@mui/icons-material/Event";

// Mock Data (Replace this with a real API call)
const advisorRows = [
  { id: 1, name: 'Samanta William', dateAdded: 'Oct 25, 2023', advisorId: '#123456789', tours: 23, phone: '555-123-4561', email: 'samanta.william@example.com', responsibleDay: 'Monday' },
  { id: 2, name: 'Tony Soap', dateAdded: 'Oct 25, 2023', advisorId: '#123456789', tours: 23, phone: '555-123-4562', email: 'tony.soap@example.com', responsibleDay: 'Tuesday' },
  { id: 3, name: 'Karen Hope', dateAdded: 'Oct 25, 2023', advisorId: '#123456789', tours: 23, phone: '555-123-4563', email: 'karen.hope@example.com', responsibleDay: 'Wednesday' },
  { id: 4, name: 'Jordan Nico', dateAdded: 'Oct 26, 2023', advisorId: '#987654321', tours: 23, phone: '555-987-6541', email: 'jordan.nico@example.com', responsibleDay: 'Thursday' },
  { id: 5, name: 'Nadila Adja', dateAdded: 'Oct 26, 2023', advisorId: '#987654321', tours: 23, phone: '555-987-6542', email: 'nadila.adja@example.com', responsibleDay: 'Friday' },
  { id: 6, name: 'Johnny Ahmad', dateAdded: 'Oct 27, 2023', advisorId: '#987654321', tours: 23, phone: '555-654-3211', email: 'johnny.ahmad@example.com', responsibleDay: 'Saturday' },
];
 
const Table = () => {
  const { id } = useParams(); // Extract the ID from the URL
  const [formData, setFormData] = useState({
    name: "",
    phoneNo: "",
    email: "",
    undertakenDay: "",
  });
  const [loading, setLoading] = useState(true);

  // Fetch Advisor Data
  useEffect(() => {
    const fetchAdvisorData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/v1/user/advisor/${id}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const advisor = await response.json();
        const updatedAdvisor = {
          ...advisor,
          name: `${advisor.firstName} ${advisor.lastName}`,
        };        
        setFormData(updatedAdvisor);
        console.log(updatedAdvisor.undertakenDay);
      } catch (error) {
        console.error("Failed to fetch advisor data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdvisorData();
  }, [id]);

  // Handle Input Changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    console.log(JSON.stringify(formData));
    e.preventDefault(); // Sayfanın yenilenmesini engeller
    try {
      const response = await fetch(`http://localhost:8080/v1/user/advisor/${id}`, {
        method: "PATCH", // POST veya PUT (duruma göre)
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), // Form verilerini JSON formatında gönder
      });
  
      if (!response.ok) {
        throw new Error("Failed to update advisor details.");
      }
  
      const result = await response.json();
      console.log("Updated Advisor Data:", result);
      alert("Advisor details updated successfully!");
      navigate("/coordinatordashboardadvisors");
    } catch (error) {
      console.error("Error submitting advisor details:", error);
      alert("Failed to update advisor details. Please try again.");
    }
  };
  

  if (loading) return <div>Loading...</div>;

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
        Advisor Details
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
        {/* Name */}
        <TextField
          required
          name="name"
          label="Advisor Name"
          value={formData.name}
          onChange={handleInputChange}
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircleIcon sx={{ color: "#8a0303" }} />
              </InputAdornment>
            ),
          }}
        />
        {/* Email Address */}
        <TextField
          required
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
          }}
        />
        {/* Phone Number */}
        <TextField
          required
          name="phoneNo"
          label="Phone Number"
          value={formData.phoneNo}
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
        {/* Dropdown for Responsible Day */}
        <TextField
          select
          name="undertakenDay"
          label="Responsible Day"
          value={formData.undertakenDay}
          onChange={handleInputChange}
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EventIcon sx={{ color: "#8a0303" }} />
              </InputAdornment>
            ),
          }}
        >
          <MenuItem value="MONDAY">Monday</MenuItem>
          <MenuItem value="TUESDAY">Tuesday</MenuItem>
          <MenuItem value="WEDNESDAY">Wednesday</MenuItem>
          <MenuItem value="THURSDAY">Thursday</MenuItem>
          <MenuItem value="FRIDAY">Friday</MenuItem>
          <MenuItem value="SATURDAY">Saturday</MenuItem>
          <MenuItem value="SUNDAY">Sunday</MenuItem>
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
          to="/coordinatordashboardadvisors" // Redirect to Advisors Dashboard
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
          Cancel 
        </Button>
        <Button
          //component={NavLink}
          onSubmit={handleSubmit} 
          //to="/coordinatordashboardadvisors" // Redirect to Advisors Dashboard 
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