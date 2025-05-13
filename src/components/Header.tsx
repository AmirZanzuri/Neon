import React, { useState, useEffect } from 'react';
import { Bell, Wifi, Search } from 'lucide-react';

const Header: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    
    return () => {
      clearInterval(timer);
    };
  }, []);
  
  const formattedTime = currentTime.toLocaleTimeString('en-US', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
  
  return (
    <div className="absolute top-0 right-0 flex items-center space-x-2 p-1 bg-transparent">
      <button className="p-1 hover:bg-gray-800/50 rounded-sm">
        <Search size={14} className="text-gray-300" />
      </button>
      
      <div className="flex items-center space-x-2">
        <Wifi size={14} className="text-green-400" />
        <span className="font-mono text-xs">{formattedTime}</span>
      </div>
      
      <button className="relative p-1 hover:bg-gray-800/50 rounded-sm">
        <Bell size={14} className="text-gray-300" />
        <span className="absolute top-0 right-0 h-1.5 w-1.5 bg-blue-500 rounded-full"></span>
      </button>
    </div>
  );
};

export default Header;