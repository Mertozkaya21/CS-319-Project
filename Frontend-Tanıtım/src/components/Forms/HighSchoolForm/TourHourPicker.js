import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const TourHourPicker = ({ selectedTime, onTimeSelect }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <Typography variant="h6" sx={{ fontWeight: 'bold', mb: -2.5 }}>Tour Hour</Typography>

      <Box sx={{ display: 'flex', gap: 2 }}>
        {['09:00', '11:00', '13:30', '16:00'].map((time) => (
          <Button
            key={time}
            variant={selectedTime === time ? 'contained' : 'outlined'}
            onClick={() => onTimeSelect(time)} // Notify the parent directly
            sx={{
              flex: '1',
              border: '1px solid #8a0303',
              color: selectedTime === time ? '#ffffff' : '#8a0303',
              backgroundColor: selectedTime === time ? '#8a0303' : 'transparent',
              '&:hover': {
                backgroundColor: selectedTime === time ? '#8a0303' : '#f8d7da',
                borderColor: '#8a0303',
              },
            }}
          >
            {time}
          </Button>
        ))}
      </Box>
    </Box>
  );
};

export default TourHourPicker;