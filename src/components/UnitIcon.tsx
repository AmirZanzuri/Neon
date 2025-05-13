import React from 'react';
import { Unit } from '../types';

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
  // MIL-STD-2525C frame colors
  const frameColor = unit.isEnemy ? '#FF0000' : '#0000FF';
  const fillColor = unit.isEnemy ? '#FF8080' : '#80B0FF';
  
  // Calculate dimensions
  const frameSize = size;
  const octagonPoints = calculateOctagonPoints(frameSize);
  
  // Generate octagon path for frame
  const octagonPath = `M ${octagonPoints.map(p => `${p.x},${p.y}`).join(' L ')} Z`;
  
  return (
    <div 
      className="relative cursor-pointer transition-all duration-200 hover:brightness-110"
      style={{ width: size, height: size }}
      onClick={onClick}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className={selected ? 'ring-2 ring-white ring-offset-1 ring-offset-gray-900' : ''}
      >
        {/* Frame */}
        <path
          d={octagonPath}
          fill={fillColor}
          stroke={frameColor}
          strokeWidth="1.5"
        />
        
        {/* Unit Type Symbol */}
        {getUnitTypeSymbol(unit.type, size/2, size/2, size * 0.5, frameColor)}
      </svg>
      
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

// Helper function to calculate octagon points
function calculateOctagonPoints(size: number) {
  const center = size / 2;
  const radius = (size - 2) / 2; // Slight padding
  const points = [];
  
  for (let i = 0; i < 8; i++) {
    const angle = (Math.PI / 4) * i;
    points.push({
      x: center + radius * Math.cos(angle),
      y: center + radius * Math.sin(angle)
    });
  }
  
  return points;
}

// Helper function to generate unit type symbols
function getUnitTypeSymbol(type: string, cx: number, cy: number, size: number, color: string) {
  const symbolSize = size * 0.6;
  
  switch (type) {
    case 'Infantry':
      return (
        <path
          d={`M ${cx-symbolSize/3},${cy+symbolSize/3} L ${cx},${cy-symbolSize/3} L ${cx+symbolSize/3},${cy+symbolSize/3}`}
          stroke={color}
          strokeWidth="1.5"
          fill="none"
        />
      );
    case 'Armor':
      return (
        <path
          d={`M ${cx-symbolSize/2},${cy} L ${cx+symbolSize/2},${cy} M ${cx-symbolSize/3},${cy-symbolSize/3} L ${cx+symbolSize/3},${cy-symbolSize/3} M ${cx-symbolSize/3},${cy+symbolSize/3} L ${cx+symbolSize/3},${cy+symbolSize/3}`}
          stroke={color}
          strokeWidth="1.5"
          fill="none"
        />
      );
    case 'Artillery':
      return (
        <circle
          cx={cx}
          cy={cy}
          r={symbolSize/3}
          stroke={color}
          strokeWidth="1.5"
          fill="none"
        />
      );
    case 'Command':
      return (
        <path
          d={`M ${cx-symbolSize/3},${cy-symbolSize/3} L ${cx+symbolSize/3},${cy+symbolSize/3} M ${cx-symbolSize/3},${cy+symbolSize/3} L ${cx+symbolSize/3},${cy-symbolSize/3}`}
          stroke={color}
          strokeWidth="1.5"
          fill="none"
        />
      );
    case 'Enemy':
      return (
        <path
          d={`M ${cx-symbolSize/3},${cy} L ${cx+symbolSize/3},${cy} M ${cx},${cy-symbolSize/3} L ${cx},${cy+symbolSize/3}`}
          stroke={color}
          strokeWidth="1.5"
          fill="none"
        />
      );
    default:
      return null;
  }
}

export default UnitIcon;