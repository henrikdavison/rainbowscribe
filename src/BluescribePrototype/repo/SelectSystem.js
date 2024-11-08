import { useEffect, useState } from 'react';
import _ from 'lodash';
import { listGameSystems, listAvailableGameSystems } from './index';
import { useFs, useNative } from '../../Context.js';

const SelectSystem = ({ setSystemInfo, setMode, previouslySelected, error }) => {
    const [systems, setSystems] = useState(null);
    const [available, setAvailable] = useState(null);
    const [selectedAvailable, setSelectedAvailable] = useState(0);
    const [selected, setSelected] = useState(null);
    const [updatingSystem, setUpdatingSystem] = useState(false);
    const { fs, gameSystemPath } = useFs();
    const { selectDirectory } = useNative();

    const isOffline = !!selectDirectory;

    // Load local game systems
    useEffect(() => {
        const loadSystems = async () => {
            const s = await listGameSystems(fs, gameSystemPath);
            setSystems(s);
            setSelected(
                previouslySelected?.name ||
                _.reverse(_.sortBy(Object.values(s), 'lastUpdated'))[0]?.name ||
                'Add New'
            );
        };

        if (!systems) {
            loadSystems();
        }
    }, [systems, previouslySelected, fs, gameSystemPath]);

    // Load remote game systems if "Add New" is selected
    useEffect(() => {
        if (selected === 'Add New' && !available) {
            listAvailableGameSystems().then((a) => {
                setAvailable(a);
                setSelectedAvailable(0);
            });
        }
    }, [selected, available]);

    // Handle loading selected system
    const handleLoadSystem = async () => {
        if (selected === 'Add New') {
            // Load the selected remote system from the available list
            const system = available[selectedAvailable];
            console.log("Loading remote system:", system);
            // Use additional logic here to add or load the system as needed
        } else {
            // Load the selected local system
            const system = systems[selected];
            console.log("Loading local system:", system);
            // Use additional logic here to proceed with loading
        }
    };

    return (
        <div>
            <h2>Select Game System</h2>
            {systems ? (
                <>
                    <select
                        value={selected}
                        onChange={(e) => setSelected(e.target.value)}
                    >
                        {_.reverse(_.sortBy(Object.values(systems), 'lastUpdated')).map((system) => (
                            <option key={system.name} value={system.name}>
                                {system.description} - {system.version}
                            </option>
                        ))}
                        <option key="add">Add New</option>
                    </select>
                    {selected === 'Add New' ? (
                        available ? (
                            <div>
                                <select onChange={(e) => setSelectedAvailable(e.target.value)}>
                                    {available.map((system, index) => (
                                        <option key={system.name} value={index}>
                                            {system.description}
                                        </option>
                                    ))}
                                </select>
                                <button onClick={handleLoadSystem}>Load</button>
                            </div>
                        ) : (
                            <div>Loading remote systems...</div>
                        )
                    ) : (
                        <button onClick={handleLoadSystem}>Load</button>
                    )}
                </>
            ) : (
                <div>Loading local systems...</div>
            )}
        </div>
    );
};

export default SelectSystem;
