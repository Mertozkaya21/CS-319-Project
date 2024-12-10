import React, { useState } from 'react';
import TimeSlotPicker from './TimeSlotPicker'; // Adjust path based on your file structure
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Checkbox from '@mui/material/Checkbox';
import Done from '@mui/icons-material/Done';
import PersonIcon from '@mui/icons-material/Person';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import SchoolIcon from '@mui/icons-material/School';
import GroupIcon from '@mui/icons-material/Group';
import Slider from '@mui/material/Slider';

const steps = [
  'Contact Details',
  'Date & Time',
  'Ratings',
  'Comments',
  'Submit Survey',
];

// Custom theme for overriding default styles
const customTheme = createTheme({
  palette: {
    primary: {
      main: '#8a0303', // Set red as the primary color
    },
  },
  components: {
    MuiStepIcon: {
      styleOverrides: {
        root: {
          color: '#f5c6cb', // Light red for inactive step icons
          '&.Mui-completed': {
            color: '#8a0303', // Red for completed step icons
          },
          '&.Mui-active': {
            color: '#8a0303', // Red for active step icons
          },
        },
      },
    },
  },
});

const Form = () => {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}> {/* Increased gap between rows */}
      {/* Textual Information */}
      <Box>
        <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '8px' }}>
          Contact details
        </Typography>
        <Typography variant="body2" sx={{ color: '#6c757d' }}>
          Please provide your information below so we can assist you with your campus visit. Ensure all fields are filled out accurately to confirm your application.
        </Typography>
      </Box>

      {/* First Row */}
      <Box sx={{ display: 'flex', gap: 2 }}>
      <TextField
        label="Individual Name"
        required
        sx={{ width: '48%' }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <PersonIcon sx={{ color: '#6c757d' }} />
            </InputAdornment>
          ),
        }}
      />
        <TextField
          label="Email Address"
          type="email"
          required
          sx={{ width: '48%' }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmailIcon sx={{ color: '#6c757d' }} />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {/* Second Row */}
      <Box sx={{ display: 'flex', gap: 2 }}>
      <TextField
          label="High School Name"
          required
          select
          sx={{ width: '48%' }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SchoolIcon sx={{ color: '#6c757d' }} />
              </InputAdornment>
            ),
          }}
        >
          <MenuItem value="High School A">High School A</MenuItem>
          <MenuItem value="High School B">High School B</MenuItem>
        </TextField>
        <TextField
          label="City"
          required
          select
          sx={{ width: '48%' }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LocationCityIcon sx={{ color: '#6c757d' }} />
              </InputAdornment>
            ),
          }}
        >
          <MenuItem value="City A">City A</MenuItem>
          <MenuItem value="City B">City B</MenuItem>
        </TextField>
      </Box>
    </Box>
        );
        case 1:
          return (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}> {/* Further reduced gap */}
              {/* Title */}
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: -2.5 }}> {/* Further reduced margin-bottom */}
                Date of Tour
              </Typography>

              {/* Date Picker */}
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']}>
                  <DatePicker label="Select Date" />
                </DemoContainer>
              </LocalizationProvider>

              {/* Time Slot Picker */}
              <TimeSlotPicker />
            </Box>
          );
          case 2:
            return (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}> {/* Increased overall gap */}
                {/* Department of Interest */}
                <TextField
                  label="Department of Interest"
                  required
                  select
                  sx={{ width: '48%' }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SchoolIcon sx={{ color: '#6c757d' }} />
                      </InputAdornment>
                    ),
                  }}
                >
                  <MenuItem value="ComputerEngineering">Computer Engineering</MenuItem>
                  <MenuItem value="ElectricalEngineering">Electrical Engineering</MenuItem>
                </TextField>

                {/* Sliders */}
                <Box sx={{ marginBottom: 0 }}> {/* Less space between heading and slider */}
                  <Typography sx={{ fontWeight: 'bold', marginBottom: 0 }}> {/* Reduced margin below heading */}
                    Rate your tour experience:
                  </Typography>
                  <Slider
                    defaultValue={5}
                    step={1}
                    min={1}
                    max={10}
                    marks={[
                      { value: 1, label: '1' },
                      { value: 2, label: '2' },
                      { value: 3, label: '3' },
                      { value: 4, label: '4' },
                      { value: 5, label: '5' },
                      { value: 6, label: '6' },
                      { value: 7, label: '7' },
                      { value: 8, label: '8' },
                      { value: 9, label: '9' },
                      { value: 10, label: '10' },
                    ]}
                    sx={{
                      color: '#8a0303',
                      width: '75%', // Reduced slider width
                    }}
                  />
                </Box>

                <Box sx={{ marginBottom: 0 }}>
                  <Typography sx={{ fontWeight: 'bold', marginBottom: 0 }}>
                    Rate your tour guide:
                  </Typography>
                  <Slider
                    defaultValue={5}
                    step={1}
                    min={1}
                    max={10}
                    marks={[
                      { value: 1, label: '1' },
                      { value: 2, label: '2' },
                      { value: 3, label: '3' },
                      { value: 4, label: '4' },
                      { value: 5, label: '5' },
                      { value: 6, label: '6' },
                      { value: 7, label: '7' },
                      { value: 8, label: '8' },
                      { value: 9, label: '9' },
                      { value: 10, label: '10' },
                    ]}
                    sx={{
                      color: '#8a0303',
                      width: '75%', // Reduced slider width
                    }}
                  />
                </Box>

                <Box sx={{ marginBottom: 0 }}>
                  <Typography sx={{ fontWeight: 'bold', marginBottom: 0 }}>
                    Rate your overall satisfaction:
                  </Typography>
                  <Slider
                    defaultValue={5}
                    step={1}
                    min={1}
                    max={10}
                    marks={[
                      { value: 1, label: '1' },
                      { value: 2, label: '2' },
                      { value: 3, label: '3' },
                      { value: 4, label: '4' },
                      { value: 5, label: '5' },
                      { value: 6, label: '6' },
                      { value: 7, label: '7' },
                      { value: 8, label: '8' },
                      { value: 9, label: '9' },
                      { value: 10, label: '10' },
                    ]}
                    sx={{
                      color: '#8a0303',
                      width: '75%', // Reduced slider width
                    }}
                  />
                </Box>
              </Box>
            );
            case 3:
            return (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                {/* Third Row: Additional Comments */}
                <TextField
                  label="Additional Comments"
                  multiline
                  rows={11}
                  placeholder="Add any extra comments here."
                  sx={{ width: '100%' }} // Reduced width for full width layout
                />
              </Box>
            );
            case 4:
              return (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, alignItems: 'center' }}>
                  {/* Icon */}
                  <img
                    src={require('../../../assets/Tickbox.png')}
                    alt="Tickbox"
                    style={{ width: '170px', height: '140px', marginBottom: '0px' }}
                  />

                  {/* Description */}
                  <Typography
                    variant="body1"
                    sx={{ textAlign: 'center', color: '#6c757d', marginBottom: 10 }}
                  >
                    Please review all the information you previously typed in the past steps, <br />
                    and if all is okay, submit your survey.
                  </Typography>
                </Box>
              );
      default:
        return null;
    }
  };

  return (
    <ThemeProvider theme={customTheme}>
      <div
      className="formContainer"
      style={{
        display: 'flex',
        flexDirection: 'column', // Stack items vertically
        justifyContent: 'space-between', // Spread content evenly
        minHeight: '450px', // Minimum height for the form
        position: 'relative', // Allow absolute positioning inside
      }}
    >
        <Box sx={{ width: '100%' }}>
          <Stepper alternativeLabel activeStep={activeStep} className="stepperContainer">
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <Box sx={{ marginTop: 4, flexGrow: 1 }}>{renderStepContent(activeStep)}</Box> {/* flexGrow for spacing */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: 'auto', // Push to the bottom
              paddingTop: '20px',
            }}
            className="stepperButtons"
          >
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{
                backgroundColor: '#ffffff', // White background
                color: '#dc3545', // Red text color
                border: '1px solid #dc3545', // Red border
                '&:hover': {
                  backgroundColor: '#f8d7da', // Light red background on hover
                  borderColor: '#dc3545', // Red border on hover
                },
                '&:disabled': {
                  color: '#dc3545', // Gray text for disabled state
                  borderColor: '#dc3545', // Light gray border for disabled state
                },
              }}
            >
              Previous Step
            </Button>
            <Button
              variant="contained"
              onClick={handleNext}
              className="stepButton"
              sx={{ backgroundColor: '#8a0303', color: '#ffffff' }}
            >
              {activeStep === steps.length - 1 ? 'Submit' : 'Next Step'}
            </Button>
          </Box>
        </Box>
      </div>
    </ThemeProvider>
  );
};

export default Form;