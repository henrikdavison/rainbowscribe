// src/components/Step3ArmyBuilder/FABUnitSelectionDrawer.js
import React, { useState } from 'react';
import { Fab, Drawer, List, ListSubheader, Button, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

function FABUnitSelectionDrawer({ unitsByCategory, onSelectUnit, unitCounts }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Fab
        color="primary"
        aria-label="view-all-units"
        onClick={() => setOpen(true)}
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
      >
        <AddIcon />
      </Fab>

      <Drawer
        anchor="bottom"
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          sx: { borderTopLeftRadius: 8, borderTopRightRadius: 8, maxHeight: '60vh', overflowY: 'auto' },
        }}
      >
        <List sx={{ paddingBottom: 8 }}>
          {Object.entries(unitsByCategory).map(([category, units]) => (
            <React.Fragment key={category}>
              <ListSubheader>{category}</ListSubheader>
              {units.map((unit, index) => (
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
            </React.Fragment>
          ))}
        </List>

        <Box sx={{ position: 'sticky', bottom: 0, bgcolor: 'background.paper', p: 2 }}>
          <Button onClick={() => setOpen(false)} variant="outlined" color="primary" fullWidth>
            Close
          </Button>
        </Box>
      </Drawer>
    </>
  );
}

export default FABUnitSelectionDrawer;
