import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import InputAdornment from "@mui/material/InputAdornment";
import AccountCircle from "@mui/icons-material/AccountCircle";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import React, { useState } from "react";
import { NavLink ,useNavigate} from "react-router-dom";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import PersonIcon from "@mui/icons-material/Person";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const Table = () => {
  
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
      name: "",
      phoneNo: "",
      email: "",
      city: "",
      counselorname: "",
    });

  const handleSubmit = async (e) => {
    console.log(JSON.stringify(formData));
    e.preventDefault(); // Sayfanın yenilenmesini engeller

    const nameParts = formData.name.split(" ");
    formData.firstName = nameParts.slice(0, -1).join(" "); // Son eleman hariç kalanları birleştir
    formData.lastName = nameParts[nameParts.length - 1];

    try {
      console.log(JSON.stringify(formData));
      const response = await fetch(`http://localhost:8080/v1/user/highschool`, {
        method: "POST", 
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), // Form verilerini JSON formatında gönder
      });
  
      if (!response.ok) {
        throw new Error("Failed to add highschool.");
      }
  
      const result = await response.json();
      console.log("Added High School Data:", result);
      alert("High School added successfully!");
      navigate("/coordinatordashboardhighschools");
    } catch (error) {
      console.error("Error adding high school:", error);
      alert("Failed to add high school. Please try again.");
    }
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
        noValidate
        autoComplete="off"
      >
        {/* Name  */}
        <TextField
          required
          id="name"
          label="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Enter High School Name"
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircle sx={{ color: "#8a0303" }} />
              </InputAdornment>
            ),
          }}
        />
        {/* Email Address */}
        <TextField
          required
          id="email"
          label="Email Address"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="Enter Email"
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
          id="phoneNo"
          label="Phone Number"
          value={formData.phoneNo}
          onChange={(e) => setFormData({ ...formData, phoneNo: e.target.value })}
          placeholder="(123) 456 7890"
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PhoneIcon sx={{ color: "#8a0303" }} />
              </InputAdornment>
            ),
          }}
        />
        {/* City */}
        <TextField
          required
          id="city"
          label="City"
          value={formData.city}
          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
          placeholder="Enter City"
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LocationCityIcon sx={{ color: "#8a0303" }} />
              </InputAdornment>
            ),
          }}
        />
        {/* Counselor Name */}
        <TextField
          required
          id="counselorname"
          label="Counselor Name"
          value={formData.counselorname}
          onChange={(e) =>
            setFormData({ ...formData, counselorname: e.target.value })
          }
          placeholder="Enter Counselor Name"
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PersonIcon sx={{ color: "#8a0303" }} />
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
          to="/coordinatordashboardhighschools" // Redirect to high schools 
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