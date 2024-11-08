import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemText, Box, Switch, IconButton, Typography } from '@mui/material';
import { Menu } from 'lucide-react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

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
            <ListItemText primary="Prototype N" />
          </ListItem>
          <ListItem button onClick={handleToggle}>
            <ListItemText primary="Settings" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Dark Mode" />
            <Switch checked={mode === 'dark'} onChange={toggleDarkMode} />
          </ListItem>
          {/* Link to Army Builder */}
          <ListItem button component={Link} to="/army-builder" onClick={handleToggle}>
            <ListItemText primary="Army Builder" />
          </ListItem>
          {/* Link to Bluescribe Prototype */}
          <ListItem button component={Link} to="/bluescribe-prototype/catalogues" onClick={handleToggle}>
            <ListItemText primary="Catalogues Prototype" />
          </ListItem>
          <ListItem button component={Link} to="/select-system" onClick={handleToggle}>
            <ListItemText primary="Select System (Prototype)" />
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
}

export default BurgerMenu;
