import React from 'react';
import { Drawer, List, IconButton, Button, Box, Paper, Typography, ListSubheader, useTheme } from '@mui/material';
import { Plus, X } from 'lucide-react';

function CategoryUnitSelectionDrawer({ open, onOpen, onClose, category, units, onSelectUnit, unitCounts }) {
  const theme = useTheme();

  return (
    <>
      <IconButton fontSize="small" sx={{ mr: 2 }} variant="contained" onClick={onOpen}>
        <Plus size={18} /> {/* Using Lucide Plus icon */}
      </IconButton>

      <Drawer
        anchor="bottom"
        open={open}
        onClose={onClose}
        PaperProps={{
          sx: {
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            maxHeight: '60vh',
            overflowY: 'auto',
            bgcolor: theme.palette.background.default,
            color: theme.palette.text.primary,
          },
        }}
      >
        <List sx={{ paddingBottom: 8 }}>
          {/* Category title in overline variant with consistent background */}
          <ListSubheader sx={{ bgcolor: theme.palette.background.default }}>
            <Typography variant="overline" color="text.primary">
              {category}
            </Typography>
          </ListSubheader>
          
          {/* Units as clickable paper cards with add icon */}
          {(units || []).map((unit, index) => (
            <Paper key={index} elevation={2} sx={{ p: 1.5, mb: 1, mx: 1 }}>
              <Button
                variant="text"
                onClick={() => onSelectUnit(unit)}
                fullWidth
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  textTransform: 'none',
                  color: theme.palette.text.primary,
                }}
              >
                <Box display="flex" alignItems="center" flexGrow={1}>
                  <Typography>{`${unit.name} x${unitCounts[unit.name] || 0}`}</Typography>
                </Box>
                <Box display="flex" alignItems="center">
                  <Typography>{`${unit.points} pts`}</Typography>
                  <IconButton size="small" sx={{ ml: 2 }}>
                    <Plus size={16} />
                  </IconButton>
                </Box>
              </Button>
            </Paper>
          ))}
        </List>

        {/* Close button with filled style and Lucide X icon */}
        <Box sx={{ position: 'sticky', bottom: 0, bgcolor: theme.palette.background.default, p: 2 }}>
          <Button onClick={onClose} variant="contained" color="primary" size="large" fullWidth startIcon={<X size={18} />}>
            Close
          </Button>
        </Box>
      </Drawer>
    </>
  );
}

export default CategoryUnitSelectionDrawer;
