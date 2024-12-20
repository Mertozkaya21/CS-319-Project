import React, { useEffect, useState } from "react";
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
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import { NavLink,useNavigate } from 'react-router-dom';

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

const advisors = [
  { id: 1, name: "John Doe" },
  { id: 2, name: "Jane Smith" },
  { id: 3, name: "Ali Khan" },
  { id: 4, name: "Sara Lee" },
  { id: 5, name: "Emma Brown" },
];

const Table = () => {
  const [advisors, setAdvisors] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNo: "",
    advisorId: "",
    password:""
  });
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => event.preventDefault();
  const handleMouseUpPassword = (event) => event.preventDefault();

  useEffect(() => {
    const fetchAdvisors = async () => {
      try {
        const response = await fetch("http://localhost:8080/v1/user/advisor"); // API endpoint
        if (!response.ok) {
          throw new Error("Failed to fetch advisors.");
        }
        const data = await response.json();
        // Backend'den gelen veriyi uygun formatta dönüştür
        const formattedAdvisors = data.map((item) => {
          const [id, name] = Object.entries(item)[0]; // Key-value pair olarak alın
          return { id, name };   
        });
        setAdvisors(formattedAdvisors);
        console.log(formattedAdvisors);
      } catch (error) {
        console.error("Error fetching advisors:", error);
      }
    };

    fetchAdvisors();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    console.log(JSON.stringify(formData));
    e.preventDefault(); // Sayfanın yenilenmesini engeller

    const nameParts = formData.name.split(" ");
    formData.firstName = nameParts.slice(0, -1).join(" "); // Son eleman hariç kalanları birleştir
    formData.lastName = nameParts[nameParts.length - 1];

    try {
      console.log(JSON.stringify(formData));
      const response = await fetch(`http://localhost:8080/v1/user/trainee`, {
        method: "POST", 
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), // Form verilerini JSON formatında gönder
      });
  
      if (!response.ok) {
        throw new Error("Failed to add trainee.");
      }
  
      const result = await response.json();
      console.log("Added Trainee Data:", result);
      alert("Trainee added successfully!");
      navigate("/coordinatordashboardtrainees");
    } catch (error) {
      console.error("Error adding trainee:", error);
      alert("Failed to add trainee. Please try again.");
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
        {/* First Name */}
        <TextField
          required
          id="name"
          label="Name"
          placeholder="Enter Full Name"
          fullWidth
          onChange={handleChange}
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
          id="email"
          label="Email Address"
          placeholder="Enter Email"
          fullWidth
          onChange={handleChange}
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
          placeholder="(123) 456-7890"
          fullWidth
          onChange={handleChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PhoneIcon sx={{ color: "#8a0303" }} />
              </InputAdornment>
            ),
          }}
        />
        
        {/* Advisor Responsible */}
        <TextField
          select
          required
          id="advisorId"
          name="advisorId"
          label="Advisor Responsible"
          placeholder="Choose Advisor"
          fullWidth
          value={formData.advisorId}
          onChange={handleChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircleIcon sx={{ color: "#8a0303" }} />
              </InputAdornment>
            ),
          }}
        >
          {advisors.map((advisor) => (
            <MenuItem key={advisor.id} value={advisor.id}>
              {advisor.name}
            </MenuItem>
          ))}
        </TextField>
        {/* Password Field */}
        <FormControl sx={{ width: "100%" }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
            <OutlinedInput
              id="password"
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
          to="/coordinatordashboardtrainees" // Redirect to trainees Dashboard
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