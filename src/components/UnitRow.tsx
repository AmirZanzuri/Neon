import React from 'react';
import { Unit } from '../types';
import UnitIcon from './UnitIcon';
import { MoreVertical } from 'lucide-react';

interface UnitRowProps {
  unit: Unit;
  isSelected: boolean;
  onSelect: () => void;
}

const UnitRow: React.FC<UnitRowProps> = ({ unit, isSelected, onSelect }) => {
  return (
    <div 
      className={`p-2 flex items-center hover:bg-black/20 cursor-pointer ${
        isSelected ? 'bg-black/30' : ''
      }`}
      onClick={onSelect}
    >
      <UnitIcon unit={unit} size={20} />
      
      <div className="ml-2 flex-1">
        <div className="text-sm">{unit.name}</div>
        <div className="text-xs text-gray-400">
          Cmd, Equipment, Location: {unit.locationText}
        </div>
      </div>
      
      <button className="p-1 hover:bg-black/30 rounded text-gray-400">
        <MoreVertical size={14} />
      </button>
    </div>
  );
};

export default UnitRow;