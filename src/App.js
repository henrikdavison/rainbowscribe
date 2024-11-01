// src/App.js
import React, { useState } from 'react';
import { Box, CssBaseline, ThemeProvider } from '@mui/material';
import TopMenu from './components/TopMenu';
import Step1SelectGame from './components/Step1SelectGame';
import Step2SelectArmy from './components/Step2SelectArmy';
import ArmyBuilder from './components/Step3ArmyBuilder/ArmyBuilder';
import getTheme from './theme/theme';

function App() {
  const [step, setStep] = useState(1);
  const [gameType, setGameType] = useState(null);
  const [army, setArmy] = useState("Necrons");
  const [mode, setMode] = useState('light'); // Theme mode state

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

  // Toggle function for light/dark mode
  const toggleDarkMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  const theme = getTheme(mode); // Get theme based on current mode

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <TopMenu toggleDarkMode={toggleDarkMode} mode={mode} />
      <Box sx={{ mt: '64px' }}>
        {step === 1 && <Step1SelectGame onNext={handleNextGameType} />}
        {step === 2 && <Step2SelectArmy gameType={gameType} onNext={handleNextArmy} onBack={handleBack} />}
        {step === 3 && <ArmyBuilder gameType={gameType} army={army} onChangeArmy={handleChangeArmy} />}
      </Box>
    </ThemeProvider>
  );
}

export default App;

