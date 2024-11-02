import React, { useState } from 'react';
import { Fab, Drawer, List, ListSubheader, Button, Box, Paper, Typography, IconButton, useTheme } from '@mui/material';
import { Plus, Minus, X } from 'lucide-react';
import { keyframes } from '@emotion/react';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(5px); }
  to { opacity: 1; transform: translateY(0); }
`;

function DrawerItem({ unit, isSelected, selectedCount, selectedPoints, onSelect, onDeselect }) {
  const theme = useTheme();

  return (
    <Paper
      elevation={2}
      sx={{
        p: 1.5,
        mb: 1,
        mx: 1,
        bgcolor: isSelected ? `rgba(25, 118, 210, 0.05)` : theme.palette.background.paper,
        border: isSelected ? `1px solid ${theme.palette.primary.main}` : '1px solid transparent',
        transition: 'background-color 0.3s ease, border-color 0.3s ease',
      }}
    >
      <Box
        onClick={onSelect}
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          textTransform: 'none',
          color: theme.palette.text.primary,
          paddingLeft: 1.5,
          cursor: 'pointer',
          width: '100%',
        }}
      >
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

          <Box sx={{ visibility: isSelected ? 'visible' : 'hidden' }}>
            <IconButton size="small" onClick={(e) => { e.stopPropagation(); onDeselect(unit); }}>
              <Minus size={16} />
            </IconButton>
          </Box>

          <IconButton size="small" sx={{ ml: 1 }} onClick={(e) => { e.stopPropagation(); onSelect(unit); }}>
            <Plus size={16} />
          </IconButton>
        </Box>
      </Box>

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
}

function UnitSelectionDrawer({ unitsByCategory, category = null, onSelectUnit, unitCounts, isFAB = false }) {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
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
    onSelectUnit(unit);
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

  // Handle unit display with categories when opened via FAB
  const unitsToShow = category
    ? (unitsByCategory[category] || [])
    : Object.entries(unitsByCategory);

  return (
    <>
      {isFAB ? (
        <Fab
          color="primary"
          aria-label="view-all-units"
          onClick={() => setOpen(true)}
          sx={{ position: 'fixed', bottom: 16, right: 16 }}
        >
          <Plus size={24} />
        </Fab>
      ) : (
        <IconButton fontSize="small" sx={{ mr: 2 }} onClick={() => setOpen(true)}>
          <Plus size={18} />
        </IconButton>
      )}

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
          {category
            ? // Display units for a single category
              unitsToShow.map((unit, index) => (
                <DrawerItem
                  key={index}
                  unit={unit}
                  isSelected={selectedUnits[unit.name]?.count > 0}
                  selectedCount={selectedUnits[unit.name]?.count || 0}
                  selectedPoints={selectedUnits[unit.name]?.points || 0}
                  onSelect={() => handleSelectUnit(unit)}
                  onDeselect={() => handleDeselectUnit(unit)}
                />
              ))
            : // Display all units grouped by category
              unitsToShow.map(([categoryName, units]) => (
                <React.Fragment key={categoryName}>
                  <ListSubheader sx={{ bgcolor: theme.palette.background.default }}>
                    <Typography  variant="overline" color="text.primary">
                      {categoryName}
                    </Typography>
                  </ListSubheader>
                  {units.map((unit, index) => (
                    <DrawerItem
                      key={`${categoryName}-${index}`}
                      unit={unit}
                      isSelected={selectedUnits[unit.name]?.count > 0}
                      selectedCount={selectedUnits[unit.name]?.count || 0}
                      selectedPoints={selectedUnits[unit.name]?.points || 0}
                      onSelect={() => handleSelectUnit(unit)}
                      onDeselect={() => handleDeselectUnit(unit)}
                    />
                  ))}
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

export default UnitSelectionDrawer;
