import React from 'react';
import { Box, Typography, IconButton, Paper } from '@mui/material';
import { Trash, Eye, Edit } from 'lucide-react';
import { getUnitSummary } from '../../utils/unitSummary'; // Import the unit summary utility

function CategoryItem({ unit, count, onDelete }) {
  const { name, points } = unit; // Extract name and points from unit
  const unitSummary = getUnitSummary(unit); // Generate the summary based on the unit object

  return (
    <Paper
      elevation={2}
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
      {/* Box to stack name and unitSummary vertically */}
      <Box display="flex" flexDirection="column" alignItems="flex-start">
        <Typography variant="unitName">{name}</Typography>
        <Typography variant="caption" color="text.secondary">
          {unitSummary}
        </Typography>
      </Box>
      
      <Box display="flex" alignItems="center">
        <Typography variant="pointsValue" mr={1}>
          {points} pts
        </Typography>
        <IconButton size="medium" onClick={onDelete}>
          <Trash size={18} />
        </IconButton>
        <IconButton size="medium">
          <Eye size={18} />
        </IconButton>
        <IconButton size="medium">
          <Edit size={18} />
        </IconButton>
      </Box>
    </Paper>
  );
}

export default CategoryItem;

