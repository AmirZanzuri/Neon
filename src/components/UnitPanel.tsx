import React, { useState } from 'react';
import { Unit } from '../types';
import UnitRow from './UnitRow';
import { Search, Filter, ChevronDown, ChevronRight, X } from 'lucide-react';

interface UnitPanelProps {
  units: Unit[];
  onSelectUnit: (unit: Unit) => void;
  selectedUnit: Unit | null;
  onClose: () => void;
}

const UnitPanel: React.FC<UnitPanelProps> = ({ units, onSelectUnit, selectedUnit, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedEchelons, setExpandedEchelons] = useState<number[]>([1, 2]);
  
  const echelons = Array.from(new Set(units.filter(unit => !unit.isEnemy).map(unit => unit.echelon))).sort();
  
  const filteredUnits = units.filter(unit => {
    return (
      !unit.isEnemy &&
      (unit.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
       unit.commander.toLowerCase().includes(searchTerm.toLowerCase()) ||
       unit.locationText.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });
  
  const toggleEchelon = (echelon: number) => {
    if (expandedEchelons.includes(echelon)) {
      setExpandedEchelons(expandedEchelons.filter(e => e !== echelon));
    } else {
      setExpandedEchelons([...expandedEchelons, echelon]);
    }
  };
  
  return (
    <div className="h-full flex flex-col bg-[#1a2638]/85 backdrop-blur-sm">
      <div className="flex-none p-2 space-y-2">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold">FFT</h2>
          <div className="flex items-center space-x-1">
            <button className="p-1 bg-red-600/85 rounded-sm">
              <span className="sr-only">Enemy</span>
            </button>
            <button className="p-1 bg-blue-500/85 rounded-sm">
              <span className="sr-only">Friendly</span>
            </button>
            <button className="p-1 border border-gray-600/85 rounded-sm">
              <span className="sr-only">Move</span>
            </button>
            <button 
              className="p-1 text-gray-400 hover:text-white"
              onClick={onClose}
            >
              <X size={14} />
            </button>
          </div>
        </div>
        
        <div className="text-xs text-gray-300">Filters</div>
        
        <div className="flex items-center p-1.5 bg-[#243552]/85 rounded">
          <Search size={14} className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent border-none outline-none flex-1 text-sm text-gray-300 placeholder-gray-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="text-gray-400">
            <Filter size={14} />
          </button>
        </div>
        
        <div className="flex justify-between items-center text-xs text-gray-400">
          <div className="flex items-center space-x-2">
            <span>Group by</span>
            <button className="bg-[#243552]/85 rounded px-2 py-1 flex items-center">
              <span>Echelon</span>
              <ChevronDown size={14} className="ml-1" />
            </button>
          </div>
          <button className="bg-[#243552]/85 rounded px-2 py-1">
            Orbit
          </button>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto min-h-0 bg-[#243552]/85 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-[#2d4266]/85 [&::-webkit-scrollbar-thumb]:rounded-full">
        {echelons.map(echelon => (
          <div key={`echelon-${echelon}`} className="border-b border-[#2d4266]/85">
            <button 
              className="w-full flex items-center p-2 hover:bg-[#2d4266]/85 text-gray-300"
              onClick={() => toggleEchelon(echelon)}
            >
              {expandedEchelons.includes(echelon) ? (
                <ChevronDown size={14} className="mr-1" />
              ) : (
                <ChevronRight size={14} className="mr-1" />
              )}
              <span className="flex-1 text-left text-sm">Echelon {echelon}</span>
            </button>
            
            {expandedEchelons.includes(echelon) && (
              <div>
                {filteredUnits
                  .filter(unit => unit.echelon === echelon)
                  .map(unit => (
                    <UnitRow 
                      key={unit.id} 
                      unit={unit} 
                      isSelected={selectedUnit?.id === unit.id}
                      onSelect={() => onSelectUnit(unit)}
                    />
                  ))
                }
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UnitPanel;