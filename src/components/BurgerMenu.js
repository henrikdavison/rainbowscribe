import React, { useState } from 'react';
import { IconButton, Drawer, List, ListItem, ListItemText, Box } from '@mui/material';
import { Menu } from 'lucide-react';

function BurgerMenu() {
  const [open, setOpen] = useState(false);

  const handleToggle = () => setOpen(!open);

  return (
    <Box>
      <IconButton onClick={handleToggle}>
        <Menu size={24} />
      </IconButton>
      <Drawer anchor="left" open={open} onClose={handleToggle}>
        <List sx={{ width: 250 }}>
          <ListItem button onClick={handleToggle}>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem button onClick={handleToggle}>
            <ListItemText primary="Settings" />
          </ListItem>
          <ListItem button onClick={handleToggle}>
            <ListItemText primary="About" />
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
}

export default BurgerMenu;
