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
      {/* Left side: Unit name with points */}
      <Box display="flex" flexDirection="column" flex="1 1 auto" minWidth={0}>
        <Box display="flex" alignItems="center" width="100%">
          <Typography
            variant="unitName"
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              mr: 1,
            }}
          >
            {name}
          </Typography>
          <Typography variant="pointsValue" sx={{ flexShrink: 0 }}>
            {points} pts
          </Typography>
        </Box>

        {/* Grey unit summary text */}
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            mt: 0.5,
          }}
        >
          {unitSummary}
        </Typography>
      </Box>

      {/* Right side: Icons */}
      <Box display="flex" alignItems="center" flexShrink={0} ml={2}>
        <IconButton size="medium" onClick={onDelete}>
          <Trash size={18} />
        </IconButton>
        <IconButton size="medium" ml={1} onClick={() => openDrawer('view')}>
          <Eye size={18} />
        </IconButton>
        <IconButton size="medium" ml={1} onClick={() => openDrawer('edit')}>
          <Edit size={18} />
        </IconButton>
      </Box>
    </Paper>
  );
}

export default CategoryItem;
