import React, { useState, useEffect } from 'react';
import TourHourPicker from './TourHourPicker'; // Adjust path based on your file structure
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
import dayjs from 'dayjs';
import FormHelperText from '@mui/material/FormHelperText';

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
    eventDate: null,
    tourHour: "",
    chaperoneRole: "",
    chaperoneName: "",
    numberOfAttendees: 0,
    comments: "",
    termsAccepted: false,
  });

  const [formErrors, setFormErrors] = useState({
    email: '',
    phoneNumber: '',
  });

  const [activeStep, setActiveStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [highSchools, setHighSchools] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const fetchHighSchools = async () => {
      try {
        const response = await fetch('http://localhost:8080/v1/highschool/dropdown/highschools'); 
        const data = await response.json();
        setHighSchools(data); 
      } catch (error) {
        console.error("Error fetching high schools:", error);
      }
    };
    const fetchCities = async () => {
      try {
        const response = await fetch('http://localhost:8080/v1/highschool/dropdown/cities'); // City'leri çeken API endpoint
        const data = await response.json();
        setCities(data); // City'leri state'e kaydedin
      } catch (error) {
        console.error('Error fetching cities:', error);
      }
    };
    fetchHighSchools();
    fetchCities();
  }, []);

  const steps = ['Contact Details', 'Date & Time', 'Attendee Details', 'Submit Request'];

  const handleNext = () => setActiveStep((prevStep) => prevStep + 1);
  const handleBack = () => setActiveStep((prevStep) => prevStep - 1);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Update form data
    setFormData({ ...formData, [name]: value });

    // Validate fields
    if (name === 'email') {
      const emailValid = value.includes('@') && value.includes('.');
      setFormErrors({ ...formErrors, email: emailValid ? '' : 'Invalid email address.' });
    } else if (name === 'phoneNumber') {
      const phoneValid = /^\d+$/.test(value); // Only numbers
      setFormErrors({ ...formErrors, phoneNumber: phoneValid ? '' : 'Phone number must be numeric.' });
    }
  };

  const handleCheckboxChange = (e) => {
    const { checked } = e.target;
    setFormData({ ...formData, termsAccepted: checked });
  };

  const handleTimeSelection = (time) => {
    setFormData({ ...formData, tourHour: time });
  };

  const validateForm = () => {
    const errors = {};
  
    // Check for empty required fields
    if (!formData.highSchoolName) errors.highSchoolName = 'High School Name is required.';
    if (!formData.email) errors.email = 'Email is required.';
    if (!formData.phoneNumber) errors.phoneNumber = 'Phone Number is required.';
    if (!formData.city) errors.city = 'City is required.';
    if (!formData.eventDate) errors.eventDate = 'Date is required.';
    if (!formData.tourHour) errors.tourHour = 'Tour hour is required.';
    if (!formData.chaperoneRole) errors.chaperoneRole = 'Chaperone Role is required.';
    if (!formData.chaperoneName) errors.chaperoneName = 'Chaperone Name is required.';
    if (formData.numberOfAttendees <= 0) errors.numberOfAttendees = 'Number of attendees must be greater than 0.';
    if (!formData.termsAccepted) errors.termsAccepted = 'You must accept the terms and conditions.';
  
    // Validate specific fields
    if (formData.email && (!formData.email.includes('@') || !formData.email.includes('.'))) {
      errors.email = 'Invalid email address.';
    }
    if (formData.phoneNumber && !/^\d+$/.test(formData.phoneNumber)) {
      errors.phoneNumber = 'Phone number must be numeric.';
    }
  
    setFormErrors(errors);
    return Object.keys(errors).length === 0; // Return true if no errors
  };
  
  const handleSubmit = async () => {
    if (!validateForm()) {
      alert('Please fill in all required fields correctly.');
      return; // Stop submission if form is invalid
    }
  
    setIsSubmitting(true); // Disable the submit button
    try {
      const formattedData = {
        ...formData,
        eventDate: formData.eventDate ? formData.eventDate.format('YYYY-MM-DD') : null, // Format the date here
      };
      console.log(formattedData);
      const response = await fetch('http://localhost:8080/v1/groupform', {
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
          highSchoolName: '',
          email: '',
          phoneNumber: '',
          city: '',
          eventDate: null,
          tourHour: '',
          chaperoneRole: '',
          chaperoneName: '',
          numberOfAttendees: 0,
          comments: '',
          termsAccepted: false,
        });
        setFormErrors({});
      } else {
        alert('Failed to submit the application. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false); // Re-enable the submit button
    }
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 5, marginBottom: 3.5 }}> {/* Increased gap between rows */}
      {/* Textual Information */}
      <Box>
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
        error={!!formErrors.highSchoolName}
        helperText={formErrors.highSchoolName || ''}
        sx={{ width: '48%' }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SchoolIcon sx={{ color: '#6c757d' }} />
            </InputAdornment>
          ),
        }}
      >
        {highSchools.length > 0 ? (
          highSchools.map((school) => (
            <MenuItem key={school} value={school}>
              {school}
            </MenuItem>
          ))
        ) : (
          <MenuItem disabled>No high schools available</MenuItem>
        )}
      </TextField>

        <Box sx={{ width: '48%' }}>
        <TextField
          name="email"
          label="Email Address"
          type="email"
          required
          value={formData.email}
          onChange={handleInputChange}
          error={!!formErrors.email}
          helperText={formErrors.email || ''}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmailIcon sx={{ color: '#6c757d' }} />
              </InputAdornment>
            ),
          }}
          sx={{ width: '100%' }}
        />
        </Box>
      </Box>

      {/* Second Row */}
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Box sx={{ width: '48%' }}>
          <TextField
            name="phoneNumber"
            label="Phone Number"
            type="tel"
            required
            sx={{ width: '100%' }}
            value={formData.phoneNumber}
            onChange={handleInputChange}
            error={!!formErrors.phoneNumber} // Highlight if there's an error
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PhoneIcon sx={{ color: '#6c757d' }} />
                </InputAdornment>
              ),
            }}
          />
          {formErrors.phoneNumber && (
            <FormHelperText error>{formErrors.phoneNumber}</FormHelperText>
          )}
          </Box>
        <TextField
          name="city"
          label="City"
          required
          select
          value={formData.city}
          error={!!formErrors.city}
          onChange={handleInputChange}
          sx={{ width: '48%' }}
          InputProps={{
            startAdornment: <InputAdornment position="start"><LocationCityIcon sx={{ color: '#6c757d' }} /></InputAdornment>,
          }}
        >
          {cities.length > 0 ? (
          cities.map((city) => (
            <MenuItem key={city} value={city}>
              {city}
            </MenuItem>
          ))
        ) : (
          <MenuItem disabled>No cities available</MenuItem>
        )}
        </TextField>
      </Box>
    </Box>
        );
        case 1:
          return (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, marginBottom: 9 }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: -2.5, }}>Date</Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']}>
                <DatePicker
                  label="Select Date"
                  value={formData.eventDate} // Keep the Day.js object here
                  onChange={(newValue) => {
                    setFormData({ ...formData, eventDate: newValue }); // Store the Day.js object directly
                  }}
                  minDate={dayjs()} // Disable dates before today
                />
                </DemoContainer>
              </LocalizationProvider>
              <TourHourPicker
                selectedTime={formData.tourHour} // Controlled by the parent
                onTimeSelect={handleTimeSelection} // Update parent state
              />
            </Box>
          );
          case 2:
            return (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, marginBottom: -0.3 }}>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <TextField
                    name="chaperoneRole"
                    label="Chaperone Role"
                    required
                    select
                    error={!!formErrors.chaperoneRole}
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
                    error={!!formErrors.chaperoneName}
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
                  error={!!formErrors.numberOfAttendees}
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
                  rows={3}
                  value={formData.comments}
                  onChange={handleInputChange}
                  sx={{ width: '100%' }}
                />
              </Box>
            );
            case 3:
              return (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, alignItems: 'center', marginBottom:0}}>
                  <img
                    src={require('../../../assets/Tickbox.png')}
                    alt="Tickbox"
                    style={{ width: '170px', height: '140px', marginBottom: 0 }}
                  />
                  <Typography variant="body1" sx={{ textAlign: 'center', color: '#6c757d', marginBottom: -2, marginTop: 0 }}>
                    Please review all the information you entered and submit your application.
                    <br />
                    You will receive an email if your tour application is accepted.
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, marginBottom: -0.5 }}>
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
                      sx={{ backgroundColor: isSubmitting ? '#ccc' : '#8a0303', color: '#ffffff', minWidth: 70 }}
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