import React, { useEffect, useState } from 'react';
import { listGameSystems, listAvailableGameSystems } from '../BluescribePrototype/repo/index.js';

const SelectCatalogue = () => {
  const [systems, setSystems] = useState([]);
  const [selectedSystem, setSelectedSystem] = useState(null);

  useEffect(() => {
    const loadSystems = async () => {
      const availableSystems = await listAvailableGameSystems();
      setSystems(availableSystems);
    };

    loadSystems();
  }, []);

  const handleSelectSystem = async (system) => {
    setSelectedSystem(system);
    // Load the selected game system's details here, possibly with readXML or listGameSystems
  };

  return (
    <div>
      <h2>Select Game System</h2>
      {systems.length > 0 ? (
        <ul>
          {systems.map((system, index) => (
            <li key={index} onClick={() => handleSelectSystem(system)}>
              {system.name}
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading game systems...</p>
      )}
    </div>
  );
};

export default SelectCatalogue;
