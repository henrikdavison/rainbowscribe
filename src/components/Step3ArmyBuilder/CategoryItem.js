import React from 'react';
import { Box, Typography, IconButton, useTheme } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

function CategoryItem({ name, points, count, onDelete, isLastItem }) {
  const theme = useTheme(); // Access the default MUI theme
  
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      sx={{
        ...theme.utils.giveOuterPadding,
        borderBottom: isLastItem ? 0 : 1, // No border-bottom for the last item
        borderColor: theme.palette.divider, // Use theme divider color
        bgcolor: theme.palette.background.paper, // Apply paper background for depth
      }}
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

