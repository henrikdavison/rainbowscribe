// src/components/Step1SelectGame.js
import React from 'react';
import { Box, Typography, Button, Stack } from '@mui/material';

function Step1SelectGame({ onNext }) {
  return (
    <Box p={2} textAlign="center">
      <Typography variant="h5" gutterBottom>
        Select Game Type
      </Typography>
      <Stack spacing={2}>
        <Button variant="contained" onClick={() => onNext('Warhammer 40K')}>Warhammer 40K</Button>
        <Button variant="contained" onClick={() => onNext('Age of Sigmar')}>Age of Sigmar</Button>
        <Button variant="contained" onClick={() => onNext('Kill Team')}>Kill Team</Button>
      </Stack>
    </Box>
  );
}

export default Step1SelectGame;
