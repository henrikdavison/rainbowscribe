import React from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, useTheme } from '@mui/material';

function ViewUnitDrawer({ unit }) {
  const theme = useTheme();

  // Profile attributes with shortened labels
  const profileAttributes = [
    { label: 'M', value: unit.movement || '6"' },
    { label: 'Ws', value: unit.weaponSkill || '3+' },
    { label: 'Bs', value: unit.ballisticSkill || '3+' },
    { label: 'S', value: unit.strength || '4' },
    { label: 'T', value: unit.toughness || '4' },
    { label: 'W', value: unit.wounds || '3' },
    { label: 'Oc', value: unit.objectiveControl || '2' },
  ];

  return (
    <Box>
      {/* Unit Name */}
      <Typography variant="h6" gutterBottom>
        {unit.name}
      </Typography>

      {/* Profile Attributes Horizontal Table */}
      <TableContainer sx={{ marginBottom: 2, bgcolor: theme.palette.background.paper, borderRadius: 1, overflow: 'hidden' }}>
        <Table>
          <TableHead>
            <TableRow>
              {profileAttributes.map((attr, index) => (
                <TableCell key={index} sx={{ fontWeight: 600, textAlign: 'center' }}>
                  {attr.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              {profileAttributes.map((attr, index) => (
                <TableCell key={index} sx={{ textAlign: 'center' }}>
                  {attr.value}
                </TableCell>
              ))}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      {/* Abilities Section */}
      <Typography variant="subtitle1" gutterBottom>
        Abilities
      </Typography>
      <Box sx={{ bgcolor: theme.palette.background.paper, p: 2, borderRadius: 1 }}>
        {Array.isArray(unit.abilities) ? (
          unit.abilities.map((ability, index) => (
            <Box key={index} mb={1}>
              <Typography variant="body2" fontWeight="bold">
                {ability.name}
              </Typography>
              <Typography variant="body2">
                {ability.description}
              </Typography>
            </Box>
          ))
        ) : (
          <Typography variant="body2">
            {unit.abilities || 'No abilities available for this unit.'}
          </Typography>
        )}
      </Box>
    </Box>
  );
}

export default ViewUnitDrawer;
