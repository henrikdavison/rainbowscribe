import React from 'react';
import { Box, Typography, IconButton, Paper } from '@mui/material';
import { Trash, Eye, Edit } from 'lucide-react'; // Importing the Lucide Trash icon

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
      {/* Box to stack name and unitSummary vertically */}
      <Box display="flex" flexDirection="column" alignItems="flex-start">
        <Typography variant="unitName">{name}</Typography>
        <Typography
          variant="caption" // Smaller text for summary
          color="text.secondary"

        >
          unitSummary
        </Typography>
      </Box>
      
      <Box display="flex" alignItems="center">
        <Typography variant="pointsValue" mr={1}>
          {points} pts
        </Typography>
        <IconButton size="medium" onClick={onDelete}>
          <Trash size={18} /> {/* Trash icon */}
        </IconButton>
        <IconButton size="medium" onClick={onDelete}>
          <Eye size={18} /> {/* Eye icon */}
        </IconButton>
        <IconButton size="medium" onClick={onDelete}>
          <Edit size={18} /> {/* Edit icon */}
        </IconButton>
      </Box>
    </Paper>
  );
}

export default CategoryItem;

