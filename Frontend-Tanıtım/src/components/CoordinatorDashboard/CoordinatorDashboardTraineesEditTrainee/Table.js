import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import { styled } from "@mui/material/styles";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";

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

const trainee = {
  id: 1,
  firstName: "Maria",
  lastName: "Historia",
  email: "maria.historia@example.com",
  phone: "+1234567890",
  advisorResponsible: "John Doe",
  profilePicture: "https://via.placeholder.com/150", // Placeholder image
};

// Dummy data for advisors
const advisors = [
  { id: 1, name: "John Doe" },
  { id: 2, name: "Jane Smith" },
  { id: 3, name: "Emily Johnson" },
  { id: 4, name: "Michael Brown" },
  { id: 5, name: "Sarah Davis" },
];

const Table = () => {
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
          id="first-name"
          label="First Name"
          defaultValue={trainee.firstName}
          helperText="Enter the first name of the trainee"
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PersonIcon sx={{ color: "#8a0303" }} />
              </InputAdornment>
            ),
          }}
        />
        {/* Last Name */}
        <TextField
          required
          id="last-name"
          label="Last Name"
          defaultValue={trainee.lastName}
          helperText="Enter the last name of the trainee"
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PersonIcon sx={{ color: "#8a0303" }} />
              </InputAdornment>
            ),
          }}
        />
        {/* Email Address */}
        <TextField
          required
          id="email-address"
          label="Email Address"
          defaultValue={trainee.email}
          helperText="Enter the email address of the trainee"
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
          id="phone-number"
          label="Phone Number"
          defaultValue={trainee.phone}
          helperText="Enter the phone number of the trainee (e.g., +1234567890)"
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PhoneIcon sx={{ color: "#8a0303" }} />
              </InputAdornment>
            ),
          }}
        />
        {/* Dropdown for Responsible Advisor */}
        <TextField
          select
          required
          id="responsible-advisor"
          label="Responsible Advisor"
          helperText="Select the advisor responsible for the trainee"
          defaultValue={advisors.find((adv) => adv.name === trainee.advisorResponsible)?.id || ""}
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SupervisorAccountIcon sx={{ color: "#8a0303" }} />
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
        
        {/* Profile Picture Upload */}
        <Box
          sx={{
            border: "2px dashed #8a0303",
            borderRadius: "8px",
            padding: "20px",
            textAlign: "center",
            color: "#8a0303",
          }}
        >
          <Button
            component="label"
            variant="contained"
            startIcon={<CloudUploadIcon />}
          >
            Upload Profile Picture
            <VisuallyHiddenInput
              type="file"
              onChange={(event) => console.log(event.target.files)}
              multiple={false} // Only one file can be uploaded
            />
          </Button>
        </Box>
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