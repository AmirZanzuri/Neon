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
    <div className="flex h-screen bg-gray-900 text-white overflow-hidden">
      {showUnitPanel && (
        <div className="w-64 flex-shrink-0 h-full">
          <UnitPanel 
            units={units} 
            onSelectUnit={handleSelectUnit}
            selectedUnit={selectedUnit}
            onClose={handleCloseUnitPanel}
          />
        </div>
      )}
      
      <div className="flex-1 relative">
        <Map 
          units={units}
          targets={targetsMock}
          boundaries={boundariesMock}
          onSelectUnit={handleSelectUnit}
          selectedUnitId={selectedUnit?.id || null}
        />
        
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
  );
}

export default App;