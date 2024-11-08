import React from 'react';
import { Box, Typography, IconButton, Paper } from '@mui/material';
import { Trash, Eye, Edit } from 'lucide-react';
import { getUnitSummary } from '../../utils/unitSummary';

function CategoryItem({ unit, count, onDelete, openDrawer }) {
  const { name, points } = unit;
  const unitSummary = getUnitSummary(unit);

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
        <IconButton size="medium" onClick={() => openDrawer('view')}>
          <Eye size={18} />
        </IconButton>
        <IconButton size="medium" onClick={() => openDrawer('edit')}>
          <Edit size={18} />
        </IconButton>
      </Box>
    </Paper>
  );
}

export default CategoryItem;
