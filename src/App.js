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

  const handleChangeArmy = () => {
    setStep(2); // Go back to army selection step
    setArmy(null); // Optionally reset the army selection
  };

  const handleBack = () => {
    setStep((prevStep) => prevStep - 1); // Navigates to the previous step
  };

  return (
    <>
      <TopMenu />
      <Box sx={{ mt: '64px' }}>
        {step === 1 && <Step1SelectGame onNext={handleNextGameType} />}
        {step === 2 && <Step2SelectArmy gameType={gameType} onNext={handleNextArmy} onBack={handleBack} />}
        {step === 3 && <ArmyBuilder gameType={gameType} army={army} onChangeArmy={handleChangeArmy} />}
      </Box>
    </>
  );
}

export default App;

