import React, { useState, useEffect } from 'react';
import { Box, Typography, Stack, useTheme } from '@mui/material';
import CategoryItem from './CategoryItem';
import UnitSelectionDrawer from './UnitSelectionDrawer';
import { categories, sampleUnits } from '../../data/unitData'; 
import { getUnitSummary } from '../../utils/unitSummary';

function CategoryList({ onTotalPointsChange }) {
  const theme = useTheme();

  const [army, setArmy] = useState({
    'Epic Hero': [],
    'Character': [],
    'Battleline': [],
    'Vehicle': [],
    'Fortification': [],
    'Allied Units': [],
  });

  const [unitCounts, setUnitCounts] = useState({});

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
          <Box key={category.name} marginTop={2}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="overline" paddingLeft={2}>{category.name}</Typography>
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
                  unit={item} // Pass the entire item as unit
                  count={unitCounts[item.name] || 0}
                  unitSummary={getUnitSummary(item)} // Add unit summary here
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
