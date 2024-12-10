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
import LocationCityIcon from '@mui/icons-material/LocationCity';
import GroupIcon from '@mui/icons-material/Group';
import SchoolIcon from '@mui/icons-material/School';
import BadgeIcon from '@mui/icons-material/Badge'; // For Chaperone Role
import PersonIcon from '@mui/icons-material/Person'; // For Chaperone Name

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

  const [formData, setFormData] = useState({
    highSchoolName: "",
    email: "",
    phoneNumber: "",
    city: "",
    date: null,
    timeSlot: "",
    chaperoneRole: "",
    chaperoneName: "",
    numberOfAttendees: 0,
    comments: "",
    termsAccepted: false,
  });

  const [activeStep, setActiveStep] = useState(0);

  const steps = ['Contact Details', 'Date & Time', 'Attendee Details', 'Submit Request'];

  const handleNext = () => setActiveStep((prevStep) => prevStep + 1);
  const handleBack = () => setActiveStep((prevStep) => prevStep - 1);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    const { checked } = e.target;
    setFormData({ ...formData, termsAccepted: checked });
  };

  const handleTimeSelection = (time) => {
    setFormData({ ...formData, timeSlot: time });
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);

  const handleSubmit = async () => {
    if (formData.termsAccepted) {
      setIsSubmitting(true); // Disable the submit button
      try {
        // Format the date for submission
        const formattedData = {
          ...formData,
          date: formData.date ? formData.date.format('MM/DD/YYYY') : null, // Format the date here
        };
  
        const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formattedData),
        });
  
        if (response.ok) {
          console.log('Submitted Data:', formattedData); // Log the submitted data
          alert('Your application has been successfully submitted.');
          setActiveStep(0); // Reset the form steps
          setSubmissionSuccess(true); // Show the success message
          setFormData({
            highSchoolName: "",
            email: "",
            phoneNumber: "",
            city: "",
            date: null,
            timeSlot: "",
            chaperoneRole: "",
            chaperoneName: "",
            numberOfAttendees: 0,
            comments: "",
            termsAccepted: false,
          });
        } else {
          alert('Failed to submit the application. Please try again.');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
      } finally {
        setIsSubmitting(false); // Re-enable the submit button
      }
    } else {
      alert('You must accept the terms and conditions to proceed.');
    }
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
          name="highSchoolName"
          label="High School Name"
          required
          select
          value={formData.highSchoolName}
          onChange={handleInputChange}
          sx={{ width: '48%' }}
          InputProps={{
            startAdornment: <InputAdornment position="start"><SchoolIcon sx={{ color: '#6c757d' }} /></InputAdornment>,
          }}
        >
          <MenuItem value="High School A">High School A</MenuItem>
          <MenuItem value="High School B">High School B</MenuItem>
        </TextField>

        <TextField
          name="email"
          label="Email Address"
          type="email"
          required
          value={formData.email}
          onChange={handleInputChange}
          sx={{ width: '48%' }}
          InputProps={{
            startAdornment: <InputAdornment position="start"><EmailIcon sx={{ color: '#6c757d' }} /></InputAdornment>,
          }}
        />
      </Box>

      {/* Second Row */}
      <Box sx={{ display: 'flex', gap: 2 }}>
        <TextField
          name="phoneNumber"
          label="Phone Number"
          type="tel"
          required
          value={formData.phoneNumber}
          onChange={handleInputChange}
          sx={{ width: '48%' }}
          InputProps={{
            startAdornment: <InputAdornment position="start"><PhoneIcon sx={{ color: '#6c757d' }} /></InputAdornment>,
          }}
        />
        <TextField
          name="city"
          label="City"
          required
          select
          value={formData.city}
          onChange={handleInputChange}
          sx={{ width: '48%' }}
          InputProps={{
            startAdornment: <InputAdornment position="start"><LocationCityIcon sx={{ color: '#6c757d' }} /></InputAdornment>,
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
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: -2.5 }}>Date</Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']}>
                <DatePicker
                  label="Select Date"
                  value={formData.date} // Keep the Day.js object here
                  onChange={(newValue) => {
                    setFormData({ ...formData, date: newValue }); // Store the Day.js object directly
                  }}
                />
                </DemoContainer>
              </LocalizationProvider>
              <TimeSlotPicker onTimeSelect={handleTimeSelection} />
            </Box>
          );
          case 2:
            return (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <TextField
                    name="chaperoneRole"
                    label="Chaperone Role"
                    required
                    select
                    value={formData.chaperoneRole}
                    onChange={handleInputChange}
                    sx={{ width: '48%' }}
                    InputProps={{
                      startAdornment: <InputAdornment position="start"><BadgeIcon sx={{ color: '#6c757d' }} /></InputAdornment>,
                    }}
                  >
                    <MenuItem value="Teacher">Teacher</MenuItem>
                    <MenuItem value="Counselor">Counselor</MenuItem>
                  </TextField>
                  <TextField
                    name="chaperoneName"
                    label="Chaperone Name"
                    required
                    value={formData.chaperoneName}
                    onChange={handleInputChange}
                    sx={{ width: '48%' }}
                    InputProps={{
                      startAdornment: <InputAdornment position="start"><PersonIcon sx={{ color: '#6c757d' }} /></InputAdornment>,
                    }}
                  />
                </Box>
                <TextField
                  name="numberOfAttendees"
                  label="Number of People Attending"
                  type="number"
                  required
                  value={formData.numberOfAttendees}
                  onChange={handleInputChange}
                  sx={{ width: '48%' }}
                  InputProps={{
                    startAdornment: <InputAdornment position="start"><GroupIcon sx={{ color: '#6c757d' }} /></InputAdornment>,
                  }}
                />
                <TextField
                  name="comments"
                  label="Additional Comments"
                  multiline
                  rows={4}
                  value={formData.comments}
                  onChange={handleInputChange}
                  sx={{ width: '100%' }}
                />
              </Box>
            );
            case 3:
              return (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, alignItems: 'center' }}>
                  <img
                    src={require('../../../assets/Tickbox.png')}
                    alt="Tickbox"
                    style={{ width: '170px', height: '140px', marginBottom: '0px' }}
                  />
                  <Typography variant="body1" sx={{ textAlign: 'center', color: '#6c757d', marginBottom: 0 }}>
                    Please review all the information you entered and submit your application.
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, marginBottom: 2 }}>
                    <Checkbox
                      checked={formData.termsAccepted}
                      onChange={handleCheckboxChange}
                      sx={{
                        '&:hover svg': { opacity: 1 },
                        '& svg': { color: '#8a0303' },
                      }}
                    />
                    <Typography variant="body2" sx={{ color: '#6c757d' }}>
                      I accept the{' '}
                      <Typography
                        component="a"
                        href="https://w3.bilkent.edu.tr/web/ogrencibrosurleri/ogrencikilavuzuEN_2022.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{ color: '#8a0303', fontWeight: 'bold', textDecoration: 'none' }}
                      >
                        Terms and Conditions
                      </Typography>
                      {' '}of Bilkent University.*
                    </Typography>
                  </Box>
                </Box>
              );
            default:
              return null;
          }
        };

        return (
          <ThemeProvider theme={customTheme}>
            <div style={{ display: 'flex', flexDirection: 'column', minHeight: '450px', position: 'relative' }}>
              <Box sx={{ width: '100%' }}>
              {submissionSuccess ? (
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%', // Make the message occupy the full height of the container
                    textAlign: 'center', // Center align the text
                    marginTop: '40%',
                  }}
                >
                  <Typography
                    variant="h6" // Use a smaller typography variant
                    sx={{
                      color: '#8a0303', // Red text color
                      fontWeight: 'bold', // Make it bold for emphasis
                      marginTop: '-50px', // Slightly adjust position for better centering
                    }}
                  >
                    Your application has been successfully submitted.
                  </Typography>
                </Box>
              ) : (
                <>
                  <Stepper alternativeLabel activeStep={activeStep}>
                    {steps.map((label) => (
                      <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                      </Step>
                    ))}
                  </Stepper>
                  <Box sx={{ marginTop: 4 }}>{renderStepContent(activeStep)}</Box>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginTop: 'auto',
                      paddingTop: '30px',
                    }}
                  >
                    <Button
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      sx={{ backgroundColor: '#ffffff', color: '#dc3545', border: '1px solid #dc3545' }}
                    >
                      Previous Step
                    </Button>
                    <Button
                      variant="contained"
                      onClick={activeStep === steps.length - 1 ? handleSubmit : handleNext}
                      disabled={isSubmitting}
                      sx={{ backgroundColor: isSubmitting ? '#ccc' : '#8a0303', color: '#ffffff' }}
                    >
                      {activeStep === steps.length - 1 ? 'Submit' : 'Next Step'}
                    </Button>
                  </Box>
                </>
              )}
              </Box>
            </div>
          </ThemeProvider>
        );
      };
      
      export default Form;