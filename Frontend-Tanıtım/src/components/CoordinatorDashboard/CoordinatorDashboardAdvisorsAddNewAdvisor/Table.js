import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import AccountCircle from "@mui/icons-material/AccountCircle";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import React, { useState } from "react";
import { NavLink ,useNavigate} from "react-router-dom";

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
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => event.preventDefault();
  const handleMouseUpPassword = (event) => event.preventDefault();

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
      name: "",
      phoneNo: "",
      email: "",
      day: "",
      password: "",
      //imagePath: "",
    });

  const handleSubmit = async (e) => {
    console.log(JSON.stringify(formData));
    e.preventDefault(); // Sayfanın yenilenmesini engeller

    const nameParts = formData.name.split(" ");
    formData.firstName = nameParts.slice(0, -1).join(" "); // Son eleman hariç kalanları birleştir
    formData.lastName = nameParts[nameParts.length - 1];

    try {
      console.log(JSON.stringify(formData));
      const response = await fetch(`http://localhost:8080/v1/user/advisor`, {
        method: "POST", 
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), // Form verilerini JSON formatında gönder
      });
  
      if (!response.ok) {
        throw new Error("Failed to add advisor.");
      }
  
      const result = await response.json();
      console.log("Added Advisor Data:", result);
      alert("Advisor added successfully!");
      navigate("/coordinatordashboardadvisors");
    } catch (error) {
      console.error("Error adding advisor:", error);
      alert("Failed to add advisor. Please try again.");
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
        {/* Name  */}
        <TextField
          required
          id="name"
          label="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Enter Full Name"
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
        {/* Dropdown for Responsible Day */}
        <TextField
          select
          required
          id="day"
          label="Choose the day the Advisor is responsible for"
          value={formData.day}
          onChange={(e) => setFormData({ ...formData, day: e.target.value })}
          placeholder="Choose Day"
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircle sx={{ color: "#8a0303" }} />
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

        {/* Password Field */}
        <FormControl sx={{ width: "100%" }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={
                    showPassword ? "hide the password" : "display the password"
                  }
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  onMouseUp={handleMouseUpPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
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
          //to="/coordinatordashboardadvisors" // Redirect to Advisors Dashboard
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