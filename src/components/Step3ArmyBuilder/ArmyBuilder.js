// src/components/Step3ArmyBuilder/ArmyBuilder.js
import React, { useState } from 'react';
import { Box, Typography, IconButton, Menu, MenuItem, TextField } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
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
      <Box px={2} pt={2} display="flex" alignItems="center" justifyContent="space-between" mb={-0.5}>
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
              typography: 'h4',
              color: hasEditedName ? 'text.primary' : 'text.secondary',
              '& .MuiInputBase-input': { fontWeight: 'bold' },
            }}
          />
        ) : (
          <Typography
            variant="h6"
            color={customName ? 'text.primary' : 'text.secondary'}
            fontWeight="bold"
            onClick={handleNameClick}
          >
            {customName || "Add Army Name"}
          </Typography>
        )}
        <IconButton onClick={handleMenuOpen} color="inherit" sx={{ ml: 1 }}>
          <MoreVertIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleChangeArmy}>Change Army</MenuItem>
        </Menu>
      </Box>
      <Box px={2}>
        {/* Faction Name and Points Display */}
        <Typography variant="subtitle1" color="text.secondary" mb={3}>
          {faction} • {totalPoints} pts
        </Typography>
        </Box>
        {/* Category List with Total Points Calculation */}
        <CategoryList onTotalPointsChange={handleTotalPointsChange} />
       
    </Box>
  );
}

export default ArmyBuilder;
