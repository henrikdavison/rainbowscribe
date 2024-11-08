import React, { useState } from 'react';
import { Box, Typography, IconButton, Menu, MenuItem, TextField, Button } from '@mui/material';
import { MoreVertical, Edit3 } from 'lucide-react';
import CategoryList from './CategoryList';

function ArmyBuilder({ army, faction = "Aeldari", onChangeArmy }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [totalPoints, setTotalPoints] = useState(0);
  const [isEditingName, setIsEditingName] = useState(false);
  const [customName, setCustomName] = useState('');
  const [hasEditedName, setHasEditedName] = useState(false);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleChangeArmy = () => {
    handleMenuClose();
    onChangeArmy();
  };

  const handleTotalPointsChange = (points) => {
    setTotalPoints(points);
  };

  const handleNameClick = () => {
    setIsEditingName(true);
  };

  const handleNameChange = (event) => {
    setCustomName(event.target.value);
    setHasEditedName(true);
  };

  const handleNameBlur = () => {
    setIsEditingName(false);
  };

  return (
    <Box width="100%" minHeight="100vh" sx={{ bgcolor: 'background.default' }}>
      {/* Editable Army Name with Placeholder */}
      <Box px={2} pt={1} display="flex" alignItems="center" justifyContent="space-between" mb={-0.5}>
        {isEditingName ? (
          <TextField
            variant="standard"
            value={customName}
            placeholder="Add Army Name"
            onChange={handleNameChange}
            onBlur={handleNameBlur}
            autoFocus
            fullWidth
            sx={{
              color: hasEditedName ? 'text.primary' : 'text.secondary',
              maxWidth: {
              xs: 200,
              sm: 300,
              }
            }}
          />
        ) : (
          <Box display="flex" alignItems="center">
            <Typography
              variant="h6"
              color={customName ? 'text.primary' : 'text.secondary'}
              onClick={handleNameClick}
            >
              {customName || "Army name"}
            </Typography>
            <IconButton size="small" onClick={handleNameClick} color="inherit" sx={{ ml: 1 }}>
              <Edit3 size={16} />
            </IconButton>
          </Box>
        )}
        <Button
          variant="options"
          onClick={handleMenuOpen}
          endIcon={<MoreVertical size={18} />} // Icon moved to the right
        >
          Options
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleChangeArmy}>Change Army</MenuItem>
        </Menu>
      </Box>
      <Box px={2} mt={0.5} display="flex">
        {/* Faction Name and Points Display */}
        <Typography variant="subtitle1" color="text.secondary">
          {faction}
        </Typography>
        <Typography variant="pointsValue" ml={1}>
          {totalPoints} pts
        </Typography>
      </Box>
      {/* Category List with Total Points Calculation */}
      <CategoryList onTotalPointsChange={handleTotalPointsChange} />
    </Box>
  );
}

export default ArmyBuilder;

