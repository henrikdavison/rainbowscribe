import React, { useState } from 'react';
import { Fab, Drawer, List, ListSubheader, Button, Box, Paper, Typography, IconButton, useTheme } from '@mui/material';
import { Plus, Minus, X } from 'lucide-react';
import { keyframes } from '@emotion/react';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(5px); }
  to { opacity: 1; transform: translateY(0); }
`;

function FABUnitSelectionDrawer({ unitsByCategory, onSelectUnit, unitCounts }) {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [selectedUnits, setSelectedUnits] = useState({});

  // Ensure each category is initialized in army
  const handleSelectUnit = (unit, category) => {
    setSelectedUnits((prevSelectedUnits) => {
      const newCount = (prevSelectedUnits[unit.name]?.count || 0) + 1;
      const newPoints = (prevSelectedUnits[unit.name]?.points || 0) + unit.points;
      return {
        ...prevSelectedUnits,
        [unit.name]: { count: newCount, points: newPoints },
      };
    });

    onSelectUnit((prevArmy) => ({
      ...prevArmy,
      [category]: [...(prevArmy[category] ?? []), { ...unit, id: Date.now() }], // Initializes as array if undefined
    }));
  };

  const handleDeselectUnit = (unit) => {
    setSelectedUnits((prevSelectedUnits) => {
      const currentCount = prevSelectedUnits[unit.name]?.count || 0;
      if (currentCount <= 1) {
        const { [unit.name]: _, ...remainingUnits } = prevSelectedUnits;
        return remainingUnits;
      } else {
        return {
          ...prevSelectedUnits,
          [unit.name]: {
            count: currentCount - 1,
            points: prevSelectedUnits[unit.name].points - unit.points,
          },
        };
      }
    });
  };

  return (
    <>
      <Fab
        color="primary"
        aria-label="view-all-units"
        onClick={() => setOpen(true)}
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
      >
        <Plus size={24} />
      </Fab>

      <Drawer
        anchor="bottom"
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          sx: {
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            maxHeight: '60vh',
            overflowY: 'auto',
            bgcolor: theme.palette.background.default,
          },
        }}
      >
        <List sx={{ paddingBottom: 8 }}>
          {Object.entries(unitsByCategory).map(([category, units]) => (
            <React.Fragment key={category}>
              <ListSubheader sx={{ bgcolor: theme.palette.background.default }}>
                <Typography variant="overline" color="text.primary">
                  {category}
                </Typography>
              </ListSubheader>

              {units.map((unit, index) => {
                const isSelected = selectedUnits[unit.name]?.count > 0;
                const selectedCount = selectedUnits[unit.name]?.count || 0;
                const selectedPoints = selectedUnits[unit.name]?.points || 0;

                return (
                  <Paper
                    key={index}
                    elevation={2}
                    sx={{
                      p: 1.5,
                      mb: 1,
                      mx: 1,
                      bgcolor: isSelected
                        ? `rgba(25, 118, 210, 0.05)`
                        : theme.palette.background.paper,
                      border: isSelected ? `1px solid ${theme.palette.primary.main}` : '1px solid transparent',
                      transition: 'background-color 0.3s ease, border-color 0.3s ease',
                    }}
                  >
                    <Button
                      variant="text"
                      onClick={() => handleSelectUnit(unit, category)}
                      fullWidth
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        textTransform: 'none',
                        color: theme.palette.text.primary,
                        paddingLeft: 1.5,
                      }}
                    >
                      {/* Unit name with ellipsis */}
                      <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
                        <Typography
                          sx={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {unit.name}
                        </Typography>
                      </Box>

                      {/* Points and action buttons */}
                      <Box display="flex" alignItems="center">
                        <Typography
                          sx={{
                            textAlign: 'right',
                            minWidth: 50,
                            marginRight: isSelected ? 1 : 2,
                          }}
                        >
                          {unit.points} pts
                        </Typography>

                        {/* Minus button, only shows when unit is selected */}
                        <Box sx={{ visibility: isSelected ? 'visible' : 'hidden' }}>
                          <IconButton size="small" onClick={(e) => {
                            e.stopPropagation();
                            handleDeselectUnit(unit);
                          }}>
                            <Minus size={16} />
                          </IconButton>
                        </Box>

                        {/* Plus button */}
                        <IconButton size="small" sx={{ ml: 1 }} onClick={(e) => {
                          e.stopPropagation();
                          handleSelectUnit(unit, category);
                        }}>
                          <Plus size={16} />
                        </IconButton>
                      </Box>
                    </Button>

                    {/* Selected info below */}
                    {isSelected && (
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{
                          mt: 0.5,
                          animation: `${fadeIn} 0.3s ease-in-out`,
                        }}
                      >
                        {selectedCount} selected &middot; {selectedPoints} pts total
                      </Typography>
                    )}
                  </Paper>
                );
              })}
            </React.Fragment>
          ))}
        </List>

        <Box sx={{ position: 'sticky', bottom: 0, bgcolor: theme.palette.background.default, p: 2, zIndex: 1 }}>
          <Button onClick={() => setOpen(false)} variant="contained" color="primary" size="large" fullWidth startIcon={<X size={18} />}>
            Close
          </Button>
        </Box>
      </Drawer>
    </>
  );
}

export default FABUnitSelectionDrawer;
