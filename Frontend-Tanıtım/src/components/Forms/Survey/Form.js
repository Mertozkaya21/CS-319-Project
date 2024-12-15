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
import dayjs from 'dayjs';

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
  const [formData, setFormData] = useState({
    individualName: '',
    email: '',
    highSchoolName: '',
    city: '',
    date: null,
    timeSlot: '',
    departmentOfInterest: '',
    tourExperienceRating: 5,
    guideRating: 5,
    overallSatisfactionRating: 5,
    comments: '',
  });

  const [formErrors, setFormErrors] = useState({});
  const [activeStep, setActiveStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  

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
    }
  };

  const handleSliderChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleTimeSelection = (time) => {
    setFormData({ ...formData, timeSlot: time });
  };

  const validateForm = () => {
    const errors = {};
  
    // Check for empty required fields
    if (!formData.individualName) errors.individualName = 'Individual Name is required.';
    if (!formData.email) errors.email = 'Email is required.';
    if (!formData.highSchoolName) errors.highSchoolName = 'High School Name is required.';
    if (!formData.city) errors.city = 'City is required.';
    if (!formData.date) errors.date = 'Date is required.';
    if (!formData.timeSlot) errors.timeSlot = 'Time Slot is required.';
    if (!formData.departmentOfInterest) errors.departmentOfInterest = 'Department of Interest is required.';
    
    
    // Validate numeric sliders
    if (formData.tourExperienceRating < 1 || formData.tourExperienceRating > 10)
      errors.tourExperienceRating = 'Tour experience rating must be between 1 and 10.';
    if (formData.guideRating < 1 || formData.guideRating > 10)
      errors.guideRating = 'Guide rating must be between 1 and 10.';
    if (formData.overallSatisfactionRating < 1 || formData.overallSatisfactionRating > 10)
      errors.overallSatisfactionRating = 'Satisfaction rating must be between 1 and 10.';

    // Validate specific fields
    if (formData.email && (!formData.email.includes('@') || !formData.email.includes('.'))) {
      errors.email = 'Invalid email address.';
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
          individualName: '',
          email: '',
          highSchoolName: '',
          city: '',
          date: null,
          timeSlot: '',
          departmentOfInterest: '',
          tourExperienceRating: 0,
          guideRating: 0,
          overallSatisfactionRating: 0,
          comments: 0,
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
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 5, marginBottom: 10.2 }}> {/* Increased gap between rows */}
      {/* Textual Information */}
      <Box>
        <Typography variant="body2" sx={{ color: '#6c757d' }}>
          Please provide your information below so we can assist you with your campus visit. Ensure all fields are filled out accurately to confirm your application.
        </Typography>
      </Box>

      {/* First Row */}
      <Box sx={{ display: 'flex', gap: 2 }}>
      <TextField
            label="Individual Name"
            name="individualName"
            required
            value={formData.individualName}
            onChange={handleInputChange}
            error={!!formErrors.individualName}
            helperText={formErrors.individualName || ''}
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
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            error={!!formErrors.email}
            helperText={formErrors.email || ''}
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
          name="highSchoolName"
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
          <MenuItem value="High School A">High School A</MenuItem>
          <MenuItem value="High School B">High School B</MenuItem>
        </TextField>
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
          <MenuItem value="City A">City A</MenuItem>
          <MenuItem value="City B">City B</MenuItem>
        </TextField>
      </Box>
    </Box>
        );
        case 1:
          return (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, marginBottom: 13.7 }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: -2.5, }}>Date</Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']}>
                <DatePicker
                  label="Select Date"
                  value={formData.date}
                  onChange={(newValue) => {
                    setFormData({ ...formData, date: newValue });
                  }}
                  maxDate={dayjs()} // Allow only today or past dates
                  disableFuture // Ensures future dates are disabled
                  slotProps={{
                    textField: {
                      helperText: formErrors.date || '',
                      error: !!formErrors.date,
                    },
                  }}
                />
                </DemoContainer>
              </LocalizationProvider>
              <TimeSlotPicker
                selectedTime={formData.timeSlot} // Controlled by the parent
                onTimeSelect={(time) => setFormData({ ...formData, timeSlot: time })} // Update parent state
              />
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
                  value={formData.departmentOfInterest}
                  sx={{ width: '48%' }}
                  name="departmentOfInterest"
                  error={!!formErrors.departmentOfInterest}
                  onChange={handleInputChange}
                  helperText={formErrors.departmentOfInterest || ''}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SchoolIcon sx={{ color: '#6c757d' }} />
                      </InputAdornment>
                    ),
                  }}
                >
                  <MenuItem value="Computer Engineering">Computer Engineering</MenuItem>
                  <MenuItem value="Electrical Engineering">Electrical Engineering</MenuItem>
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
                    name="tourExperienceRating"
                    value={formData.tourExperienceRating}
                    error={!!formErrors.tourExperienceRating}
                    onChange={(e, value) => handleSliderChange('tourExperienceRating', value)} // Fixed this line
                    helperText={formErrors.tourExperienceRating || ''}
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
                    name="guideRating"
                    value={formData.guideRating}
                    onChange={(e, value) => handleSliderChange('guideRating', value)} // Fixed this line
                    error={!!formErrors.guideRating}
                    helperText={formErrors.guideRating || ''}
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
                    name="overallSatisfactionRating"
                    value={formData.overallSatisfactionRating}
                    onChange={(e, value) => handleSliderChange('overallSatisfactionRating', value)} // Fixed this line
                    error={!!formErrors.overallSatisfactionRating}
                    helperText={formErrors.overallSatisfactionRating || ''}
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
                  name="comments"
                  label="Additional Comments"
                  multiline
                  value={formData.comments}
                  onChange={handleInputChange}
                  rows={12.2}
                  placeholder="Add any extra comments here."
                  sx={{ width: '100%' }} // Reduced width for full width layout
                />
              </Box>
            );
            case 4:
              return (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center', marginBottom: 0 }}>
                  {/* Icon */}
                  <img
                    src={require('../../../assets/Tickbox.png')}
                    alt="Tickbox"
                    style={{ width: '170px', height: '140px', marginBottom: '0px', marginTop: 30 }}
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