import React, { useState } from 'react';
import { SwipeableDrawer, Box, Button, useTheme, useMediaQuery } from '@mui/material';
import { X } from 'lucide-react';
import ViewUnitDrawer from '../components/Step3ArmyBuilder/ViewUnitDrawer';
import EditUnitDrawer from '../components/Step3ArmyBuilder/EditUnitDrawer';

function DrawerManager({ unit, children }) {
  const [activeDrawer, setActiveDrawer] = useState(null); // 'view', 'edit', or null
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const openDrawer = (type) => setActiveDrawer(type);
  const closeDrawer = () => setActiveDrawer(null);

  return (
    <>
      {/* Render children (e.g., CategoryItem) and pass openDrawer as a prop */}
      {React.cloneElement(children, { openDrawer })}

      <SwipeableDrawer
        anchor="bottom"
        open={Boolean(activeDrawer)}
        onClose={closeDrawer}
        onOpen={() => {}}
        PaperProps={{
          sx: {
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            height: 'calc(100vh - 64px)', // Adjust for menu height if necessary
            bgcolor: theme.palette.background.default,
          },
        }}
      >
        {/* Swipe Indicator for Mobile */}
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

        {/* Conditionally Render Content Based on Active Drawer */}
        <Box sx={{ flexGrow: 1, overflowY: 'auto', padding: 2 }}>
          {activeDrawer === 'view' && <ViewUnitDrawer unit={unit} />}
          {activeDrawer === 'edit' && <EditUnitDrawer unit={unit} />}
        </Box>

        {/* Close Button */}
        <Box sx={{ position: 'sticky', bottom: 0, bgcolor: theme.palette.background.default, p: 2 }}>
          <Button onClick={closeDrawer} variant="contained" color="primary" fullWidth startIcon={<X />}>
            Close
          </Button>
        </Box>
      </SwipeableDrawer>
    </>
  );
}

export default DrawerManager;
