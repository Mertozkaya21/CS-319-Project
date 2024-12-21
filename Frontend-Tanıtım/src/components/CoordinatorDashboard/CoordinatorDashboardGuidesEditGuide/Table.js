import React, { useEffect, useState } from "react";
import { useParams, NavLink, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import InputAdornment from "@mui/material/InputAdornment";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const guidesRows = [
  {
    id: 1,
    name: 'Samanta William',
    dateAdded: 'Oct 25, 2023',
    tours: 23,
    phone: '555-123-4561',
    email: 'samanta.william@example.com',
    schedulePic: 'https://via.placeholder.com/150', // Dummy image URL
  },
  {
    id: 2,
    name: 'Tony Soap',
    dateAdded: 'Oct 25, 2023',
    tours: 23,
    phone: '555-123-4562',
    email: 'tony.soap@example.com',
    schedulePic: 'https://via.placeholder.com/150', // Dummy image URL
  },
  {
    id: 3,
    name: 'Karen Hope',
    dateAdded: 'Oct 25, 2023',
    tours: 23,
    phone: '555-123-4563',
    email: 'karen.hope@example.com',
    schedulePic: 'https://via.placeholder.com/150', // Dummy image URL
  },
  {
    id: 4,
    name: 'Jordan Nico',
    dateAdded: 'Oct 26, 2023',
    tours: 23,
    phone: '555-987-6541',
    email: 'jordan.nico@example.com',
    schedulePic: 'https://via.placeholder.com/150', // Dummy image URL
  },
  {
    id: 5,
    name: 'Nadila Adja',
    dateAdded: 'Oct 26, 2023',
    tours: 23,
    phone: '555-987-6542',
    email: 'nadila.adja@example.com',
    schedulePic: 'https://via.placeholder.com/150', // Dummy image URL
  },
  {
    id: 6,
    name: 'Johnny Ahmad',
    dateAdded: 'Oct 27, 2023',
    tours: 23,
    phone: '555-654-3211',
    email: 'johnny.ahmad@example.com',
    schedulePic: 'https://via.placeholder.com/150', // Dummy image URL
  },
];

const Table = () => {
  const { id } = useParams(); // Extract the ID from the URL
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNo: "",
  });
  const [loading, setLoading] = useState(true);


  // Fetch Guide Data
 useEffect(() => {
     const fetchGuideData = async () => {
       try {
         const response = await fetch(`http://localhost:8080/v1/user/guide/${id}`);
         if (!response.ok) {
           throw new Error("Network response was not ok");
         }
         const guide = await response.json();
         const updatedGuide = {
           ...guide,
           name: `${guide.firstName} ${guide.lastName}`,
         };        
         setFormData(updatedGuide);
       } catch (error) {
         console.error("Failed to fetch guide data:", error);
       } finally {
         setLoading(false);
       }
     };
 
     fetchGuideData();
   }, [id]);
  // Handle Input Changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const navigate = useNavigate();
  // Handle Form Submit
  const handleSubmit = async (e) => {
    console.log(JSON.stringify(formData));
    e.preventDefault(); // Sayfanın yenilenmesini engeller

    const nameParts = formData.name.split(" ");
    formData.firstName = nameParts.slice(0, -1).join(" "); // Son eleman hariç kalanları birleştir
    formData.lastName = nameParts[nameParts.length - 1];

    try {
      const response = await fetch(`http://localhost:8080/v1/user/guide/${id}`, {
        method: "PATCH", 
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), // Form verilerini JSON formatında gönder
      });
  
      if (!response.ok) {
        throw new Error("Failed to update advisor details.");
      }
  
      const result = await response.json();
      console.log("Updated Guide Data:", result);
      alert("Guide details updated successfully!");
      navigate("/coordinatordashboardguides");
    } catch (error) {
      console.error("Error submitting guide details:", error);
      alert("Failed to update guide details. Please try again.");
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
        Personal Details
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
        noValidate
        autoComplete="off"
      >
        {/* Name */}
        <TextField
          required
          name="name"
          label="Guide Name"
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
          to="/coordinatordashboardguides" // Redirect to Guides Dashboard
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
          onClick={handleSubmit}
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