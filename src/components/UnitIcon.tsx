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
  size = 36, // Increased default size
  selected = false, 
  onClick 
}) => {
  // More transparent colors for subtlety
  const frameColor = unit.isEnemy ? 'rgba(255, 0, 0, 0.6)' : 'rgba(0, 0, 255, 0.6)';
  const fillColor = unit.isEnemy ? 'rgba(255, 128, 128, 0.15)' : 'rgba(128, 176, 255, 0.15)';
  
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
      {/* Larger, more subtle background glow */}
      <div className="absolute inset-0 bg-black/5 rounded-sm group-hover:bg-black/10 transition-all duration-300 scale-150"></div>
      
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className={`transition-all duration-300 ${
          selected ? 'ring-1 ring-white/30 ring-offset-2 ring-offset-[#1a2638]/60' : ''
        } group-hover:brightness-125`}
      >
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          <filter id="softLight">
            <feGaussianBlur stdDeviation="1.5"/>
            <feComposite operator="in" in2="SourceGraphic"/>
          </filter>
        </defs>
        
        {/* Larger frame with softer edges */}
        <path
          d={octagonPath}
          fill={fillColor}
          stroke={frameColor}
          strokeWidth="1"
          filter="url(#glow)"
          className="transition-all duration-300"
        />
        
        {/* Larger unit type symbol */}
        {getUnitTypeSymbol(unit.type, size/2, size/2, size * 0.7, frameColor)}
      </svg>
    </div>
  );
};

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

function getUnitTypeSymbol(type: string, cx: number, cy: number, size: number, color: string) {
  const symbolSize = size * 0.7; // Increased symbol size ratio
  
  switch (type) {
    case 'Infantry':
      return (
        <path
          d={`M ${cx-symbolSize/3},${cy+symbolSize/3} L ${cx},${cy-symbolSize/3} L ${cx+symbolSize/3},${cy+symbolSize/3}`}
          stroke={color}
          strokeWidth="1"
          fill="none"
          className="transition-all duration-300"
        />
      );
    case 'Armor':
      return (
        <path
          d={`M ${cx-symbolSize/2},${cy} L ${cx+symbolSize/2},${cy} M ${cx-symbolSize/3},${cy-symbolSize/3} L ${cx+symbolSize/3},${cy-symbolSize/3} M ${cx-symbolSize/3},${cy+symbolSize/3} L ${cx+symbolSize/3},${cy+symbolSize/3}`}
          stroke={color}
          strokeWidth="1"
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
          strokeWidth="1"
          fill="none"
          className="transition-all duration-300"
        />
      );
    case 'Command':
      return (
        <path
          d={`M ${cx-symbolSize/3},${cy-symbolSize/3} L ${cx+symbolSize/3},${cy+symbolSize/3} M ${cx-symbolSize/3},${cy+symbolSize/3} L ${cx+symbolSize/3},${cy-symbolSize/3}`}
          stroke={color}
          strokeWidth="1"
          fill="none"
          className="transition-all duration-300"
        />
      );
    case 'Enemy':
      return (
        <path
          d={`M ${cx-symbolSize/3},${cy} L ${cx+symbolSize/3},${cy} M ${cx},${cy-symbolSize/3} L ${cx},${cy+symbolSize/3}`}
          stroke={color}
          strokeWidth="1"
          fill="none"
          className="transition-all duration-300"
        />
      );
    default:
      return null;
  }
}

export default UnitIcon;