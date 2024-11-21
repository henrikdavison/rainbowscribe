import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Box, CssBaseline, ThemeProvider } from '@mui/material';
import TopMenu from './components/TopMenu';
import ArmyBuilderRoute from './components/ArmyBuilderRoute'; // Adjust the path if necessary
import getTheme from './theme/theme';
import Prototype from './prototype/PrototypePage';

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

  const theme = getTheme(mode); // Ensure we call getTheme() with mode to get the theme object

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <TopMenu toggleDarkMode={toggleDarkMode} mode={mode} />
        <Box sx={{ mt: '16px' }}>
          <Routes>
            <Route path="/" element={<Navigate to="/army-builder" replace />} />
            <Route path="/prototype" element={<Prototype />} />
            <Route
              path="/army-builder"
              element={
                <ArmyBuilderRoute
                  step={step}
                  setStep={setStep}
                  gameType={gameType}
                  army={army}
                  handleNextGameType={handleNextGameType}
                  handleNextArmy={handleNextArmy}
                  handleChangeArmy={handleChangeArmy}
                  handleBack={handleBack}
                />
              }
            />
          </Routes>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
