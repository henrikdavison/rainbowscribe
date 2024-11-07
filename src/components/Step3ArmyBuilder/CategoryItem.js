import React from 'react';
import { Box, Typography, IconButton, Paper } from '@mui/material';
import { Trash } from 'lucide-react'; // Importing the Lucide Trash icon

function CategoryItem({ name, points, count, onDelete, isLastItem }) {
  return (
    <Paper
      elevation={2} // Small elevation to give a subtle shadow
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 1.5,
        marginX: 0.5,
        marginY: 0.5,
        bgcolor: 'background.paper',
        borderRadius: 1.5,
        minHeight: 56,
      }}
    >
      <Typography>{name} x{count}</Typography>
      <Box display="flex" alignItems="center">
        <Typography variant="pointsValue" mr={1}>
          {points} pts
        </Typography>
        <IconButton size="medium" onClick={onDelete}>
          <Trash size={18} /> {/* Lucide Trash icon with a set size */}
        </IconButton>
      </Box>
    </Paper>
  );
}

export default CategoryItem;

