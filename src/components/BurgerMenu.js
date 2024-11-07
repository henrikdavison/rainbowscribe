import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemText, Box, Switch, IconButton, Typography } from '@mui/material';
import { Menu } from 'lucide-react';

function BurgerMenu({ toggleDarkMode, mode }) {
  const [open, setOpen] = useState(false);

  const handleToggle = () => setOpen(!open);

  return (
    <Box>
      <IconButton sx={{ ml: -1 }} onClick={handleToggle}>
        <Menu size={24} />
      </IconButton>
      <Drawer anchor="left" open={open} onClose={handleToggle}>
        <List sx={{ width: 300 }}>
        <ListItem button onClick={handleToggle}>
            <ListItemText primary="Army Builder" />
          </ListItem>
          <ListItem button onClick={handleToggle}>
            <ListItemText primary="Settings" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Dark Mode" />
            <Switch checked={mode === 'dark'} onChange={toggleDarkMode} />
          </ListItem>
          {/* Additional items can be added here */}
        </List>
      </Drawer>
    </Box>
  );
}

export default BurgerMenu;
