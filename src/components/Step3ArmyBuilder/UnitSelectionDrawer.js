// TODO: Refactor to use DrawerManager.js

import React, { useState } from 'react';
import { Fab, SwipeableDrawer, List, ListSubheader, Box, Paper, Typography, IconButton, Button, useTheme, useMediaQuery } from '@mui/material';
import { Plus, Minus, X } from 'lucide-react';
import { keyframes } from '@emotion/react';

const fadeIn = keyframes`
  0% { opacity: 0; transform: translateY(15px); }
  100% { opacity: 1; transform: translateY(0); }
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
          cursor: 'pointer',
          width: '100%',
        }}
      >
        <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
          <Typography
            variant="unitName"
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              mr: 1,
              maxWidth: { xs: '190px', sm: '250px', xl:'400px' }, 
            }}
          >
            {unit.name}
          </Typography>
          <Typography
            variant="pointsValue"
            sx={{
              textAlign: 'right',
            }}
          >
            {unit.points} pts
          </Typography>
        </Box>

        <Box display="flex" alignItems="center">

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
          {selectedCount} selected • {selectedPoints} pts total
        </Typography>
      )}
    </Paper>
  );
}

function UnitSelectionDrawer({ unitsByCategory, category = null, onSelectUnit, unitCounts, isFAB = false }) {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [selectedUnits, setSelectedUnits] = useState({});
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Detects mobile screens

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

      <SwipeableDrawer
        anchor="bottom"
        open={open}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        PaperProps={{
          sx: {
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            height: '60vh',
            display: 'flex',
            flexDirection: 'column',
            bgcolor: theme.palette.background.default,
          },
        }}
      >
        {/* Drawer Swipe Indicator (Visible only on mobile) */}
        {isMobile && (
          <Box
            sx={{
              width: 40,
              height: 8,
              bgcolor: theme.palette.text.secondary,
              borderRadius: 4,
              alignSelf: 'center',
              marginTop: 1,
              marginBottom: 1,
            }}
          />
        )}

        <Box sx={{ flexGrow: 1, overflowY: 'auto', paddingBottom: 8 }}>
          <List>
            {category ? (
              <>
                <ListSubheader sx={{ bgcolor: theme.palette.background.default }}>
                  <Typography variant="overline" color="text.primary">
                    {category}
                  </Typography>
                </ListSubheader>
                {unitsToShow.map((unit, index) => (
                  <DrawerItem
                    key={index}
                    unit={unit}
                    isSelected={selectedUnits[unit.name]?.count > 0}
                    selectedCount={selectedUnits[unit.name]?.count || 0}
                    selectedPoints={selectedUnits[unit.name]?.points || 0}
                    onSelect={() => handleSelectUnit(unit)}
                    onDeselect={() => handleDeselectUnit(unit)}
                  />
                ))}
              </>
            ) : (
              unitsToShow.map(([categoryName, units]) => (
                <React.Fragment key={categoryName}>
                  <ListSubheader sx={{ bgcolor: theme.palette.background.default }}>
                    <Typography variant="overline" color="text.primary">
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
              ))
            )}
          </List>
        </Box>

        <Box sx={{ position: 'sticky', bottom: 0, bgcolor: theme.palette.background.default, p: 2 }}>
          <Button onClick={() => setOpen(false)} variant="contained" color="primary" size="large" fullWidth startIcon={<X size={24} />}>
            Close
          </Button>
        </Box>
      </SwipeableDrawer>
    </>
  );
}

export default UnitSelectionDrawer;
