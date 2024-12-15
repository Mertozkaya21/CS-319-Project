import React, { useState } from "react";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Typography from "@mui/material/Typography";
import Switch from "@mui/material/Switch";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import { Box, FormControl, InputLabel, OutlinedInput, InputAdornment, LinearProgress } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import PersonIcon from "@mui/icons-material/Person"; // Add this
import EmailIcon from "@mui/icons-material/Email"; // Add this
import PhoneIcon from "@mui/icons-material/Phone"; // Add this
import AccountCircleIcon from "@mui/icons-material/AccountCircle"; // Add this
import KeyIcon from "@mui/icons-material/Key";
import styles from "./AdvisorDashboardSettings.module.css";
import TextField from "@mui/material/TextField"; // Add this

// Dummy Data
const dummyData = {
  profile: {
    name: "Nabila Azalea",
    email: "nabila@gmail.com",
    phone: "(123) 456 7890",
    avatar: "/static/images/avatar/1.jpg", // Replace with a real image URL
  },
  preferences: {
    messages: false,
    upcomingTours: false,
    upcomingFairs: true,
    alerts: true,
  },
  security: {
    twoFactorAuth: true,
    password: "12345678", // Dummy password (for default placeholder)
  },
};

const Settings = () => {
  const [value, setValue] = useState("1");

  // Profile Data
  const [profile, setProfile] = useState(dummyData.profile);

  // Preferences Data
  const [preferences, setPreferences] = useState(dummyData.preferences);

  // Security Data
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  
  // Handle Tab Change
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // Handle Profile Input Change
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  // Handle Preferences Toggle
  const handlePreferencesToggle = (key) => {
    setPreferences((prev) => ({ ...prev, [key]: !prev[key] }));
  };
  // Handle File Change for Avatar
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log("File selected:", file.name); // Handle the file upload logic here
    }
  };

  // Handle Password Visibility Toggle
  const handleToggleCurrentPasswordVisibility = () =>
    setShowCurrentPassword((prev) => !prev);
  const handleToggleNewPasswordVisibility = () =>
    setShowNewPassword((prev) => !prev);

  const handleMouseDown = (event) => event.preventDefault();

  // Password Strength
  const getPasswordStrength = () => {
    const minLength = 12;
    return Math.min((newPassword.length * 100) / minLength, 100);
  };

  const getStrengthLabel = () => {
    if (newPassword.length < 3) return "Very weak";
    if (newPassword.length >= 3 && newPassword.length < 6) return "Weak";
    if (newPassword.length >= 6 && newPassword.length < 10) return "Strong";
    if (newPassword.length >= 10) return "Very strong";
  };

  return (
    <div className="dashboard">
      <div className="mainContent">
    <div className={styles.settingsContainer}>
    <Box sx={{ width: "100%", typography: "body1", padding: "20px" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList
            onChange={handleChange}
            aria-label="Settings tabs"
            textColor="secondary"
            indicatorColor="secondary"
          >
            <Tab label="Edit Profile" value="1" />
            <Tab label="Preferences" value="2" />
            <Tab label="Security" value="3" />
          </TabList>
        </Box>
        <Box
          sx={{
            backgroundColor: '#ffffff',
            padding: '20px',
            borderRadius: '12px',
            boxShadow: '0 3px 10px rgba(0, 0, 0, 0.1)',
          }}
        >
        {/* Edit Profile */}
        <TabPanel value="1">
          <Box
            display="flex"
            flexDirection="row"
            alignItems="flex-start"
            gap={4}
          >
            <Box display="flex" flexDirection="column" alignItems="center">
              <Avatar
                alt="User Avatar"
                src="/static/images/avatar/1.jpg"
                sx={{ width: 120, height: 120 }}
              />
              <IconButton
                component="label"
                sx={{
                  backgroundColor: "#8a0303",
                  marginTop: "-20px",
                  color: "#fff",
                  "&:hover": { backgroundColor: "#b10505" },
                }}
              >
                <EditIcon />
                {/* Hidden file input */}
                <input
                  type="file"
                  accept="image/*" // Limit to image files
                  onChange={handleFileChange}
                  style={{ display: "none" }} // Hide the file input
                />
              </IconButton>
            </Box>
            <Box
              display="grid"
              gridTemplateColumns="1fr 1fr"
              gap={3}
              width="100%"
            >
              <TextField
                label="Name"
                name="name"
                value={profile.name}
                onChange={handleProfileChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                label="Email Address"
                name="email"
                value={profile.email}
                onChange={handleProfileChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                label="Phone Number"
                name="phone"
                value={profile.phone}
                onChange={handleProfileChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PhoneIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
          </Box>
          <Box display="flex" justifyContent="flex-end" mt={4}>
            <Button
              variant="contained"
              sx={{ backgroundColor: "#8a0303", "&:hover": { backgroundColor: "#b10505" } }}
            >
              Save
            </Button>
          </Box>
        </TabPanel>

        {/* Preferences */}
        <TabPanel value="2">
          <Typography variant="h6" gutterBottom>
            Notification
          </Typography>
          <Box display="flex" flexDirection="column" gap={2}>
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Typography>Notify me about new messages</Typography>
              <Switch
                checked={preferences.messages} // Bind to dummy data
                onChange={() => handlePreferencesToggle("messages")}
              />
            </Box>
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Typography>Notify me about upcoming tours</Typography>
              <Switch
                checked={preferences.upcomingTours} // Bind to dummy data
                onChange={() => handlePreferencesToggle("upcomingTours")}
              />
            </Box>
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Typography>Notify me about upcoming fairs</Typography>
              <Switch
                checked={preferences.upcomingFairs} // Bind to dummy data
                onChange={() => handlePreferencesToggle("upcomingFairs")}
              />
            </Box>
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Typography>
                Alert me when a tour is canceled or rescheduled
              </Typography>
              <Switch
                checked={preferences.alerts} // Bind to dummy data
                onChange={() => handlePreferencesToggle("alerts")}
              />
            </Box>
          </Box>
          <Box display="flex" justifyContent="flex-end" mt={4}>
            <Button
              variant="contained"
              sx={{ backgroundColor: "#8a0303", "&:hover": { backgroundColor: "#b10505" } }}
            >
              Save
            </Button>
          </Box>
        </TabPanel>

        {/* Security */}
                <TabPanel value="3">
                  <Typography variant="h6" gutterBottom>
                    Two-factor Authentication
                  </Typography>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    mb={3}
                  >
                    <Typography>
                      Enable or disable two-factor authentication
                    </Typography>
                    <Switch
                      checked={preferences.twoFactorAuth} // Bind to dummy data
                      onChange={() => handlePreferencesToggle("twoFactorAuth")}
                    />
                  </Box>
                  <Typography variant="h6" gutterBottom>
                    Change Password
                  </Typography>
                  <Box display="grid" gridTemplateColumns="1fr" gap={2} width="50%">
                    {/* Current Password */}
                    <FormControl variant="outlined" fullWidth>
                      <InputLabel htmlFor="current-password">Current Password</InputLabel>
                      <OutlinedInput
                        id="current-password"
                        type={showCurrentPassword ? "text" : "password"}
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        startAdornment={
                          <InputAdornment position="start">
                            <KeyIcon />
                          </InputAdornment>
                        }
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              onClick={handleToggleCurrentPasswordVisibility}
                              onMouseDown={handleMouseDown}
                            >
                              {showCurrentPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        }
                        label="Current Password"
                      />
                    </FormControl>

                    {/* New Password */}
                    <FormControl variant="outlined" fullWidth>
                      <InputLabel htmlFor="new-password">New Password</InputLabel>
                      <OutlinedInput
                        id="new-password"
                        type={showNewPassword ? "text" : "password"}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        startAdornment={
                          <InputAdornment position="start">
                            <KeyIcon />
                          </InputAdornment>
                        }
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              onClick={handleToggleNewPasswordVisibility}
                              onMouseDown={handleMouseDown}
                            >
                              {showNewPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        }
                        label="New Password"
                      />
                    </FormControl>

                    {/* Password Strength Meter */}
                    <Box>
                      <LinearProgress
                        variant="determinate"
                        value={getPasswordStrength()}
                        sx={{
                          height: 8,
                          borderRadius: 2,
                          bgcolor: "background.level3",
                          "& .MuiLinearProgress-bar": {
                            bgcolor: `hsl(${Math.min(
                              newPassword.length * 10,
                              120
                            )} 80% 40%)`,
                          },
                        }}
                      />
                      <Typography
                        variant="body2"
                        align="right"
                        sx={{
                          mt: 0.5,
                          color: `hsl(${Math.min(
                            newPassword.length * 10,
                            120
                          )} 80% 30%)`,
                        }}
                      >
                        {getStrengthLabel()}
                      </Typography>
                    </Box>
                  </Box>
                  <Box display="flex" justifyContent="flex-end" mt={4}>
                    <Button
                      variant="contained"
                      sx={{
                        backgroundColor: "#8a0303",
                        "&:hover": { backgroundColor: "#b10505" },
                      }}
                    >
                      Save
                    </Button>
                  </Box>
                </TabPanel>
              </Box>
            </TabContext>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default Settings;