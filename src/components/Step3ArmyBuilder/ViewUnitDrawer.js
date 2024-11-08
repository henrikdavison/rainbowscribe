import React from 'react';
import { Typography, Box } from '@mui/material';

function ViewUnitDrawer({ unit }) {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        {unit.name} Details
      </Typography>
      <Typography variant="body1">
        {/* Placeholder for unit rules and data tables */}
        Here are the unit rules and data tables.
      </Typography>
    </Box>
  );
}

export default ViewUnitDrawer;