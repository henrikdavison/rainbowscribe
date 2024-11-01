// src/components/Step3ArmyBuilder/CategoryList.js
import React, { useState, useEffect } from 'react';
import { Box, Typography, Stack } from '@mui/material';
import CategoryItem from './CategoryItem';
import FABUnitSelectionDrawer from './FABUnitSelectionDrawer';
import CategoryUnitSelectionDrawer from './CategoryUnitSelectionDrawer';

function CategoryList({ onTotalPointsChange }) {
  const categories = [
    { name: 'Epic Hero', items: [] },
    { name: '1x Character', items: [] },
    { name: '1x Battleline', items: [] },
  ];

  const [army, setArmy] = useState({
    'Epic Hero': [],
    '1x Character': [],
    '1x Battleline': [],
  });

  const [unitCounts, setUnitCounts] = useState({});
  const [fabDrawerOpen, setFabDrawerOpen] = useState(false);
  const [categoryDrawerOpen, setCategoryDrawerOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const sampleUnits = {
    'Epic Hero': [{ name: 'Barroth', points: 75 }, { name: 'Fuegan Ra', points: 100 }],
    '1x Character': [{ name: 'Autarch', points: 100 }, { name: 'Farseer', points: 120 }],
    '1x Battleline': [{ name: 'Guardian Defenders', points: 100 }, { name: 'Storm Guardians', points: 110 }],
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
      <Stack borderTop={1} borderColor="grey.300">
        {categories.map((category, index) => (
          <Box
            key={category.name}
            bgcolor="grey.200"
            pt={1}
            borderBottom={1}
            borderColor="grey.300"
          >
            <Box paddingBottom={1} display="flex" justifyContent="space-between" alignItems="center">
              <Typography sx={(theme) => theme.utils.giveOuterPadding} variant="subtitle1">{category.name}</Typography>
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
