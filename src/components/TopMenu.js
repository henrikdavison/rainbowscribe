// src/components/TopMenu.js
import React from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

function TopMenu() {
  return (
    <AppBar position="fixed" color="primary" elevation={0}>
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" color="inherit" noWrap>
          Rainbowscribe
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default TopMenu;
