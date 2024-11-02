import React, { useState } from 'react';
import { Drawer, List, IconButton, Button, Box, Paper, Typography, ListSubheader, useTheme } from '@mui/material';
import { Plus, Minus, X } from 'lucide-react';
import { keyframes } from '@emotion/react';

function CategoryUnitSelectionDrawer({ open, onOpen, onClose, category, units, onSelectUnit, unitCounts }) {
  const theme = useTheme();

  const [selectedUnits, setSelectedUnits] = useState({});

  const handleSelectUnit = (unit) => {
    setSelectedUnits((prevSelectedUnits) => {
      const newCount = (prevSelectedUnits[unit.name]?.count || 0) + 1;
      const newPoints = (prevSelectedUnits[unit.name]?.points || 0) + unit.points;
      return {
        ...prevSelectedUnits,
        [unit.name]: { count: newCount, points: newPoints },
      };
    });
    onSelectUnit(unit); // Trigger the external onSelectUnit function
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

  const fadeIn = keyframes`
    from { opacity: 0; transform: translateY(5px); }
    to { opacity: 1; transform: translateY(0); }
  `;

  return (
    <>
      <IconButton fontSize="small" sx={{ mr: 2 }} variant="contained" onClick={onOpen}>
        <Plus size={18} />
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
          <ListSubheader sx={{ bgcolor: theme.palette.background.default }}>
            <Typography variant="overline" color="text.primary">
              {category}
            </Typography>
          </ListSubheader>

          {(units || []).map((unit, index) => {
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
                  onClick={() => handleSelectUnit(unit)}
                  fullWidth
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    textTransform: 'none',
                    color: theme.palette.text.primary,
                    padding: '0px',
                  }}
                >
                  {/* Unit name left-aligned with ellipsis */}
                  <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
                    <Typography
                      sx={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        paddingRight: '8px'
                      }}
                    >
                      {unit.name}
                    </Typography>
                  </Box>

                  {/* Points and action buttons */}
                  <Box display="flex" alignItems="center">
                    <Typography color="textSecondary"
                      sx={{
                        textAlign: 'right',
                        minWidth: 50, // Fixed space for points text to keep layout consistent
                        mr: 1,
                      }}
                    >
                      {unit.points} pts
                    </Typography>

                    {/* Minus button, always takes space but only shows when unit is selected */}
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
                      handleSelectUnit(unit);
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
        </List>

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
