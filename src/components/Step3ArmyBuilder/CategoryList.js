import React, { useState, useEffect } from 'react';
import { Box, Typography, Stack, useTheme } from '@mui/material';
import CategoryItem from './CategoryItem';
import FABUnitSelectionDrawer from './FABUnitSelectionDrawer';
import CategoryUnitSelectionDrawer from './CategoryUnitSelectionDrawer';

function CategoryList({ onTotalPointsChange }) {
  const theme = useTheme(); // Access the default MUI theme

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
  const [fabDrawerOpen, setFabDrawerOpen] = useState(false);
  const [categoryDrawerOpen, setCategoryDrawerOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const sampleUnits = {
    'Epic Hero': [{ name: 'Barroth', points: 75 }, { name: 'Fuegan Ra', points: 100 }],
    'Character': [{ name: 'Autarch', points: 100 }, { name: 'Farseer', points: 120 }],
    'Battleline': [{ name: 'Guardian Defenders', points: 100 }, { name: 'Storm Guardians', points: 110 }],
    'Vehicle': [{ name: 'Guardian Defenders', points: 100 }, { name: 'Storm Guardians', points: 110 }],
    'Fortification': [{ name: 'Guardian Defenders', points: 100 }, { name: 'Storm Guardians', points: 110 }],
    'Allied Units': [{ name: 'Guardian Defenders', points: 100 }, { name: 'Storm Guardians', points: 110 }],
  };

  const handleSelectUnit = (unit, category) => {
    setArmy((prevArmy) => ({
      ...prevArmy,
      [category]: [...prevArmy[category], { ...unit, id: Date.now() }],
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
        {categories.map((category, index) => (
          <Box
            key={category.name}
            marginTop={2}
          >
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography sx={(theme) => theme.utils.giveOuterPadding} variant="overline">{category.name}</Typography>
              <CategoryUnitSelectionDrawer
                open={categoryDrawerOpen && selectedCategory === category.name}
                onOpen={() => {
                  setSelectedCategory(category.name);
                  setCategoryDrawerOpen(true);
                }}
                onClose={() => setCategoryDrawerOpen(false)}
                category={category.name}
                units={sampleUnits[category.name]}
                onSelectUnit={(unit) => handleSelectUnit(unit, category.name)}
                unitCounts={unitCounts}
              />
            </Box>
            <Stack>
              {army[category.name].map((item, itemIndex) => (
                <CategoryItem
                  key={item.id}
                  name={item.name}
                  points={item.points}
                  count={unitCounts[item.name] || 0}
                  onDelete={() => handleDeleteItem(category.name, item.id, item.name)}
                  isLastItem={itemIndex === army[category.name].length - 1}
                />
              ))}
            </Stack>
          </Box>
        ))}
      </Stack>

      {/* FAB Drawer for all units */}
      <FABUnitSelectionDrawer
        open={fabDrawerOpen}
        onOpen={() => setFabDrawerOpen(true)}
        onClose={() => setFabDrawerOpen(false)}
        unitsByCategory={sampleUnits}
        onSelectUnit={(unit) => handleSelectUnit(unit, 'all')}
        unitCounts={unitCounts}
      />
    </>
  );
}

export default CategoryList;
