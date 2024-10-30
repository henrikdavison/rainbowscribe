// src/components/Step2SelectArmy.js
import React from 'react';
import { Box, Typography, Button, Stack } from '@mui/material';

function Step2SelectArmy({ gameType, onNext, onBack }) {
  return (
    <Box p={2} textAlign="center">
      <Typography variant="h5" gutterBottom>
        Select Army for {gameType}
      </Typography>
      <Stack spacing={2}>
        {/* Placeholder buttons; replace with actual army options based on `gameType` */}
        <Button variant="contained" onClick={() => onNext('Aeldari')}>Aeldari</Button>
        <Button variant="contained" onClick={() => onNext('Space Marines')}>Space Marines</Button>
        <Button variant="contained" onClick={() => onNext('Necrons')}>Necrons</Button>
      </Stack>
      <Button onClick={onBack} color="secondary" sx={{ mt: 2 }}>
        Back
      </Button>
    </Box>
  );
}

export default Step2SelectArmy;
