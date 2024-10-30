// src/App.js
import React from 'react';
import { Box } from '@mui/material';
import TopMenu from './components/TopMenu';
import Step1SelectGame from './components/Step1SelectGame';
import Step2SelectArmy from './components/Step2SelectArmy';
import ArmyBuilder from './components/Step3ArmyBuilder/ArmyBuilder';

function App() {
  const [step, setStep] = React.useState(1);
  const [gameType, setGameType] = React.useState(null);
  const [army, setArmy] = React.useState("Necrons");

  const handleNextGameType = (selectedGameType) => {
    setGameType(selectedGameType);
    setStep(2);
  };

  const handleNextArmy = (selectedArmy) => {
    setArmy(selectedArmy);
    setStep(3);
  };

  return (
    <>
      <TopMenu />
      <Box sx={{ mt: '64px', px: 2 }}>
        {step === 1 && <Step1SelectGame onNext={handleNextGameType} />}
        {step === 2 && <Step2SelectArmy gameType={gameType} onNext={handleNextArmy} />}
        {step === 3 && <ArmyBuilder gameType={gameType} army={army} />}
      </Box>
    </>
  );
}

export default App;
