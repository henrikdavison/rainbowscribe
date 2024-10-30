// src/components/Step3ArmyBuilder/CategoryUnitSelectionDrawer.js
import React from 'react';
import { Drawer, List, Button, Box, ListSubheader } from '@mui/material';

function CategoryUnitSelectionDrawer({ open, onOpen, onClose, category, units, onSelectUnit, unitCounts }) {
  return (
    <>
      <Button variant="contained" onClick={onOpen}>
        Add {category}
      </Button>

      <Drawer
        anchor="bottom"
        open={open}
        onClose={onClose}
        PaperProps={{
          sx: { borderTopLeftRadius: 8, borderTopRightRadius: 8, maxHeight: '60vh', overflowY: 'auto' },
        }}
      >
        <List sx={{ paddingBottom: 8 }}>
          <ListSubheader>{category}</ListSubheader>
          {(units || []).map((unit, index) => (
            <Box key={index} p={1}>
              <Button
                variant="text"
                onClick={() => onSelectUnit(unit)}
                fullWidth
                sx={{ justifyContent: 'flex-start', textTransform: 'none' }}
              >
                {`${unit.name} x${unitCounts[unit.name] || 0} - ${unit.points} pts`}
              </Button>
            </Box>
          ))}
        </List>

        <Box sx={{ position: 'sticky', bottom: 0, bgcolor: 'background.paper', p: 2 }}>
          <Button onClick={onClose} variant="outlined" color="primary" fullWidth>
            Close
          </Button>
        </Box>
      </Drawer>
    </>
  );
}

export default CategoryUnitSelectionDrawer;
