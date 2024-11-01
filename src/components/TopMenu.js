// src/components/TopMenu.js
import React from 'react';
import { AppBar, Toolbar, Typography, Switch, Box } from '@mui/material';

function TopMenu({ toggleDarkMode, mode }) {
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Rainbowscribe
        </Typography>
        <Box display="flex" alignItems="center">
          <Typography variant="body2" sx={{ mr: 1 }}>
            {mode === 'light' ? 'Light Mode' : 'Dark Mode'}
          </Typography>
          <Switch checked={mode === 'dark'} onChange={toggleDarkMode} />
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default TopMenu;
