import React, { useState } from 'react';
import UnitPanel from './components/UnitPanel';
import Map from './components/Map';
import UnitDetails from './components/UnitDetails';
import Header from './components/Header';
import Toolbar from './components/Toolbar';
import { Unit } from './types';
import { 
  unitsMock, 
  targetsMock, 
  boundariesMock, 
  toolbarButtonsMock
} from './data/mockData';

function App() {
  const [units, setUnits] = useState<Unit[]>(unitsMock);
  const [selectedUnit, setSelectedUnit] = useState<Unit | null>(null);
  const [showUnitDetails, setShowUnitDetails] = useState<boolean>(false);
  const [showUnitPanel, setShowUnitPanel] = useState<boolean>(true);
  
  const handleSelectUnit = (unit: Unit) => {
    setSelectedUnit(unit);
    setShowUnitDetails(true);
  };
  
  const handleCloseUnitDetails = () => {
    setShowUnitDetails(false);
  };

  const handleCloseUnitPanel = () => {
    setShowUnitPanel(false);
  };
  
  const getUnitDetailsPosition = () => {
    return {
      top: '25%',
      right: '10%',
    };
  };
  
  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white relative">
      <div className="flex-1 flex overflow-hidden relative">
        <div className="absolute inset-0">
          <Map 
            units={units}
            targets={targetsMock}
            boundaries={boundariesMock}
            onSelectUnit={handleSelectUnit}
            selectedUnitId={selectedUnit?.id || null}
          />
        </div>

        {showUnitPanel && (
          <div className="relative z-10 w-64 flex-shrink-0">
            <UnitPanel 
              units={units} 
              onSelectUnit={handleSelectUnit}
              selectedUnit={selectedUnit}
              onClose={handleCloseUnitPanel}
            />
          </div>
        )}
        
        <div className="relative flex-1">
          {showUnitDetails && selectedUnit && (
            <div 
              className="absolute z-10"
              style={getUnitDetailsPosition()}
            >
              <UnitDetails 
                unit={selectedUnit}
                onClose={handleCloseUnitDetails}
              />
            </div>
          )}

          <Header />
          <Toolbar buttons={toolbarButtonsMock} />
        </div>
      </div>
    </div>
  );
}

export default App;