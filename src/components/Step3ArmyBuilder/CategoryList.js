import React, { useState, useEffect } from 'react';
import { Box, Typography, Stack, useTheme } from '@mui/material';
import CategoryItem from './CategoryItem';
import UnitSelectionDrawer from './UnitSelectionDrawer';

function CategoryList({ onTotalPointsChange }) {
  const theme = useTheme();

  const categories = [
    { name: 'Epic Hero', items: [] },
    { name: 'Character', items: [] },
    { name: 'Battleline', items: [] },
    { name: 'Vehicle', items: [] },
    { name: 'Fortification', items: [] },
    { name: 'Allied Units', items: [] },
  ];

  const [army, setArmy] = useState({
    'Epic Hero': [],
    'Character': [],
    'Battleline': [],
    'Vehicle': [],
    'Fortification': [],
    'Allied Units': [],
  });

  const [unitCounts, setUnitCounts] = useState({});
  const sampleUnits = {
    'Epic Hero': [{ name: 'Barroth', points: 75 }, { name: 'Fuegan Ra', points: 100 }],
    'Character': [{ name: 'Autarch', points: 100 }, { name: 'Farseer', points: 120 }],
    'Battleline': [{ name: 'Guardian Defenders', points: 100 }, { name: 'Storm Guardians', points: 110 }],
    'Vehicle': [{ name: 'Wave Serpent', points: 130 }, { name: 'Fire Prism', points: 140 }],
    'Fortification': [{ name: 'Bastion', points: 150 }, { name: 'Defense Wall', points: 80 }],
    'Allied Units': [{ name: 'Ally Unit A', points: 90 }, { name: 'Ally Unit B', points: 95 }],
  };

  const handleSelectUnit = (unit, category) => {
    setArmy((prevArmy) => ({
      ...prevArmy,
      [category]: [...(prevArmy[category] || []), { ...unit, id: Date.now() }],
    }));
    setUnitCounts((prevCounts) => ({
      ...prevCounts,
      [unit.name]: (prevCounts[unit.name] || 0) + 1,
    }));
  };

  const handleDeleteItem = (category, id, unitName) => {
    setArmy((prevArmy) => ({
      ...prevArmy,
      [category]: prevArmy[category].filter((item) => item.id !== id),
    }));
    setUnitCounts((prevCounts) => ({
      ...prevCounts,
      [unitName]: Math.max((prevCounts[unitName] || 1) - 1, 0),
    }));
  };

  useEffect(() => {
    const totalPoints = Object.values(army).flat().reduce((acc, item) => acc + item.points, 0);
    onTotalPointsChange(totalPoints);
  }, [army, onTotalPointsChange]);

  return (
    <>
      <Stack borderColor={theme.palette.divider}>
        {categories.map((category) => (
          <Box key={category.name} marginTop={2} paddingLeft={2}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="overline">{category.name}</Typography>
              <UnitSelectionDrawer
                unitsByCategory={sampleUnits}
                category={category.name}
                onSelectUnit={(unit) => handleSelectUnit(unit, category.name)}
                unitCounts={unitCounts}
                isFAB={false}
              />
            </Box>
            <Stack>
              {army[category.name].map((item) => (
                <CategoryItem
                  key={item.id}
                  name={item.name}
                  points={item.points}
                  count={unitCounts[item.name] || 0}
                  onDelete={() => handleDeleteItem(category.name, item.id, item.name)}
                  isLastItem={item === army[category.name][army[category.name].length - 1]}
                />
              ))}
            </Stack>
          </Box>
        ))}
      </Stack>

      {/* FAB Drawer for all units */}
      <UnitSelectionDrawer
        unitsByCategory={sampleUnits}
        onSelectUnit={(unit) => handleSelectUnit(unit, Object.keys(sampleUnits).find((key) => sampleUnits[key].includes(unit)))}
        unitCounts={unitCounts}
        isFAB={true}
      />
    </>
  );
}

export default CategoryList;
