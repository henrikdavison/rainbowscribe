import React from 'react';
import { Typography, Box, TextField } from '@mui/material';

function EditUnitDrawer({ unit }) {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Edit {unit.name}
      </Typography>
      <TextField
        label="Unit Name"
        variant="outlined"
        defaultValue={unit.name}
        fullWidth
        margin="normal"
      />
      {/* Additional fields for editing can go here */}
    </Box>
  );
}

export default EditUnitDrawer;
