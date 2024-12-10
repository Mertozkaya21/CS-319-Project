import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const TimeSlotPicker = () => {
  const [selectedTime, setSelectedTime] = useState('');

  const handleTimeSelection = (time) => {
    setSelectedTime(time);
  };
  

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0 }}> {/* Reduced gap */}
      <Typography
        variant="subtitle1"
        sx={{ fontWeight: 'bold', mb: 1 }} >
        Time Slot of Tour
      </Typography>
      <Box sx={{ display: 'flex', gap: 2 }}>
        {['09:00', '11:00', '13:30', '16:00'].map((time) => (
          <Button
            key={time}
            variant={selectedTime === time ? 'contained' : 'outlined'}
            onClick={() => handleTimeSelection(time)}
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

export default TimeSlotPicker;