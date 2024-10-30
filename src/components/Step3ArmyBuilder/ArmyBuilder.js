// src/components/Step3ArmyBuilder/ArmyBuilder.js
import React, { useState } from 'react';
import { Box, Typography, IconButton, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CategoryList from './CategoryList';

function ArmyBuilder({ army }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [totalPoints, setTotalPoints] = useState(0);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleChangeArmy = () => {
    setAnchorEl(null);
    // Logic for changing the army would go here
  };

  const handleTotalPointsChange = (points) => {
    setTotalPoints(points);
  };

  return (
    <Box p={2} width="100%" position="relative" minHeight="100vh">
      {/* Header Section with Title, Total Points, and Options Menu */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
        <Typography variant="h6" color="textPrimary">
          {army}
        </Typography>
        <IconButton onClick={handleMenuOpen}>
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
      
      {/* Display Total Points */}
      <Typography variant="subtitle1" color="textSecondary" mb={2}>
        {totalPoints} pts
      </Typography>

      {/* Category List with Total Points Calculation */}
      <CategoryList onTotalPointsChange={handleTotalPointsChange} />
    </Box>
  );
}

export default ArmyBuilder;
