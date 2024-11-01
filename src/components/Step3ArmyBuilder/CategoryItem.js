// src/components/Step3ArmyBuilder/CategoryItem.js
import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

function CategoryItem({ name, points, count, onDelete }) {
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      p={1}
      bgcolor="grey.100"
      mb={1}
    >
      <Typography>{name} x{count}</Typography>
      <Box display="flex" alignItems="center">
        <Typography variant="pointsValue" mr={1}>
          {points} pts
        </Typography>
        <IconButton size="small" onClick={onDelete}>
          <DeleteIcon />
        </IconButton>
      </Box>
    </Box>
  );
}

export default CategoryItem;
git add .
