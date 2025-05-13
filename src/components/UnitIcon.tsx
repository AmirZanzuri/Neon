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
  // MIL-STD-2525C frame colors with transparency
  const frameColor = unit.isEnemy ? 'rgba(255, 0, 0, 0.9)' : 'rgba(0, 0, 255, 0.9)';
  const fillColor = unit.isEnemy ? 'rgba(255, 128, 128, 0.4)' : 'rgba(128, 176, 255, 0.4)';
  
  // Calculate dimensions
  const frameSize = size;
  const octagonPoints = calculateOctagonPoints(frameSize);
  
  // Generate octagon path for frame
  const octagonPath = `M ${octagonPoints.map(p => `${p.x},${p.y}`).join(' L ')} Z`;
  
  return (
    <div 
      className="relative cursor-pointer group"
      style={{ width: size, height: size }}
      onClick={onClick}
    >
      <div className="absolute inset-0 bg-black/10 rounded-sm group-hover:bg-black/20 transition-all duration-300"></div>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className={`transition-all duration-300 ${
          selected ? 'ring-2 ring-white/50 ring-offset-1 ring-offset-[#1a2638]/60' : ''
        } group-hover:brightness-125`}
      >
        {/* Glow effect */}
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="1" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Frame */}
        <path
          d={octagonPath}
          fill={fillColor}
          stroke={frameColor}
          strokeWidth="1.5"
          filter="url(#glow)"
          className="transition-all duration-300"
        />
        
        {/* Unit Type Symbol */}
        {getUnitTypeSymbol(unit.type, size/2, size/2, size * 0.5, frameColor)}
      </svg>
    </div>
  );
};

// Helper function to calculate octagon points
function calculateOctagonPoints(size: number) {
  const center = size / 2;
  const radius = (size - 2) / 2;
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
          className="transition-all duration-300"
        />
      );
    case 'Armor':
      return (
        <path
          d={`M ${cx-symbolSize/2},${cy} L ${cx+symbolSize/2},${cy} M ${cx-symbolSize/3},${cy-symbolSize/3} L ${cx+symbolSize/3},${cy-symbolSize/3} M ${cx-symbolSize/3},${cy+symbolSize/3} L ${cx+symbolSize/3},${cy+symbolSize/3}`}
          stroke={color}
          strokeWidth="1.5"
          fill="none"
          className="transition-all duration-300"
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
          className="transition-all duration-300"
        />
      );
    case 'Command':
      return (
        <path
          d={`M ${cx-symbolSize/3},${cy-symbolSize/3} L ${cx+symbolSize/3},${cy+symbolSize/3} M ${cx-symbolSize/3},${cy+symbolSize/3} L ${cx+symbolSize/3},${cy-symbolSize/3}`}
          stroke={color}
          strokeWidth="1.5"
          fill="none"
          className="transition-all duration-300"
        />
      );
    case 'Enemy':
      return (
        <path
          d={`M ${cx-symbolSize/3},${cy} L ${cx+symbolSize/3},${cy} M ${cx},${cy-symbolSize/3} L ${cx},${cy+symbolSize/3}`}
          stroke={color}
          strokeWidth="1.5"
          fill="none"
          className="transition-all duration-300"
        />
      );
    default:
      return null;
  }
}

export default UnitIcon;