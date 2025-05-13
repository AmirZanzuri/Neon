import React from 'react';
import { Unit } from '../types';
import { CircleUser } from 'lucide-react';

interface UnitIconProps {
  unit: Unit;
  size?: number;
  selected?: boolean;
  onClick?: () => void;
}

const UnitIcon: React.FC<UnitIconProps> = ({ 
  unit, 
  size = 24, 
  selected = false, 
  onClick 
}) => {
  const bgColor = unit.isEnemy ? 'bg-red-600' : 'bg-blue-500';
  const iconColor = unit.isEnemy ? 'text-red-100' : 'text-blue-100';
  const borderStyle = selected ? 'ring-2 ring-white ring-offset-1 ring-offset-gray-900' : '';
  const iconShape = unit.isEnemy ? 'rotate-45' : '';
  
  return (
    <div 
      className={`${bgColor} ${borderStyle} ${iconShape} rounded-sm flex items-center justify-center cursor-pointer transition-all duration-200 hover:brightness-110`}
      style={{ width: size, height: size }}
      onClick={onClick}
    >
      <div className={`${iconColor}`}>
        <CircleUser size={size * 0.6} />
      </div>
      
      {unit.id && (
        <div 
          className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 text-[10px] bg-black/70 px-1 rounded text-white whitespace-nowrap"
        >
          {unit.id}
        </div>
      )}
    </div>
  );
};

export default UnitIcon;