import React from 'react';
import Step1SelectGame from './Step1SelectGame';
import Step2SelectArmy from './Step2SelectArmy';
import ArmyBuilder from './Step3ArmyBuilder/ArmyBuilder';

function ArmyBuilderRoute({
  step,
  setStep,
  gameType,
  army,
  handleNextGameType,
  handleNextArmy,
  handleChangeArmy,
  handleBack,
}) {
  return (
    <>
      {step === 1 && <Step1SelectGame onNext={handleNextGameType} />}
      {step === 2 && <Step2SelectArmy gameType={gameType} onNext={handleNextArmy} onBack={handleBack} />}
      {step === 3 && <ArmyBuilder gameType={gameType} army={army} onChangeArmy={handleChangeArmy} />}
    </>
  );
}

export default ArmyBuilderRoute;
