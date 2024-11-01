// src/components/Step3ArmyBuilder/CategoryItem.js
import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

function CategoryItem({ name, points, count, onDelete, isLastItem }) {
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      sx={(theme) => ({
        ...theme.utils.giveOuterPadding,
        borderBottom: isLastItem ? 0 : 1, // No border-bottom for the last item
        borderColor: 'grey.300',
      })}
      bgcolor="white"
      minHeight={56}
      
    >
      <Typography>{name} x{count}</Typography>
      <Box display="flex" alignItems="center">
        <Typography variant="pointsValue" mr={1}>
          {points} pts
        </Typography>
        <IconButton size="medium" onClick={onDelete}>
          <DeleteIcon />
        </IconButton>
      </Box>
    </Box>
  );
}

export default CategoryItem;
